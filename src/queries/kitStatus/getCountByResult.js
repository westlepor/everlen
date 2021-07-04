import { gql } from "@apollo/client"

const query = vars => gql`
  query CountByResult(
    $partner_id: Int
    $client_ids: [Int!]
  ) {
    normal: kit_results_aggregate(
      where: {
        summary: {_eq: "normal"} 
        ${
          vars?.partner_id
            ? `barcode: {spree_order:{enterprise_partner_id:{_eq:$partner_id}}}`
            : ""
        }
        ${
          vars?.client_ids
            ? `barcode: {spree_order:{enterprise_client_id:{_in:$client_ids}}}`
            : ""
        }
      }
    ) {
      aggregate {
        count
      }
    }

    needs_review: kit_results_aggregate(
      where: {
        summary: {_eq: "needs_review"} 

        ${
          vars?.partner_id
            ? `barcode: {spree_order:{enterprise_partner_id:{_eq:$partner_id}}}`
            : ""
        }
        ${
          vars?.client_ids
            ? `barcode: {spree_order:{enterprise_client_id:{_in:$client_ids}}}`
            : ""
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default query
