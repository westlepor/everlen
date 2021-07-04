import { gql } from "@apollo/client"

const FIND_ONE_GROUP_BY_CONFIGRUATION = gql`
  query FindUserGroupByConfiguration(
    $enterprisePartnerID: Int
    $enterpriseClientIDs: [Int]
    $role: String!
  ) {
    findUserGroupByConfiguration(
      enterprise_partner_id: $enterprisePartnerID
      enterprise_client_ids: $enterpriseClientIDs
      role: $role
    ) {
      id: _id
      okta_id
    }
  }
`

export default FIND_ONE_GROUP_BY_CONFIGRUATION
