import { gql } from "@apollo/client"

import { KitStatusValue } from "utils/constants"

const getStatusQuery = status => {
  if (status?.length) {
    let query = "_or: ["

    if (status.includes(KitStatusValue.Registered)) {
      query += `
        {
          _and: [
            {status: { _neq: "${KitStatusValue.Approved}"}}
            {barcode: {state: {_eq: "${KitStatusValue.Registered}"}}}
          ]
        }
        `
    }

    if (status.includes(KitStatusValue.Retrievable)) {
      query += `
        {
          _and: [
            {status: { _neq: "${KitStatusValue.Approved}"}}
            {barcode: {state: {_eq: "${KitStatusValue.Processed}"}}}
          ]
        }
        `
    }

    if (status.includes(KitStatusValue.Approved)) {
      query += `{status: { _eq: "${KitStatusValue.Approved}"}}`
    }

    if (status.includes(KitStatusValue.Canceled)) {
      query += `{status: { _eq: "${KitStatusValue.Archived}"}}`
    }

    query = query + "]"

    let addition = ``
    if (
      status.includes("results_entered") &&
      !status.includes("results_approved")
    ) {
      addition = `status: { _neq: "results_approved" }`
    }

    return `
        _or: [
          { ${query} }
          { id: { _in: $filterStatusIncludeKitsWithIds }, ${addition} }
        ]
        _not: { id: { _in: $filterStatusExcludeKitsWithIds } }
      `
  } else {
    return "status: { _in: $status }"
  }
}

const getResultsEnteredQuery = ({ isFilteredByResultsEntered }) => {
  if (!isFilteredByResultsEntered) {
    return ``
  }

  return `{ id: { _in: $includeKitResultsWithIds } }`
}

const getCollectedAtQuery = ({ isFilteredByCollectedAt }) => {
  if (!isFilteredByCollectedAt) {
    return ``
  }

  return `{ id: { _in: $includeKitResultsWithIdsFilteredByCollectedAt } }`
}

const getResultsEnteredAtQuery = ({ isFilteredByResultsEnteredAt }) => {
  if (!isFilteredByResultsEnteredAt) {
    return ``
  }

  return `{ id: { _in: $includeKitResultsWithIdsFilteredByResultsEnteredAt } }`
}

const rapidTestRestrictionQuery = ({ isHCPAdmin, rapidTestId }) => {
  if (!isHCPAdmin || !rapidTestId) {
    return ``
  }

  return `{ test_id: { _eq: $rapidTestId } }`
}

const query = vars => gql`
    query KitStatus(
      $search_text: String
      $last_name_search: String
      $order_by: [kit_results_order_by!]
      $offset: Int
      $limit: Int
      $clients: [Int!]
      $noneClient: Int
      $status: [String!]
      $filterStatusIncludeKitsWithIds: [Int!]
      $filterStatusExcludeKitsWithIds: [Int!]
      $orderedFrom: timestamp
      $orderedTo: timestamp
      $registeredFrom: timestamp
      $registeredTo: timestamp
      $receivedFrom: timestamp
      $receivedTo: timestamp
      ${vars?.sampleIssues?.length ? "$sampleIssues: [String!]" : ""}
      $approvedFrom: timestamp
      $approvedTo: timestamp
      $participantViewedAtFrom: timestamp
      $participantViewedAtTo: timestamp
      $testNames: [String!]
      ${vars?.results?.length ? "$results: [String!]" : ""}
      $partner_id: Int
      $client_ids: [Int!]
      $isFilteredByResultsEntered: Boolean
      $includeKitResultsWithIds: [Int!]
      $isFilteredByCollectedAt: Boolean
      $includeKitResultsWithIdsFilteredByCollectedAt: [Int!]
      $isFilteredByResultsEnteredAt: Boolean
      $includeKitResultsWithIdsFilteredByResultsEnteredAt: [Int!]

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

            ${rapidTestRestrictionQuery({
              isHCPAdmin: vars.isHCPAdmin,
              rapidTestId: vars.rapidTestId,
            })}

            ${getResultsEnteredQuery({
              isFilteredByResultsEntered: vars?.isFilteredByResultsEntered,
            })}

            ${getCollectedAtQuery({
              isFilteredByCollectedAt: vars?.isFilteredByCollectedAt,
            })}

            ${getResultsEnteredAtQuery({
              isFilteredByResultsEnteredAt: vars?.isFilteredByResultsEnteredAt,
            })}

            ${
              vars?.clients
                ? vars?.noneClient > 0
                  ? `
                  {
                    _or: [
                      {
                        barcode: {
                          spree_order: {
                            enterprise_client_id: {
                              _in: $clients
                            }
                          }
                        }
                      }
                      {
                        barcode: {
                          spree_order: {
                            enterprise_client_id: {
                              _is_null: true
                            }
                          }
                        }
                      }
                    ]
                  }
                `
                  : `
              {
                barcode: {
                  spree_order: {
                    enterprise_client_id: {
                      _in: $clients
                    }
                  }
                }
              }
            `
                : vars?.noneClient > 0
                ? `
            {
              barcode: {
                spree_order: {
                  enterprise_client_id: {
                    _is_null: true
                  }
                }
              }
            }
            `
                : ""
            }
            {
              barcode: {
                _and: [
                  ${
                    vars?.orderedFrom && vars?.orderedTo
                      ? `
                  {
                    spree_order: {
                      _and: [
                        {
                          completed_at: {
                            _gte: $orderedFrom
                          }
                        }
                        {
                          completed_at: {
                            _lte: $orderedTo
                          }
                        }
                      ]
                    }
                  }
                    `
                      : ``
                  }
                  ${
                    vars?.registeredFrom && vars?.registeredTo
                      ? `
                  {
                    barcode_state_transitions: {
                      _and: [
                        {
                          to: {
                            _eq: "${KitStatusValue.Registered}"
                          }
                        }
                        {
                          created_at: {
                            _gte: $registeredFrom
                          }
                        }
                        {
                          created_at: {
                            _lte: $registeredTo
                          }
                        }
                      ]
                    }
                  }
                    `
                      : ``
                  }
                  ${
                    vars?.receivedFrom && vars?.receivedTo
                      ? `
                    {
                      _or: [
                        {
                          _and:[
                            {
                              delivered_to_lab_notifications_sent_at: {_is_null: true}
                              barcode_state_transitions: {
                                _and: [
                                  {
                                    to: {
                                      _eq: "${KitStatusValue.Processed}"
                                    }
                                  }
                                  {
                                    created_at: {
                                      _gte: $receivedFrom
                                    }
                                  }
                                  {
                                    created_at: {
                                      _lte: $receivedTo
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                        {
                          _and:[
                            {
                              delivered_to_lab_notifications_sent_at: {
                                _gte: $receivedFrom
                              }
                            }
                            {
                              delivered_to_lab_notifications_sent_at: {
                                _lte: $receivedTo
                              }
                            }
                          ]
                        }
                    ]}
                  `
                      : ``
                  }
                  ${
                    vars?.sampleIssues?.length
                      ? "{issues: { issue_group: { name: { _in: $sampleIssues } } }}"
                      : ""
                  }
                  {
                    kit_result: { test: { display_name: { _in: $testNames } } }
                  }
                ]
              }
            }
            {
              ${getStatusQuery(vars?.status)}
            }
            ${
              vars?.approvedFrom && vars?.approvedTo
                ? `
                {
                  results_approved_at: {
                    _gte: $approvedFrom
                  }
                }
                {
                  results_approved_at: {
                    _lte: $approvedTo
                  }
                }
                `
                : ""
            }
            ${
              vars?.participantViewedAtFrom && vars?.participantViewedAtTo
                ? `
                {
                  viewed_at: {
                    _gte: $participantViewedAtFrom
                  }
                }
                {
                  viewed_at: {
                    _lte: $participantViewedAtTo
                  }
                }
                `
                : ""
            }

            ${vars?.results?.length ? `{ summary: { _in: $results }}` : ""}

            ${
              vars?.partner_id
                ? `{barcode:{spree_order:{enterprise_partner_id:{_eq:$partner_id}}}}`
                : ""
            }
            ${
              vars?.client_ids
                ? `{barcode:{spree_order:{enterprise_client_id:{_in:$client_ids}}}}`
                : ""
            }
          ]
        }
        order_by: $order_by
        limit: $limit
        offset: $offset
      ) {
        summary
        barcode {
          completed_kit_registrations {
            spree_user {
              email
              phone_number
            }
          }
          serial_number
          delivered_to_lab_notifications_sent_at
          barcode_state_transitions(
            where: { to: { _in: ["${KitStatusValue.Registered}", "${
  KitStatusValue.Processed
}"] } }
          ) {
            created_at
            to
          }
          issues(order_by: { updated_at: desc }) {
            issue_group {
              name
            }
            resolved
          }
          spree_order {
            completed_at
            enterprise_client_id
            enterprise_partner_id
            enterprise_client {
              name
            }
            third_party_member_id
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
            dob
            partner_memberships {
              member_id
              enterprise_partner_id
              enterprise_client_id
            }
          }
        }
        status
        results_approved_at
        test_id
        test {
          display_name
        }
        marker_results {
          name
          value
          lab_reference_range
        }
        kit_values
        kit_reference_ranges
        id
        viewed_at
        created_at
        rapid_test @include(if: $shouldFetchRapidTests) {
          displayStatus
          kitResultId
          collectedAt
          resultsEnteredAt
          result
        }
      }
      kit_results_aggregate(
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

            ${rapidTestRestrictionQuery({
              isHCPAdmin: vars.isHCPAdmin,
              rapidTestId: vars.rapidTestId,
            })}

            ${getResultsEnteredQuery({
              isFilteredByResultsEntered: vars?.isFilteredByResultsEntered,
            })}

            ${getCollectedAtQuery({
              isFilteredByCollectedAt: vars?.isFilteredByCollectedAt,
            })}
            
            ${getResultsEnteredAtQuery({
              isFilteredByResultsEnteredAt: vars?.isFilteredByResultsEnteredAt,
            })}
            
            ${
              vars?.clients
                ? vars?.noneClient > 0
                  ? `
                  {
                    _or: [
                      {
                        barcode: {
                          spree_order: {
                            enterprise_client_id: {
                              _in: $clients
                            }
                          }
                        }
                      }
                      {
                        barcode: {
                          spree_order: {
                            enterprise_client_id: {
                              _is_null: true
                            }
                          }
                        }
                      }
                    ]
                  }
                `
                  : `
              {
                barcode: {
                  spree_order: {
                    enterprise_client_id: {
                      _in: $clients
                    }
                  }
                }
              }
            `
                : vars?.noneClient > 0
                ? `
            {
              barcode: {
                spree_order: {
                  enterprise_client_id: {
                    _is_null: true
                  }
                }
              }
            }
            `
                : ""
            }
            {
              barcode: {
                _and: [
                  ${
                    vars?.orderedFrom && vars?.orderedTo
                      ? `
                  {
                    spree_order: {
                      _and: [
                        {
                          completed_at: {
                            _gte: $orderedFrom
                          }
                        }
                        {
                          completed_at: {
                            _lte: $orderedTo
                          }
                        }
                      ]
                    }
                  }
                    `
                      : ``
                  }
                  ${
                    vars?.registeredFrom && vars?.registeredTo
                      ? `
                  {
                    barcode_state_transitions: {
                      _and: [
                        {
                          to: {
                            _eq: "${KitStatusValue.Registered}"
                          }
                        }
                        {
                          created_at: {
                            _gte: $registeredFrom
                          }
                        }
                        {
                          created_at: {
                            _lte: $registeredTo
                          }
                        }
                      ]
                    }
                  }
                      `
                      : ``
                  }
      ${
        vars?.receivedFrom && vars?.receivedTo
          ? ` 
          {
            _or: [
              {
                _and:[
                  {
                    delivered_to_lab_notifications_sent_at: {_is_null: true}
                    barcode_state_transitions: {
                      _and: [
                        {
                          to: {
                            _eq: "${KitStatusValue.Processed}"
                          }
                        }
                        {
                          created_at: {
                            _gte: $receivedFrom
                          }
                        }
                        {
                          created_at: {
                            _lte: $receivedTo
                          }
                        }
                      ]
                    }
                  }
                ]
              }
              {
                _and:[
                  {
                    delivered_to_lab_notifications_sent_at: {
                      _gte: $receivedFrom
                    }
                  }
                  {
                    delivered_to_lab_notifications_sent_at: {
                      _lte: $receivedTo
                    }
                  }
                ]
              }
          ]} 
        `
          : ``
      }
                  
                  ${
                    vars?.sampleIssues?.length
                      ? "{issues: { issue_group: { name: { _in: $sampleIssues } } }}"
                      : ""
                  }
                  {
                    kit_result: { test: { display_name: { _in: $testNames } } }
                  }
                ]
              }
            }
            {
              ${getStatusQuery(vars?.status)}
            }
            ${
              vars?.approvedFrom && vars?.approvedTo
                ? `
                {
                  results_approved_at: {
                    _gte: $approvedFrom
                  }
                }
                {
                  results_approved_at: {
                    _lte: $approvedTo
                  }
                }
                `
                : ""
            }
            ${
              vars?.participantViewedAtFrom && vars?.participantViewedAtTo
                ? `
                {
                  viewed_at: {
                    _gte: $participantViewedAtFrom
                  }
                }
                {
                  viewed_at: {
                    _lte: $participantViewedAtTo
                  }
                }
                `
                : ""
            }

            ${vars?.results?.length ? `{ summary: { _in: $results }}` : ""}

            ${
              vars?.partner_id
                ? `{barcode:{spree_order:{enterprise_partner_id:{_eq:$partner_id}}}}`
                : ""
            }
            ${
              vars?.client_ids
                ? `{barcode:{spree_order:{enterprise_client_id:{_in:$client_ids}}}}`
                : ""
            }
          ]
        }
      ) {
        aggregate {
          count
        }
      }
    }
    `

export default query
