import { gql } from "@apollo/client"

const GET_PARTNER_CONFIG_BY_PARTNER_ID = gql`
  query EnterprisePartnerConfig($partner_id: bigint) {
    enterprise_partner_configs(
      where: {
        enterprise_client_id: { _is_null: true }
        enterprise_partner_id: { _eq: $partner_id }
      }
    ) {
      paid_access_codes_enabled
    }
  }
`

export default GET_PARTNER_CONFIG_BY_PARTNER_ID
