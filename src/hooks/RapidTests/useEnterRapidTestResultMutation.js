import { useContext } from "react"
import { useMutation } from "react-apollo"

import ENTER_RAPID_TEST_RESULT from "../../graphql/RapidTest/mutations/enterRapidTestResult"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

const useEnterRapidTestResultMutation = ({ variables = {} }) => {
  const { user } = useContext(SessionContext)

  return useMutation(ENTER_RAPID_TEST_RESULT, {
    ...queryOptions(user, true),
    variables,
  })
}

export default useEnterRapidTestResultMutation
