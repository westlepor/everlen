import { useContext } from "react"
import { useQuery } from "react-apollo"

import GET_USER_PROFILE from "queries/settings/userProfile/get"

import { SessionContext } from "contexts/session"

import { useHasuraClaims } from "hooks"

import { queryOptions } from "utils/helper"

const useUserProfileDetails = () => {
  const { user } = useContext(SessionContext)
  const { faunaId } = useHasuraClaims(user)

  return useQuery(GET_USER_PROFILE, {
    ...queryOptions(user),
    variables: { id: faunaId },
    skip: !faunaId,
  })
}

export default useUserProfileDetails
