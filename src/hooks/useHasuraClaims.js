const useHasuraClaims = (user = {}) => {
  const claims = user?.idToken?.claims || {}

  const xHasuraRole = claims["x-hasura-role"]
  const hasuraClaims = JSON.parse(claims?.hasura || "{}") || {}

  const isEnterprisePartnerClinicalAdmin = [
    "enterprise_partner_clinical_admin",
    "enterprise_partner_hcp",
  ].includes(xHasuraRole)

  const isEnterpriseClientClinicalAdmin = [
    "enterprise_client_clinical_admin",
    "enterprise_client_hcp",
  ].includes(xHasuraRole)

  const isHCPAdmin = [
    "enterprise_partner_hcp",
    "enterprise_client_hcp",
  ].includes(xHasuraRole)

  const rapidTestId = parseInt(process.env.GATSBY_RAPID_TEST_ID)

  const canViewRapidTests =
    hasuraClaims["x-hasura-can-view-rapid-tests"] === "true"

  const isHCPOrCanViewRapidTests = isHCPAdmin || canViewRapidTests

  const hasAccessToAdministrationPages =
    hasuraClaims["x-hasura-access-code-manager"] === "true"

  const hasAccessToRegistrationPages =
    hasuraClaims["x-hasura-can-register-kits"] === "true"

  const enterprisePartnerId = parseInt(hasuraClaims["x-hasura-partner-id"])
  const enterpriseClientIds = hasuraClaims["x-hasura-client-ids"]?.slice(1, -1)
    ? hasuraClaims["x-hasura-client-ids"]
        .slice(1, -1)
        .split(",")
        .map(id => parseInt(id))
    : null

  const hasMoreThanOneClientId = enterpriseClientIds?.length > 1

  const hasAccessToMultipleClients =
    isEnterprisePartnerClinicalAdmin || hasMoreThanOneClientId

  const { faunaId, name: currentUserName } = claims
  const currentUserId = claims?.sub

  return {
    hasAccessToAdministrationPages,
    hasAccessToMultipleClients,
    hasAccessToRegistrationPages,

    isEnterprisePartnerClinicalAdmin,
    isEnterpriseClientClinicalAdmin,

    isHCPAdmin,
    rapidTestId,
    canViewRapidTests,
    isHCPOrCanViewRapidTests,

    enterprisePartnerId,
    enterpriseClientIds,

    faunaId,
    currentUserName,
    currentUserId,
  }
}

export default useHasuraClaims
