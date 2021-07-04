import { gql } from "@apollo/client"

const GET_BARCODE_BY_SERIAL_NUMBER = gql`
  query(
    $serial_number: String!,
    $partner_id: Int,
    $client_ids: [Int!],
    $include_enterprise_partner: Boolean!
  ) {
  barcodes(
    where: {
        serial_number: { _eq: $serial_number }
        spree_order: {
          _or: {
            enterprise_partner_id: {  _eq: $partner_id }
            enterprise_client_id: { _in: $client_ids }
          }
        }
    }
 ) {
    state
    spree_order {
      enterprise_client {
        name
        enterprise_partner_configs {
          third_party_id
          user_email_required
          third_party_id_registration_enabled
        }
      }
      enterprise_partner @include(if: $include_enterprise_partner) {
        enterprise_partner_configs(
          where: { enterprise_client_id: { _is_null: true } }
        ) {
          third_party_id
          user_email_required
          third_party_id_registration_enabled
        }
      }
    }
    spree_variant {
      sku
      spree_product {
        name
      }
    }
  }
 }
`

export default GET_BARCODE_BY_SERIAL_NUMBER;
