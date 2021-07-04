import { useLazyQuery } from "react-apollo"

import { queryOptions } from "utils/helper"

import GET_USER_PERMISSIONS from "../queries/superAdmin/getUserPermissions"

const useUserPermissions = ({ user = {}, email, handleCompleted }) => {
  return useLazyQuery(GET_USER_PERMISSIONS, {
    ...queryOptions(user),
    variables: { email },
    onCompleted: handleCompleted,
  })
}

export default useUserPermissions
