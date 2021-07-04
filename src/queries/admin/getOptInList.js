import { gql } from "@apollo/client"

const GET_OPT_IN_LIST = gql`
  query OptInList($code: String) {
    spree_orders(
      where: { access_code: { code: { _eq: $code } } }
      order_by: { created_at: asc }
    ) {
      number
      third_party_member_id
      email
      dob
      user_id
      spree_line_items {
        spree_variant {
          spree_product {
            name
          }
        }
      }
      ship_address_id
      ship_address {
        firstname
        lastname
        phone
      }
      enterprise_consumer_id
      created_at
    }
  }
`

export default GET_OPT_IN_LIST
