import gql from "graphql-tag"

const UPDATE_ACCESS_CODE = gql`
  mutation UpdateAccessCode(
    $id: bigint!
    $name: String
    $opens_at: timestamp
    $closes_at: timestamp
    $max_orders: Int
    $active: Boolean
    $shipping_method_ids: [Int]
  ) {
    updateAccessCode(
      id: $id
      name: $name
      closes_at: $closes_at
      opens_at: $opens_at
      max_orders: $max_orders
      active: $active
      shipping_method_ids: $shipping_method_ids
    ) {
      id
    }
  }
`

export default UPDATE_ACCESS_CODE
