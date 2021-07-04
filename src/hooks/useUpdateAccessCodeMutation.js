import { useMutation } from "react-apollo"

import { queryOptions } from "utils/helper"

import UPDATE_ACCESS_CODE from "../graphql/AccessCode/mutations/updateAccessCode"

const useUpdateAccessCodeMutation = ({ user = {}, variables }) => {
  return useMutation(UPDATE_ACCESS_CODE, {
    ...queryOptions(user, true),
    variables,
  })
}

export default useUpdateAccessCodeMutation
