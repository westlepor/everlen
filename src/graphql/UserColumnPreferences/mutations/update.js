import { gql } from "@apollo/client"

import TEST_KIT_TABLE_CONFIG_FRAGMENT from "../fragments/testKitTableConfigFragment"

const UPDATE_USER_COLUMN_PREFERENCE = gql`
  mutation UpdateUserColumnPreferenceMutation(
    $id: ID!
    $client: Boolean
    $email: Boolean
    $kit_id: Boolean
    $kit_status: Boolean
    $ordered: Boolean
    $participant: Boolean
    $participant_viewed_at: Boolean
    $collected: Boolean
    $received_by_lab: Boolean
    $results_entered_at: Boolean
    $results_entered: Boolean
    $registered: Boolean
    $result: Boolean
    $results_released: Boolean
    $sample_issue: Boolean
    $test_name: Boolean
    $third_party_member_id: Boolean
    $date_of_birth: Boolean
    $phone: Boolean
  ) {
    partialUpdateUser(
      id: $id
      data: {
        test_kit_table_config: {
          client: $client
          email: $email
          kit_id: $kit_id
          kit_status: $kit_status
          ordered: $ordered
          participant: $participant
          participant_viewed_at: $participant_viewed_at
          received_by_lab: $received_by_lab
          collected: $collected
          registered: $registered
          results_entered_at: $results_entered_at
          results_entered: $results_entered
          result: $result
          results_released: $results_released
          sample_issue: $sample_issue
          test_name: $test_name
          third_party_member_id: $third_party_member_id
          date_of_birth: $date_of_birth
          phone: $phone
        }
      }
    ) {
      test_kit_table_config {
        ...TestKitTableConfigFragment
      }
    }
  }

  ${TEST_KIT_TABLE_CONFIG_FRAGMENT}
`

export default UPDATE_USER_COLUMN_PREFERENCE
