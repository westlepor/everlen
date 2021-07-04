import gql from "graphql-tag"

const CREATE_ACCESS_CODE = gql`
  mutation CreateAccessCode(
    $code: String!
    $name: String
    $enterprise_client_id: bigint
    $max_participant_orders_per_period: Int
    $participant_order_period: String
    $opens_at: timestamp
    $closes_at: timestamp
    $enterprise_partner_product_ids: String
    $max_orders: Int
    $shipping_method_ids: [Int]
    $test_taker_paid: Boolean
  ) {
    createAccessCode(
      code: $code
      name: $name
      enterprise_client_id: $enterprise_client_id
      max_participant_orders_per_period: $max_participant_orders_per_period
      participant_order_period: $participant_order_period
      opens_at: $opens_at
      closes_at: $closes_at
      max_orders: $max_orders
      enterprise_partner_product_ids: $enterprise_partner_product_ids
      shipping_method_ids: $shipping_method_ids
      test_taker_paid: $test_taker_paid
    ) {
      id
    }
  }
`

export default CREATE_ACCESS_CODE
