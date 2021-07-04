import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import GET_KIT_RESULT_IDS_BY_COLLECTED_AT from "queries/kitStatus/RapidTests/getKitResultIdsByCollectedAt"

const useCollectedAtFilter = ({ variables = {} }) => {
  const { user, targetUser } = useContext(SessionContext)

  const {
    rapidTestId,
    enterprisePartnerId: currentUserEnterprisePartnerId,
    enterpriseClientIds: currentUserEnterpriseClientIds,
  } = useHasuraClaims(user)

  const {
    isTargetUserHCPAdmin,
    targetPartnerId: targetUserEnterprisePartnerId,
    targetClientIds: targetUserEnterpriseClientIds,
  } = useSuperAdmin(user, targetUser)

  const enterprisePartnerId = isTargetUserHCPAdmin
    ? targetUserEnterprisePartnerId
    : currentUserEnterprisePartnerId

  const enterpriseClientIds = isTargetUserHCPAdmin
    ? targetUserEnterpriseClientIds
    : currentUserEnterpriseClientIds

  return useLazyQuery(GET_KIT_RESULT_IDS_BY_COLLECTED_AT, {
    ...queryOptions(user),
    variables: {
      ...variables,
      testId: rapidTestId,
      enterprisePartnerId,
      enterpriseClientIds,
    },
  })
}

export default useCollectedAtFilter
