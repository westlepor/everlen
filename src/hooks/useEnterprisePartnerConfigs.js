import { useQuery } from "react-apollo"

import { queryOptions } from "utils/helper"

import GET_ENTERPRISE_PARTNER_CONFIGS from "../queries/enterprisePartnerConfigs/getEnterprisePartnerConfigs"

import { useHasuraClaims, useSuperAdmin } from "hooks"

const useEnterprisePartnerConfigs = (user = {}, targetUser = {}) => {
  const { enterprisePartnerId, enterpriseClientIds } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    targetPartnerId,
    targetClientIds,
  } = useSuperAdmin(user, targetUser)

  const partnerId = isEverlywellSuperAdmin
    ? targetPartnerId
    : enterprisePartnerId
  const clientIds = isEverlywellSuperAdmin
    ? targetClientIds
    : enterpriseClientIds

  return useQuery(GET_ENTERPRISE_PARTNER_CONFIGS, {
    ...queryOptions(user),
    variables: {
      partner_id: partnerId,
      client_ids: clientIds,
    },
  })
}

export default useEnterprisePartnerConfigs
