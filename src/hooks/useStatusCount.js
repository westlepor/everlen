import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import GET_COUNT_BY_STATUS from "queries/kitStatus/getCountByStatus"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import { useVariables, useSuperAdmin, useHasuraClaims } from "hooks"

const useStatusCount = (extraVariables = {}) => {
  const { user, targetUser } = useContext(SessionContext)
  const { isHCPAdmin, rapidTestId, isHCPOrCanViewRapidTests } = useHasuraClaims(
    user
  )
  const { isTargetUserHCPAdmin } = useSuperAdmin(user, targetUser)

  const variables = {
    ...useVariables(user, targetUser),
    isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
    rapidTestId,
    isHCPOrCanViewRapidTests: isHCPOrCanViewRapidTests || isTargetUserHCPAdmin,
    ...extraVariables,
  }

  return useLazyQuery(GET_COUNT_BY_STATUS(variables), {
    ...queryOptions(user),
    variables,
  })
}

export default useStatusCount
