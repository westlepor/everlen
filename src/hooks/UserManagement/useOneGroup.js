import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ONE_GROUP from "../../queries/userManagement/findOneGroup"

const useOneGroup = ({ id }) => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ONE_GROUP, {
    ...queryOptions(user),
    variables: { id },
    skip: !id,
  })
}

export default useOneGroup
