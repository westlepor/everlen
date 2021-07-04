import { gql } from "@apollo/client"

const GET_KIT_RESULT_IDS_BY_RESULTS_ENTERED_AT = gql`
  query KitResultIdsByResultsEnteredAt(
    $resultsEnteredFrom: ISO8601DateTime
    $resultsEnteredTo: ISO8601DateTime
    $testId: Int
    $enterprisePartnerId: Int
    $enterpriseClientIds: [Int]
  ) {
    rapidTestsAggregate(
      where: {
        resultsEnteredFrom: $resultsEnteredFrom
        resultsEnteredTo: $resultsEnteredTo
        testId: $testId
        enterprisePartnerId: $enterprisePartnerId
        enterpriseClientIds: $enterpriseClientIds
      }
    ) {
      nodes {
        kitResultId
      }
    }
  }
`

export default GET_KIT_RESULT_IDS_BY_RESULTS_ENTERED_AT
