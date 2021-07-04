import { gql } from "@apollo/client"

const GET_USER_PERMISSIONS = gql`
  query GetUserPermissions($email: String!) {
    adminPermissions(email: $email) {
      access_code_manager
      can_register_kits
      enterprise_client_ids
      enterprise_partner_id
      role
      getstream_token
      fauna_id
      okta_user_id
      error
    }
  }
`

export default GET_USER_PERMISSIONS
