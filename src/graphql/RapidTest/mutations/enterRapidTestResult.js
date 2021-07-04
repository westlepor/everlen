import gql from "graphql-tag"

const ENTER_RAPID_TEST_RESULT = gql`
  mutation enterRapidTestResult(
    $kit_result_id: Int!
    $results_entered_at: timestamp!
    $results_entered_by: String!
    $result: String!
    $clia: String
    $lab_facility_id: Int
  ) {
    enterRapidTestResult(
      kit_result_id: $kit_result_id
      results_entered_at: $results_entered_at
      results_entered_by: $results_entered_by
      result: $result
      clia: $clia
      lab_facility_id: $lab_facility_id
    ) {
      id
      errors
    }
  }
`

export default ENTER_RAPID_TEST_RESULT
