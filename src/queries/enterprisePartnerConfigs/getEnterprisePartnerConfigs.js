import { gql } from "@apollo/client"

const GET_ENTERPRISE_PARTNER_CONFIGS = gql`
  query EnterprisePartnerConfigs(
    $partner_id: bigint
    $client_ids: [bigint!]
   ) {
    enterprise_partner_configs(
      where: {
        _or: {
          enterprise_partner_id: {  _eq: $partner_id }
          enterprise_client_id: { _in: $client_ids }
        }
      }
    ) {
      third_party_id
      user_email_required
      third_party_id_registration_enabled
    }
  }
`

export default GET_ENTERPRISE_PARTNER_CONFIGS
