import { gql } from "@apollo/client"

const filterRapidTestsForHCPAdmin = ({ isHCPAdmin }) => {
  if (!isHCPAdmin) {
    return ``
  }

  return `
    test_id: { _eq: $rapidTestId }
  `
}

const GET_COUNT_BY_STATUS = ({ isHCPAdmin }) => gql`
  query CountByStatus(
    $partner_id: Int
    $client_ids: [Int!]
    $isHCPAdmin: Boolean!
    $isHCPOrCanViewRapidTests: Boolean!
    $rapidTestId: Int
    $excludeRegisteredKitsWithIds: [Int!]
    $includeResultsEnteredKitsWithIds: [Int!]
  ) {
    registered: kit_results_aggregate(
      where: {
        ${filterRapidTestsForHCPAdmin({ isHCPAdmin })}

        id: { _nin: $excludeRegisteredKitsWithIds }
        status: { _neq: "results_approved" }
        barcode: {
          state: { _eq: "registered" }
          spree_order: {
            _or: {
              enterprise_partner_id: { _eq: $partner_id }
              enterprise_client_id: { _in: $client_ids }
            }
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }

    retrievable_results: kit_results_aggregate(
      where: {
        ${filterRapidTestsForHCPAdmin({ isHCPAdmin })}

        id: { _nin: $excludeRegisteredKitsWithIds }
        status: { _neq: "results_approved" }
        barcode: {
          state: { _eq: "processed" }
          spree_order: {
            _or: {
              enterprise_partner_id: { _eq: $partner_id }
              enterprise_client_id: { _in: $client_ids }
            }
          }
        }
      }
    ) @skip(if: $isHCPAdmin) {
      aggregate {
        count
      }
    }

    approved_results_entered: kit_results_aggregate(
      where: {
        ${filterRapidTestsForHCPAdmin({ isHCPAdmin })}

        id: { _in: $includeResultsEnteredKitsWithIds }
        status: { _eq: "results_approved" }
        barcode: {
          spree_order: {
            _or: {
              enterprise_partner_id: { _eq: $partner_id }
              enterprise_client_id: { _in: $client_ids }
            }
          }
        }
      }
    ) @include(if: $isHCPOrCanViewRapidTests) {
      aggregate {
        count
      }
    }

    approved: kit_results_aggregate(
      where: {
        ${filterRapidTestsForHCPAdmin({ isHCPAdmin })}

        status: { _eq: "results_approved" }
        barcode: {
          spree_order: {
            _or: {
              enterprise_partner_id: { _eq: $partner_id }
              enterprise_client_id: { _in: $client_ids }
            }
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }

    canceled: kit_results_aggregate(
      where: {
        ${filterRapidTestsForHCPAdmin({ isHCPAdmin })}

        status: { _eq: "archived" }
        barcode: {
          spree_order: {
            _or: {
              enterprise_partner_id: { _eq: $partner_id }
              enterprise_client_id: { _in: $client_ids }
            }
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`

export default GET_COUNT_BY_STATUS
