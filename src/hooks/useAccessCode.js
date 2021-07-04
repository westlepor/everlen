import { useQuery } from "react-apollo"

import { queryOptions } from "utils/helper"

import GET_ACCESS_CODE_BY_CODE from "../queries/admin/getAccessCodeByCode"

const useAccessCode = ({ user = {}, code }) => {
  return useQuery(GET_ACCESS_CODE_BY_CODE, {
    ...queryOptions(user),
    variables: { code },
  })
}

export default useAccessCode
