import gql from "graphql-tag"

const CREATE_GROUP = gql`
  mutation createOktaGroup(
    $name: String!
    $role: String!
    $enterprise_partner_id: Int
    $enterprise_client_ids: [Int]
  ) {
    createOktaGroup(
      name: $name
      role: $role
      enterprise_partner_id: $enterprise_partner_id
      enterprise_client_ids: $enterprise_client_ids
    ) {
      id
      oktaId
      status
      error
    }
  }
`

export default CREATE_GROUP
