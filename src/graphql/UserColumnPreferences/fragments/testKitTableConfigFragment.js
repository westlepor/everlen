import { gql } from "@apollo/client"

const TEST_KIT_TABLE_CONFIG_FRAGMENT = gql`
  fragment TestKitTableConfigFragment on TestKitTableConfig {
    client
    kit_id
    kit_status
    participant
    date_of_birth
    email
    third_party_member_id
    phone
    ordered
    registered
    collected
    received_by_lab
    results_entered_at
    results_entered
    sample_issue
    results_released
    participant_viewed_at
    test_name
    result
  }
`

export default TEST_KIT_TABLE_CONFIG_FRAGMENT
