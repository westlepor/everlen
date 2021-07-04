import { gql } from "@apollo/client"

const GET_ACCESS_CODES = vars => gql`
  query AccessCodeList($partner_id: bigint, $client_ids: [bigint!]) {
    access_codes(
      where: {
        ${vars?.partner_id ? `enterprise_partner_id:{_eq:$partner_id}` : ""}
        ${vars?.client_ids ? `enterprise_client_id:{_in:$client_ids}` : ""}
      }
    ) {
      code
      active
      spree_orders_aggregate {
        aggregate {
          count
        }
      }
      max_orders
      opens_at
      closes_at
      name
      enterprise_client {
        name
      }
    }
  }
`

export default GET_ACCESS_CODES
