import { gql } from "@apollo/client"

const GET_COUNT_BY_RAPID_TEST_STATUS = gql`
  query RapidTestStatusCount(
    $testId: Int
    $enterprisePartnerId: Int
    $enterpriseClientIds: [Int]
  ) {
    collected: rapidTestsAggregate(
      where: {
        displayStatus: "collected"
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

    results_entered: rapidTestsAggregate(
      where: {
        displayStatus: "results_entered"
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

    results_approved: rapidTestsAggregate(
      where: {
        displayStatus: "results_approved"
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

    cancelled: rapidTestsAggregate(
      where: {
        displayStatus: "cancelled"
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

export default GET_COUNT_BY_RAPID_TEST_STATUS
