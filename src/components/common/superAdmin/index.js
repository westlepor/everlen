import React, { useState, useContext } from "react"
import { navigate } from "@reach/router"

import { Container, Row, Col } from "@everlywell/leaves"

import { SessionContext, DefaultTargetUser } from "contexts/session"
import { useUserPermissions, useClients, usePartner } from "hooks"
import { ERROR_CONTENT, URL, HASURA_ROLE } from "utils/constants"

import { queryOptions } from "utils/helper"

import * as S from "./styles"

export default () => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleCompleted = data => {
    const permissions = data?.adminPermissions

    const access_code_manager = permissions?.access_code_manager?.value
    const can_register_kits = permissions?.can_register_kits?.value
    const enterprise_client_ids = permissions?.enterprise_client_ids?.value
    const enterprise_partner_id = permissions?.enterprise_partner_id
    const role = permissions?.role?.value
    const getstream_token = permissions?.getstream_token?.value
    const fauna_id = permissions?.fauna_id?.value
    const okta_user_id = permissions?.okta_user_id?.value

    const error = permissions?.error?.value
    if (!!error) {
      setError(ERROR_CONTENT.NO_USER_FOUND)
      return
    }

    if (role === HASURA_ROLE.superAdmin) {
      setError(ERROR_CONTENT.CANNOT_MIMIC_SUPERADMIN)
      return
    }

    session.setTargetUser({
      email,
      access_code_manager,
      can_register_kits,
      enterprise_client_ids,
      enterprise_partner_id,
      role,
      getstream_token,
      fauna_id,
      okta_user_id,
    })

    navigate(URL.kitStatus)
  }

  const [triggerGetPermissions, { loading }] = useUserPermissions({
    user,
    email,
    handleCompleted,
  })

  const handleEmailChange = e => {
    setError("")
    setEmail(e.target.value)
  }

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (email === user.email) {
        setError(ERROR_CONTENT.CANNOT_MIMIC_YOURSELF)
      } else {
        triggerGetPermissions({ variables: { email } })
      }
    } else {
      setError(ERROR_CONTENT.INVALID_EMAIL)
    }
  }

  const handleCancel = () => {
    setEmail("")
    session.setTargetUser(DefaultTargetUser)
    navigate(URL.kitStatus)
  }

  // get additional info
  const { enterprise_partner_id, enterprise_client_ids } = targetUser

  // get target user's enterprise partner name if its role is partner
  const {
    data: partnerData,
    error: partnerError,
    called: partnerCalled,
  } = usePartner({
    ...queryOptions(user),
    variables: { id: enterprise_partner_id },
    skip: !enterprise_partner_id,
  })

  const enterprisePartnerName =
    !partnerError && partnerCalled && partnerData?.enterprise_partners?.length
      ? partnerData.enterprise_partners[0].display_name
      : null

  // get target user's enterprise client names if its role is client
  const {
    data: clientsData,
    error: clientsError,
    called: clientsCalled,
  } = useClients(
    user,
    targetUser,
    !enterprise_client_ids || !enterprise_client_ids.length
  )

  const enterpriseClientNames =
    !clientsError && clientsCalled && clientsData?.enterprise_clients?.length
      ? clientsData.enterprise_clients.map(c => c.name)
      : null

  const targetUserRole = targetUser?.role?.replace(/_/gi, " ")
  const canTargetUserManageAccessCodes =
    targetUser?.access_code_manager === "true" ? "Yes" : "No"
  const canTargetUserRegisterKits =
    targetUser?.can_register_kits === "true" ? "Yes" : "No"

  const isTargetUserClientAdmin = targetUser?.role === HASURA_ROLE.client

  return (
    <S.OuterWrapper data-cy="super-admin-banner">
      {targetUser && targetUser?.email ? (
        <Container>
          <S.InfoWrapperRow>
            <Col md={10}>
              <S.Label>
                <Row>
                  <S.InfoWrapperCol>
                    You are using <b>{targetUser.email}</b> permissions. To
                    restore, click cancel.
                  </S.InfoWrapperCol>
                </Row>

                <S.Permission>
                  <Row>
                    <S.InfoWrapperCol md={4}>
                      <b>Role:</b> {targetUserRole}
                    </S.InfoWrapperCol>
                    <S.InfoWrapperCol md={4}>
                      <b>Can Manage Access Codes: </b>
                      {canTargetUserManageAccessCodes}
                    </S.InfoWrapperCol>
                    <S.InfoWrapperCol md={4}>
                      <b>Can Register Kits: </b>
                      {canTargetUserRegisterKits}
                    </S.InfoWrapperCol>
                  </Row>

                  {targetUser?.enterprise_partner_id && (
                    <Row>
                      <S.InfoWrapperCol md={4}>
                        {enterprisePartnerName && (
                          <>
                            <b>Partner Name:</b> {enterprisePartnerName}
                          </>
                        )}
                      </S.InfoWrapperCol>
                      <S.InfoWrapperCol md={4}>
                        <b>Partner ID:</b> {targetUser?.enterprise_partner_id}
                      </S.InfoWrapperCol>
                    </Row>
                  )}

                  {isTargetUserClientAdmin && (
                    <Row>
                      <S.InfoWrapperCol md={6}>
                        {enterpriseClientNames && (
                          <>
                            <b>
                              {enterpriseClientNames.length > 1
                                ? "Client Names: "
                                : "Client Name: "}
                            </b>
                            {enterpriseClientNames.length > 5 ? (
                              <>
                                {enterpriseClientNames?.slice(0, 3)?.join(", ")}
                                <S.Details>
                                  <p>
                                    {enterpriseClientNames
                                      ?.slice(
                                        3,
                                        enterpriseClientNames.length - 3
                                      )
                                      ?.join(", ")}
                                  </p>
                                  <summary>
                                    {enterpriseClientNames.length - 3}
                                  </summary>
                                </S.Details>
                              </>
                            ) : (
                              enterpriseClientNames?.join(", ")
                            )}
                          </>
                        )}
                      </S.InfoWrapperCol>
                      <S.InfoWrapperCol md={6}>
                        {targetUser.enterprise_client_ids && (
                          <>
                            <b>
                              {targetUser?.enterprise_client_ids?.length > 1
                                ? "Client IDs: "
                                : "Client ID: "}
                            </b>
                            {targetUser?.enterprise_client_ids?.join(", ")}
                          </>
                        )}
                      </S.InfoWrapperCol>
                    </Row>
                  )}
                </S.Permission>
              </S.Label>
            </Col>
            <S.InfoWrapperCol md={2}>
              <S.CancelButton onClick={handleCancel} appearance="hero">
                Cancel
              </S.CancelButton>
            </S.InfoWrapperCol>
          </S.InfoWrapperRow>
        </Container>
      ) : (
        <S.InnerWrapper>
          <S.Label>
            You are currently a Super Admin. To mimic another user's
            permissions, enter their email.
          </S.Label>
          <S.StyledInput
            value={email}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            error={error}
          />

          {loading ? (
            <S.LoadingButton>
              <S.Loader />
            </S.LoadingButton>
          ) : (
            <S.StyledButton onClick={handleSubmit}>View as User</S.StyledButton>
          )}
        </S.InnerWrapper>
      )}
    </S.OuterWrapper>
  )
}
