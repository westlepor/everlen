import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ONE_USER_BY_EMAIL from "../../queries/userManagement/findOneUserByEmail"

const useOneUserByEmail = ({ email }) => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ONE_USER_BY_EMAIL, {
    ...queryOptions(user),
    variables: { email },
    skip: !email,
  })
}

export default useOneUserByEmail
