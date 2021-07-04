import { useQuery } from "react-apollo"

import { useHasuraClaims, useSuperAdmin, useVariables } from "../hooks"
import { queryOptions } from "utils/helper"

import GET_PARTNER_PRODUCTS_BY_PARTNER_ID from "../queries/admin/getPartnerProductsByPartnerId"
import GET_PARTNER_PRODUCTS_BY_CLIENT_IDS from "../queries/admin/getPartnerProductsByClientIds"

const usePartnerProducts = (user = {}, targetUser = {}, skip = false) => {
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

  const GET_PARTNER_PRODUCTS =
    (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) ||
    (isEverlywellSuperAdmin && targetPartnerId)
      ? GET_PARTNER_PRODUCTS_BY_PARTNER_ID
      : (isEnterpriseClientClinicalAdmin && enterpriseClientIds) ||
        (isEverlywellSuperAdmin && targetClientIds)
      ? GET_PARTNER_PRODUCTS_BY_CLIENT_IDS
      : GET_PARTNER_PRODUCTS_BY_PARTNER_ID

  const variables = useVariables(user, targetUser)

  return useQuery(GET_PARTNER_PRODUCTS, {
    ...queryOptions(user),
    variables,
    skip,
  })
}

export default usePartnerProducts
