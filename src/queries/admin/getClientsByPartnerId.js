import { gql } from "@apollo/client"

const GET_CLIENTS_BY_PARTNER_ID = gql`
  query ClientsByPartner($partner_id: bigint) {
    enterprise_clients(where: { enterprise_partner_id: { _eq: $partner_id } }) {
      id
      name
      enterprise_partner_configs {
        paid_access_codes_enabled
      }
    }
  }
`

export default GET_CLIENTS_BY_PARTNER_ID
