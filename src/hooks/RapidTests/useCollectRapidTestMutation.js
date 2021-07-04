import { useContext } from "react"
import { useMutation } from "react-apollo"

import COLLECT_RAPID_TEST from "../../graphql/RapidTest/mutations/collectRapidTest"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

const useCollectRapidTestMutation = ({ variables = {} }) => {
  const { user } = useContext(SessionContext)

  return useMutation(COLLECT_RAPID_TEST, {
    ...queryOptions(user, true),
    variables,
  })
}

export default useCollectRapidTestMutation
