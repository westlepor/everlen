import { HASURA_ROLE } from "utils/constants"

const useSuperAdmin = (user = {}, targetUser = {}) => {
  const claims = user?.idToken?.claims || {}
  const hasuraClaims = JSON.parse(claims?.hasura || "{}") || {}

  const role = claims["x-hasura-role"]
  const hasAccessToAdministrationPages =
    hasuraClaims["x-hasura-access-code-manager"] === "true"
  const hasAccessToRegistrationPages =
    hasuraClaims["x-hasura-can-register-kits"] === "true"
  const partnerId = hasuraClaims["x-hasura-partner-id"]
  const clientIds = hasuraClaims["x-hasura-client-ids"]?.slice(1, -1)
    ? hasuraClaims["x-hasura-client-ids"].slice(1, -1).split(",")
    : null

  const isEverlywellSuperAdmin = role === HASURA_ROLE.superAdmin
  const isMasqueradeMode = !!targetUser?.email && isEverlywellSuperAdmin

  const isTargetUserHCPAdmin =
    isMasqueradeMode &&
    ["enterprise_partner_hcp", "enterprise_client_hcp"].includes(
      targetUser?.role
    )

  const isCurrentUserPartnerAdmin = [
    "enterprise_partner_clinical_admin",
    "enterprise_partner_hcp",
  ].includes(role)

  const isTargetUserPartnerAdmin = [
    "enterprise_partner_clinical_admin",
    "enterprise_partner_hcp",
  ].includes(targetUser?.role)

  const isCurrentUserClientAdmin = [
    "enterprise_client_clinical_admin",
    "enterprise_client_hcp",
  ].includes(role)

  const isTargetUserClientAdmin = [
    "enterprise_client_clinical_admin",
    "enterprise_client_hcp",
  ].includes(targetUser?.role)

  let targetPartnerId = null
  if (isMasqueradeMode) {
    if (isTargetUserPartnerAdmin) {
      targetPartnerId = parseInt(targetUser?.enterprise_partner_id)
    }
  } else {
    if (isCurrentUserPartnerAdmin) {
      targetPartnerId = parseInt(partnerId)
    }
  }

  let targetClientIds = null
  if (isMasqueradeMode) {
    if (isTargetUserClientAdmin) {
      targetClientIds = targetUser?.enterprise_client_ids?.map(id =>
        parseInt(id)
      )
    }
  } else {
    if (isCurrentUserClientAdmin) {
      targetClientIds = clientIds?.map(id => parseInt(id))
    }
  }

  const hasTargetAccessToAdministrationPages = isMasqueradeMode
    ? targetUser?.access_code_manager === "true"
    : hasAccessToAdministrationPages

  const hasTargetAccessToRegistrationPages = isMasqueradeMode
    ? targetUser?.can_register_kits === "true"
    : hasAccessToRegistrationPages

  let targetRole = null
  if (isMasqueradeMode) {
    if (isTargetUserPartnerAdmin) {
      targetRole = HASURA_ROLE.partner
    } else if (isTargetUserClientAdmin) {
      targetRole = HASURA_ROLE.client
    }
  } else {
    if (isCurrentUserPartnerAdmin) {
      targetRole = HASURA_ROLE.partner
    } else if (isCurrentUserClientAdmin) {
      targetRole = HASURA_ROLE.client
    }
  }

  const hasTargetAccessToMultipleClients =
    targetRole === HASURA_ROLE.partner || targetClientIds?.length > 1

  const targetUserOktaUserId = targetUser?.okta_user_id

  const isUserManagementFeatureOn =
    process.env.GATSBY_USER_MANAGEMENT_FEATURE === "ON"

  return {
    isEverlywellSuperAdmin,
    isMasqueradeMode,
    targetPartnerId,
    targetClientIds,
    targetRole,
    targetUserOktaUserId,
    isTargetUserHCPAdmin,
    hasTargetAccessToAdministrationPages,
    hasTargetAccessToRegistrationPages,
    hasTargetAccessToMultipleClients,
    isUserManagementFeatureOn,
  }
}

export default useSuperAdmin
