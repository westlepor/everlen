import { gql } from "@apollo/client"

const GET_ACCESS_CODE_BY_CODE = gql`
  query AccessCodes($code: String) {
    access_codes(where: { code: { _eq: $code } }) {
      id
      name
      code
      active
      opens_at
      closes_at
      max_orders
      max_participant_orders_per_period
      participant_order_period
      enterprise_client_id
      access_code_products(
        where: {
          enterprise_partner_product: { lens_orderable: { _eq: true } }
        }
      ) {
        enterprise_partner_product {
          id
          spree_product {
            name
          }
        }
      }
      access_code_shipping_methods {
        spree_shipping_method {
          id
        }
      }
    }
  }
`

export default GET_ACCESS_CODE_BY_CODE
