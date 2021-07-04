import { useContext } from "react"
import { useMutation } from "react-apollo"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"

import SUSPEND_USER from "../../graphql/UserManagement/mutations/suspendUser"

const useSuspendUserMutation = options => {
  const { user } = useContext(SessionContext)

  return useMutation(SUSPEND_USER, {
    ...queryOptions(user, true),
    ...options,
  })
}

export default useSuspendUserMutation
