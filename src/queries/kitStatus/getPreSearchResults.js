import { gql } from "@apollo/client"

const rapidTestRestrictionQuery = ({ isHCPAdmin, rapidTestId }) => {
  if (!isHCPAdmin || !rapidTestId) {
    return ``
  }

  return `{ test_id: { _eq: $rapidTestId } }`
}

const query = params => gql`
  query getKitStatusSearchResults(
    $search_text: String!
    $last_name_search: String
    $offset: Int!
    $limit: Int!
    $from: timestamp
    $to: timestamp
    $status: String

    ${params.partner_id ? "$partner_id: Int" : ""}
    ${params.client_ids ? "$client_ids: [Int]" : ""}

    $shouldFetchRapidTests: Boolean!
    $isHCPAdmin: Boolean
    $rapidTestId: Int
  ) {
    kit_results(
      where: {
        _and: [
          {
            _or: [
              { barcode: { serial_number: { _ilike: $search_text } } }
              {
                spree_user: {
                  consumer: {
                    _or: [
                      { first_name: { _ilike: $search_text } }
                      { last_name: { _ilike: $last_name_search } }
                    ]
                  }
                }
              }
            ]
          }

          ${
            params.partner_id
              ? `{barcode:{spree_order:{enterprise_partner_id:{_eq:${params.partner_id}}}}}`
              : ""
          }
  
          ${
            params.client_ids
              ? `{barcode:{spree_order:{enterprise_client_id:{_in:[${params.client_ids}]}}}}`
              : ""
          }
  
          ${rapidTestRestrictionQuery({
            isHCPAdmin: params.isHCPAdmin,
            rapidTestId: params.rapidTestId,
          })}
        ]
      }
      limit: $limit
      offset: $offset
    ) {
      barcode {
        serial_number
        barcode_state_transitions(
          where: { to: { _in: ["registered", "processed"] } }
        ) {
          created_at
          to
        }
        fulfillment_provider {
          name
        }
        state
      }
      spree_user {
        consumer {
          first_name
          last_name
        }
      }
      status
      rapid_test @include(if: $shouldFetchRapidTests) {
        displayStatus
        kitResultId
        collectedAt
        resultsEnteredAt
        result
      }
      kit_values
      test_id
      test {
        display_name
      }
      id
    }
  }
`

export default query
