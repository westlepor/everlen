import gql from "graphql-tag"

const UPDATE_GROUP = gql`
  mutation updateOktaGroup(
    $id: String!
    $name: String!
    $role: String!
    $enterprise_partner_id: Int
    $enterprise_client_ids: [Int]
  ) {
    updateOktaGroup(
      id: $id
      name: $name
      role: $role
      enterprise_partner_id: $enterprise_partner_id
      enterprise_client_ids: $enterprise_client_ids
    ) {
      id
      status
      error
    }
  }
`

export default UPDATE_GROUP
