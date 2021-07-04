import { gql } from "@apollo/client"

const query = vars => {
  return gql`
    query SampleIssuesCount(
      $partner_id: Int
      $client_ids: [Int!]
    ) {
      issue_groups {
        name
        issues_aggregate(where: {
          barcode: {
            ${
              vars?.partner_id
                ? `spree_order:{enterprise_partner_id:{_eq:$partner_id}}`
                : ""
            }
            ${
              vars?.client_ids
                ? `spree_order:{enterprise_client_id:{_in:$client_ids}}`
                : ""
            }
            kit_result: {
              id: {
                _is_null: false
              }
            }
          }
        }) {
          aggregate {
            count
          }
        }
      }
    }
  `
}

export default query
