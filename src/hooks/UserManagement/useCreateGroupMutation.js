import { useContext } from "react"
import { useMutation } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import CREATE_GROUP from "../../graphql/UserManagement/mutations/createGroup"

const useCreateGroupMutation = options => {
  const { user } = useContext(SessionContext)

  return useMutation(CREATE_GROUP, {
    ...queryOptions(user, true),
    ...options,
  })
}

export default useCreateGroupMutation
