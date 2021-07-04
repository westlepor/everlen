import { useContext } from "react"
import { useMutation } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import DELETE_GROUP from "../../graphql/UserManagement/mutations/deleteGroup"

const useDeleteGroupMutation = options => {
  const { user } = useContext(SessionContext)

  return useMutation(DELETE_GROUP, {
    ...queryOptions(user, true),
    ...options,
  })
}

export default useDeleteGroupMutation
