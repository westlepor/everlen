import { gql } from "@apollo/client"

const GET_TEST_IDS = vars =>
  vars.partner_id || vars.client_ids
    ? gql`
        query TestIds($partner_id: Int, $client_ids: [Int!]) {
          kit_results(
            distinct_on: test_id
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
            test_id
          }
        }
      `
    : gql`
        query TestIds {
          kit_results(distinct_on: test_id) {
            test_id
          }
        }
      `

export default GET_TEST_IDS
