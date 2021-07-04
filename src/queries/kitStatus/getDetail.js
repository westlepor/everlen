import { gql } from "@apollo/client"

const GET_TEST_KIT_DETAILS = gql`
  query KitResultDetail(
    $id: Int
    $isPartnerClinicalAdmin: Boolean!
    $shouldFetchRapidTests: Boolean!
  ) {
    kit_results(where: { id: { _eq: $id } }) {
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
          order_by: { created_at: asc }
          where: { to: { _in: ["registered", "processed"] } }
        ) {
          created_at
          to
          from
        }
        fulfillment_provider {
          name
        }
        issues(order_by: { updated_at: desc }) {
          issue_group {
            name
          }
        }
        spree_order {
          completed_at
          third_party_member_id
          enterprise_client_id
          enterprise_client {
            name
            enterprise_partner_configs {
              third_party_id
              third_party_id_registration_enabled
              third_party_id_order_enabled
            }
          }
          enterprise_partner_id
          enterprise_partner @include(if: $isPartnerClinicalAdmin) {
            enterprise_partner_configs(
              where: { enterprise_client_id: { _is_null: true } }
            ) {
              third_party_id
              third_party_id_registration_enabled
              third_party_id_order_enabled
            }
          }
        }
      }
      kit_result_status_transitions(
        where: { to: { _eq: "results_approved" } }
      ) {
        to
        created_at
      }
      status
      results_approved_at
      rapid_test @include(if: $shouldFetchRapidTests) {
        displayStatus
        kitResultId
        collectedAt
        resultsEnteredAt
        result
      }
      viewed_at
      id
      pwn_order_number
      spree_user {
        consumer {
          first_name
          last_name
          dob
          partner_memberships {
            enterprise_partner_id
            enterprise_client_id
            member_id
          }
        }
      }
      test_id
      test {
        display_name
      }
      marker_results {
        value
        name
        lab_reference_range
      }
      kit_values
      kit_reference_ranges
    }
  }
`

export default GET_TEST_KIT_DETAILS
