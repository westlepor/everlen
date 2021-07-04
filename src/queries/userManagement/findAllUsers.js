import { gql } from "@apollo/client"

const FIND_ALL_USERS = gql`
  query Users($size: Int) {
    allUsers(_size: $size) {
      data {
        id: _id
        full_name
        email
        group {
          name
        }
        status: okta_status
      }
    }
  }
`

export default FIND_ALL_USERS
