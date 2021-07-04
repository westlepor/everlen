import { gql } from "@apollo/client"

const GET_CLIENTS_BY_CLIENT_IDS = gql`
  query ClientsByIDs($client_ids: [bigint!]) {
    enterprise_clients(where: { id: { _in: $client_ids } }) {
      id
      name
      enterprise_partner_configs {
        paid_access_codes_enabled
      }
    }
  }
`

export default GET_CLIENTS_BY_CLIENT_IDS
