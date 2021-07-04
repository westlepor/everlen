import { gql } from "@apollo/client"

const GET_KIT_RESULT_IDS_BY_COLLECTED_AT = gql`
  query KitResultIdsByCollectedAt(
    $collectedFrom: ISO8601DateTime
    $collectedTo: ISO8601DateTime
    $testId: Int
    $enterprisePartnerId: Int
    $enterpriseClientIds: [Int]
  ) {
    rapidTestsAggregate(
      where: {
        collectedFrom: $collectedFrom
        collectedTo: $collectedTo
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

export default GET_KIT_RESULT_IDS_BY_COLLECTED_AT
