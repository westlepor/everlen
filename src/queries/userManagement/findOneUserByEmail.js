import { gql } from "@apollo/client"

const FIND_ONE_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id: _id
      email
    }
  }
`

export default FIND_ONE_USER_BY_EMAIL
