import { gql } from "@apollo/client"

const FIND_ONE_USER = gql`
  query FindUserByID($id: ID!) {
    findUserByID(id: $id) {
      id: _id
      oktaId: external_id
      email
      full_name
      firstName: first_name
      lastName: last_name
      status: okta_status
      canManageAccessCodes: can_manage_access_codes
      canRegisterKits: can_register_kits
      canViewRapidTests: can_view_rapid_tests
      group {
        id: _id
        name
        partner_id: enterprise_partner_id
        client_ids: enterprise_client_ids
        role
      }
    }
  }
`

export default FIND_ONE_USER
