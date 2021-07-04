import React from "react"
import Popup from "reactjs-popup"

import {
  useOptInPortalUrls,
  useHasuraClaims,
  useSuperAdmin,
  useVariables,
} from "../../../../../../hooks"

import { queryOptions } from "utils/helper"
import { findUniqueOptInPortalUrls } from "utils/accessCodes"

import * as S from "./style"

import UserIcon from "./UserIcon"
import ArrowUpIcon from "./ArrowUpIcon"
import ArrowDownIcon from "./ArrowDownIcon"

const ViewParticipantOptInSideSelector = ({ user, targetUser }) => {
  const { isEnterprisePartnerClinicalAdmin } = useHasuraClaims(user)
  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)

  const { data } = useOptInPortalUrls({
    ...queryOptions(user),
    variables: {
      isPartnerClinicalAdmin: isEnterprisePartnerClinicalAdmin,
      ...useVariables(user, targetUser),
    },
    skip: isEverlywellSuperAdmin && !targetRole,
  })

  const optInUrls = findUniqueOptInPortalUrls(
    data?.enterprise_partner_configs || []
  )

  const hasSingleUrl = Object.keys(optInUrls).length === 1
  const hasMultipleUrls = Object.keys(optInUrls).length > 1

  return (
    <div>
      {hasSingleUrl && (
        <S.Link href={[Object.keys(optInUrls)]} target="_blank">
          <S.UserIconWrapper>
            <UserIcon />
          </S.UserIconWrapper>
          <S.Text>Participant Opt in Portal</S.Text>
        </S.Link>
      )}

      {hasMultipleUrls && (
        <Popup
          offsetX={0}
          offsetY={0}
          trigger={open => (
            <S.DropdownTrigger isOpen={open}>
              <S.UserIconWrapper>
                <UserIcon />
              </S.UserIconWrapper>

              <S.Text>Participant Opt in Portal</S.Text>

              <S.ArrowWrapper>
                {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </S.ArrowWrapper>
            </S.DropdownTrigger>
          )}
          position="bottom left"
          on={["click"]}
          contentStyle={{
            padding: "0.469rem 0",
            border: "none",
            minWidth: "16.774rem",
            boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
          }}
          arrow={false}
        >
          {Object.keys(optInUrls)
            .sort((a, b) => optInUrls[a].localeCompare(optInUrls[b]))
            .map(url => (
              <S.PortalLink href={url} target="_blank">
                {optInUrls[url]}
              </S.PortalLink>
            ))}
        </Popup>
      )}
    </div>
  )
}

export default ViewParticipantOptInSideSelector
