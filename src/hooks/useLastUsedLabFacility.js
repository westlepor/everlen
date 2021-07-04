import { useContext } from "react"
import { useQuery } from "react-apollo"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import { queryOptions } from "utils/helper"

import { SessionContext } from "contexts/session"

import GET_LAST_USED_LAB_FACILITY from "../queries/labFacility/getLastUsedLabFacility"

const useLastUsedLabFacility = ({ onCompleted }) => {
  const { user, targetUser } = useContext(SessionContext)

  const { currentUserId, isHCPAdmin } = useHasuraClaims(user)
  const { isTargetUserHCPAdmin, targetUserOktaUserId } = useSuperAdmin(
    user,
    targetUser
  )

  const oktaUserId = isTargetUserHCPAdmin ? targetUserOktaUserId : currentUserId
  const skip = isTargetUserHCPAdmin ? !isTargetUserHCPAdmin : !isHCPAdmin

  return useQuery(GET_LAST_USED_LAB_FACILITY, {
    ...queryOptions(user),
    variables: { currentUserId: oktaUserId },
    skip,
    onCompleted,
  })
}

export default useLastUsedLabFacility
