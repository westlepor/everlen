import { gql } from "@apollo/client"

const GET_TEST_COUNT = vars =>
  vars?.partner_id || vars?.client_ids
    ? gql`
        query TestCount($ids: [Int!], $partner_id: Int, $client_ids: [Int!]) {
          tests(where: { id: { _in: $ids } }) {
            id
            display_name
            kit_results_aggregate(
              where: {
                ${
                  vars?.partner_id
                    ? `barcode:{spree_order:{enterprise_partner_id:{_eq:$partner_id}}}`
                    : ""
                }
                ${
                  vars?.client_ids
                    ? `barcode:{spree_order:{enterprise_client_id:{_in:$client_ids}}}`
                    : ""
                }
              }
            ) {
              aggregate {
                count
              }
            }
          }
        }
      `
    : gql`
        query TestCount($ids: [Int!]) {
          tests(where: { id: { _in: $ids } }) {
            id
            display_name
            kit_results_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `

export default GET_TEST_COUNT
