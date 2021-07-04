import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ONE_USER from "../../queries/userManagement/findOneUser"

const useOneUser = ({ id }) => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ONE_USER, {
    ...queryOptions(user),
    variables: { id },
    skip: !id,
  })
}

export default useOneUser
