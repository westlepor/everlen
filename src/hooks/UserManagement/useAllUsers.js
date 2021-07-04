import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ALL_USERS from "../../queries/userManagement/findAllUsers"

const SIZE = 1000

const useAllUsers = () => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ALL_USERS, {
    ...queryOptions(user),
    variables: { size: SIZE },
  })
}

export default useAllUsers
