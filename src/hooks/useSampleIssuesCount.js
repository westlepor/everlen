import { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import GET_SAMPLE_ISSUES_COUNT from "queries/kitStatus/getSampleIssuesCount"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import { useVariables } from "hooks"

const useSampleIssuesCount = () => {
  const { user, targetUser } = useContext(SessionContext)

  const variables = useVariables(user, targetUser)

  return useLazyQuery(GET_SAMPLE_ISSUES_COUNT(variables), {
    ...queryOptions(user),
    variables,
  })
}

export default useSampleIssuesCount
