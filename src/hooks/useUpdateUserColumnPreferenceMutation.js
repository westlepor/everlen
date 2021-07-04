import { useMutation } from "react-apollo"

import UPDATE_USER_COLUMN_PREFERENCE from "../graphql/UserColumnPreferences/mutations/update"

import { useHasuraClaims } from "hooks"
import { queryOptions } from "utils/helper"

const useUpdateUserColumnPreferenceMutation = ({ user = {}, columns = {} }) => {
  const { faunaId } = useHasuraClaims(user)

  return useMutation(UPDATE_USER_COLUMN_PREFERENCE, {
    ...queryOptions(user, true),
    variables: { id: faunaId, ...columns },
  })
}

export default useUpdateUserColumnPreferenceMutation
