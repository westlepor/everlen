import { gql } from "@apollo/client"

const GET_COUNT_BY_RESULTS_ENTERED = gql`
  query ResultsEnteredAtCount(
    $testId: Int
    $enterprisePartnerId: Int
    $enterpriseClientIds: [Int]
  ) {
    negative: rapidTestsAggregate(
      where: {
        result: "negative"
        testId: $testId
        enterprisePartnerId: $enterprisePartnerId
        enterpriseClientIds: $enterpriseClientIds
      }
    ) {
      nodes {
        kitResultId
      }
      totalCount
    }

    positive: rapidTestsAggregate(
      where: {
        result: "positive"
        testId: $testId
        enterprisePartnerId: $enterprisePartnerId
        enterpriseClientIds: $enterpriseClientIds
      }
    ) {
      nodes {
        kitResultId
      }
      totalCount
    }

    invalid: rapidTestsAggregate(
      where: {
        result: "invalid"
        testId: $testId
        enterprisePartnerId: $enterprisePartnerId
        enterpriseClientIds: $enterpriseClientIds
      }
    ) {
      nodes {
        kitResultId
      }
      totalCount
    }
  }
`

export default GET_COUNT_BY_RESULTS_ENTERED
