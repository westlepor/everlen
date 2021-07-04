import { gql } from "@apollo/client"

const GET_USER_PROFILE = gql`
  query UserProfile($id: ID!) {
    findUserByID(id: $id) {
      full_name
      mobile_phone_number
    }
  }
`
export default GET_USER_PROFILE
