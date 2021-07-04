import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ONE_GROUP_BY_NAME from "../../queries/userManagement/findOneGroupByName"

const useOneGroupByName = ({ name, handleCompleted }) => {
  const { user } = useContext(SessionContext)

  return useLazyQuery(FIND_ONE_GROUP_BY_NAME, {
    ...queryOptions(user),
    variables: { name },
    skip: !name,
    onCompleted: handleCompleted,
  })
}

export default useOneGroupByName
