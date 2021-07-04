const getThirdPartyMemberId = data => {
  const spreeOrderThirdPartyMemberId =
    data?.barcode?.spree_order?.third_party_member_id

  if (!!spreeOrderThirdPartyMemberId) {
    return spreeOrderThirdPartyMemberId
  }

  const partnerId = data?.barcode?.spree_order?.enterprise_partner_id
  const clientId = data?.barcode?.spree_order?.enterprise_client_id
  const partnerMembership = data?.spree_user?.consumer?.partner_memberships?.find(
    m =>
      m.enterprise_partner_id === partnerId &&
      m.enterprise_client_id === clientId
  )

  return partnerMembership?.member_id || "-"
}

const findThirdPartyIdConfig = data => {
  const isBelongingToClient = !!data?.barcode?.spree_order?.enterprise_client_id

  if (isBelongingToClient) {
    const [config] =
      data?.barcode?.spree_order?.enterprise_client
        ?.enterprise_partner_configs || []

    return config
  }

  const [config] =
    data?.barcode?.spree_order?.enterprise_partner
      ?.enterprise_partner_configs || []

  return config
}

export { getThirdPartyMemberId, findThirdPartyIdConfig }
