import { useQuery } from "react-apollo"

import GET_USER_COLUMN_PREFERENCE from "../graphql/UserColumnPreferences/queries/get"

import { useHasuraClaims, useSuperAdmin } from "hooks"
import { queryOptions } from "utils/helper"

const useUserColumnPreference = (user = {}, targetUser = {}) => {
  const { faunaId, isHCPAdmin } = useHasuraClaims(user)
  const { isMasqueradeMode } = useSuperAdmin(user, targetUser)

  const userId = isMasqueradeMode ? targetUser.fauna_id : faunaId

  return useQuery(GET_USER_COLUMN_PREFERENCE, {
    ...queryOptions(user),
    variables: { id: userId },
    skip: !userId || isHCPAdmin,
  })
}

export default useUserColumnPreference
