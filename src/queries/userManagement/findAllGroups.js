import { gql } from "@apollo/client"

const FIND_ALL_GROUPS = gql`
  query Groups($size: Int) {
    allUserGroups(_size: $size) {
      data {
        id
        okta_id
        name
        partner_id: enterprise_partner_id
        client_ids: enterprise_client_ids
        user_count
      }
    }
  }
`

export default FIND_ALL_GROUPS
