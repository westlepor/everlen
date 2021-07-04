import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import GET_COUNT_BY_RESULT from "queries/kitStatus/getCountByResult"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import { useVariables } from "hooks"

const useResultCount = () => {
  const { user, targetUser } = useContext(SessionContext)

  const variables = useVariables(user, targetUser)

  return useLazyQuery(GET_COUNT_BY_RESULT(variables), {
    ...queryOptions(user),
    variables,
  })
}

export default useResultCount
