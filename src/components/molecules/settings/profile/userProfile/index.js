import React, { useContext } from "react"

import { Row, Col } from "@everlywell/leaves"

import { SessionContext } from "contexts/session"

import { useHasuraClaims, useSuperAdmin, useClients, usePartner } from "hooks"

import { HASURA_ROLE } from "utils/constants"

import { queryOptions } from "utils/helper"

import { getLongTimezoneDisplay } from "utils/datetime"

import UserName from "../userName"

import * as S from "./styles"

/**
 *
 * These two functions can be extracted into utils AND tested
 */

const findPartnerName = data => {
  const [enterprise_partner] = data?.enterprise_partners || []

  return [enterprise_partner?.display_name]
}

const findClientNames = data => {
  return data?.enterprise_clients?.map(client => client.name)
}

/**
 * Main Component
 */
const UserProfile = () => {
  const { user, targetUser } = useContext(SessionContext)

  const {
    enterprisePartnerId,
    isEnterpriseClientClinicalAdmin,
    isHCPAdmin,
    currentUserName,
  } = useHasuraClaims(user)

  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)

  // get the user company from DB
  const { data: companyData } = usePartner({
    ...queryOptions(user),
    variables: { id: enterprisePartnerId },
    skip: !enterprisePartnerId,
  })

  const { data: clientData } = useClients(
    user,
    targetUser,
    !(
      isEnterpriseClientClinicalAdmin ||
      (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.client)
    )
  )

  const company =
    isEnterpriseClientClinicalAdmin && clientData?.enterprise_clients.length
      ? findClientNames(clientData)
      : findPartnerName(companyData)

  // main render
  return (
    <S.Container>
      <Row>
        <Col xs>
          <S.Title>User Profile</S.Title>

          <S.Details data-cy="user-profile">
            <S.Detail>
              <S.Label>Name</S.Label>
              <S.Value>
                <UserName fallbackName={currentUserName} />
              </S.Value>
            </S.Detail>

            <S.Detail>
              <S.Label>Company</S.Label>
              <S.Value>
                {company.length > 1
                  ? company.map((c, key) => <li key={key}>{c}</li>)
                  : company[0]
                  ? company[0]
                  : "Everlywell"}
              </S.Value>
            </S.Detail>

            <S.Detail>
              <S.Label>Role</S.Label>
              <S.Value>
                {isHCPAdmin ? "Health Care Provider" : "Clinical Admin"}
              </S.Value>
            </S.Detail>

            <S.Detail>
              <S.Label>Timezone</S.Label>
              <S.Value>{getLongTimezoneDisplay()}</S.Value>
            </S.Detail>
          </S.Details>
        </Col>
      </Row>
    </S.Container>
  )
}

export default UserProfile
