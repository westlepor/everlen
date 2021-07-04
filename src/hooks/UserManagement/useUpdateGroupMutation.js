import { useContext } from "react"
import { useMutation } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import UPDATE_GROUP from "../../graphql/UserManagement/mutations/updateGroup"

const useUpdateGroupMutation = options => {
  const { user } = useContext(SessionContext)

  return useMutation(UPDATE_GROUP, {
    ...queryOptions(user, true),
    ...options,
  })
}

export default useUpdateGroupMutation
