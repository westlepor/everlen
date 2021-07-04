import { useQuery } from "react-apollo"

import { queryOptions } from "utils/helper"

import GET_PARTNER_CONFIG_BY_PARTNER_ID from "../queries/admin/getPartnerConfig"

const usePartnerConfig = (user = {}, variables = {}) => {
  return useQuery(GET_PARTNER_CONFIG_BY_PARTNER_ID, {
    ...queryOptions(user),
    variables,
  })
}

export default usePartnerConfig
