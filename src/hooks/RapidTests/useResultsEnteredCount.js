import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import GET_COUNT_BY_RESULTS_ENTERED from "queries/kitStatus/RapidTests/getCountByResultsEntered"

const useResultsEnteredCount = () => {
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

  return useLazyQuery(GET_COUNT_BY_RESULTS_ENTERED, {
    ...queryOptions(user),
    variables: {
      testId: rapidTestId,
      enterprisePartnerId,
      enterpriseClientIds,
    },
  })
}

export default useResultsEnteredCount
