import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ALL_GROUPS from "../../queries/userManagement/findAllGroups"

const SIZE = 1000

const useAllGroups = () => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ALL_GROUPS, {
    ...queryOptions(user),
    variables: { size: SIZE },
  })
}

export default useAllGroups
