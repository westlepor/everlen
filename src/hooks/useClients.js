import { useQuery } from "react-apollo"

import { useHasuraClaims, useSuperAdmin, useVariables } from "../hooks"
import { queryOptions } from "utils/helper"

import GET_CLIENTS_BY_PARTNER_ID from "../queries/admin/getClientsByPartnerId"
import GET_CLIENTS_BY_CLIENT_IDS from "../queries/admin/getClientsByClientIds"

const useClients = (user = {}, targetUser = {}, skip = false) => {
  const {
    isEnterprisePartnerClinicalAdmin,
    isEnterpriseClientClinicalAdmin,
    enterprisePartnerId,
    enterpriseClientIds,
  } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    targetPartnerId,
    targetClientIds,
  } = useSuperAdmin(user, targetUser)

  const GET_CLIENTS =
    (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) ||
    (isEverlywellSuperAdmin && targetPartnerId)
      ? GET_CLIENTS_BY_PARTNER_ID
      : (isEnterpriseClientClinicalAdmin && enterpriseClientIds) ||
        (isEverlywellSuperAdmin && targetClientIds)
      ? GET_CLIENTS_BY_CLIENT_IDS
      : GET_CLIENTS_BY_PARTNER_ID

  const variables = useVariables(user, targetUser)

  return useQuery(GET_CLIENTS, {
    ...queryOptions(user),
    variables,
    skip,
  })
}

export default useClients
