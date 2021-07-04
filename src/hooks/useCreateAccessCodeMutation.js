import { useMutation } from "react-apollo"

import { queryOptions } from "utils/helper"

import CREATE_ACCESS_CODE from "../graphql/AccessCode/mutations/createAccessCode"

const useCreateAccessCodeMutation = ({ user = {}, variables }) => {
  return useMutation(CREATE_ACCESS_CODE, {
    ...queryOptions(user, true),
    variables,
  })
}

export default useCreateAccessCodeMutation
