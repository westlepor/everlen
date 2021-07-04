import gql from "graphql-tag"

const DELETE_GROUP = gql`
  mutation deleteOktaGroup($id: String!) {
    deleteOktaGroup(id: $id) {
      id
      error
      status
    }
  }
`

export default DELETE_GROUP
