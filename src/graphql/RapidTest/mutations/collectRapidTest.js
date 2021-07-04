import gql from "graphql-tag"

const COLLECT_RAPID_TEST = gql`
  mutation collectRapidTest(
    $kit_result_id: Int!
    $collected_at: timestamp!
    $collected_by: String!
    $test_id: Int!
    $pwn_order_number: String!
    $barcode_serial_number: String!
    $enterprise_client_id: bigint
    $enterprise_partner_id: bigint
  ) {
    collectRapidTest(
      kit_result_id: $kit_result_id
      collected_at: $collected_at
      collected_by: $collected_by
      test_id: $test_id
      pwn_order_number: $pwn_order_number
      barcode_serial_number: $barcode_serial_number
      enterprise_client_id: $enterprise_client_id
      enterprise_partner_id: $enterprise_partner_id
    ) {
      id
      errors
    }
  }
`

export default COLLECT_RAPID_TEST
