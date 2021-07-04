import { gql } from "@apollo/client"

const FIND_ONE_GROUP = gql`
  query FindUserGroupByID($id: ID!) {
    findUserGroupByID(id: $id) {
      id: _id
      okta_id
      name
      role
      partner_id: enterprise_partner_id
      client_ids: enterprise_client_ids
      users {
        data {
          id: _id
          email
          full_name
          status: okta_status
        }
      }
    }
  }
`

export default FIND_ONE_GROUP
