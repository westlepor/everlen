import useHasuraClaims from "./useHasuraClaims"
import useSuperAdmin from "./useSuperAdmin"

const useVariables = (user = {}, targetUser = {}) => {
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

  if (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) {
    return {
      partner_id: enterprisePartnerId,
    }
  } else if (isEverlywellSuperAdmin && targetPartnerId) {
    return {
      partner_id: targetPartnerId,
    }
  } else if (isEnterpriseClientClinicalAdmin && enterpriseClientIds) {
    return {
      client_ids: enterpriseClientIds,
    }
  } else if (isEverlywellSuperAdmin && targetClientIds) {
    return {
      client_ids: targetClientIds,
    }
  } else {
    return {}
  }
}

export default useVariables
