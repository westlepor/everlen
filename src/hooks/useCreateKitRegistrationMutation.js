import { useMutation } from "react-apollo"

import { queryOptions } from "utils/helper"

import CREATE_KIT_REGISTRATION from "../graphql/KitRegistration/mutations/createKitRegistration"

const useCreateKitRegistrationMutation = ({ user = {}, variables }) => {
  return useMutation(CREATE_KIT_REGISTRATION, {
    ...queryOptions(user, true),
    variables,
  })
}

export default useCreateKitRegistrationMutation
