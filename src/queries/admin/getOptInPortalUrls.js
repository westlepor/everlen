import { gql } from "@apollo/client"

const GET_OPT_IN_PORTAL_URLS = gql`
  query OptInPortalUrls(
    $isPartnerClinicalAdmin: Boolean!
    $partner_id: bigint
    $client_ids: [bigint!]
  ) {
    enterprise_partner_configs(
      where: {
        _or: {
          enterprise_partner_id: { _is_null: false, _eq: $partner_id }
          enterprise_client_id: { _is_null: false, _in: $client_ids }
        }
      }
    ) {
      portal: opt_in_portal
      partner: enterprise_partner @include(if: $isPartnerClinicalAdmin) {
        name: display_name
      }
      client: enterprise_client {
        name
      }
    }
  }
`

export default GET_OPT_IN_PORTAL_URLS
