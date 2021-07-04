import { useContext } from "react"
import { useMutation } from "react-apollo"

import CREATE_OR_UPDATE_LAB_FACILITY from "../graphql/LabFacility/mutations/createOrUpdateLabFacility"

import { queryOptions } from "utils/helper"

import { SessionContext } from "contexts/session"

const useCreateOrUpdateLabFacilityMutation = () => {
  const { user } = useContext(SessionContext)

  return useMutation(CREATE_OR_UPDATE_LAB_FACILITY, {
    ...queryOptions(user, true),
  })
}

export default useCreateOrUpdateLabFacilityMutation
