import gql from "graphql-tag"

const SUSPEND_GROUP = gql`
  mutation suspendOktaUser($oktaId: String!) {
    suspendOktaUser(okta_id: $oktaId) {
      id: fauna_id
      okta_id
      status: user_status
      error
    }
  }
`

export default SUSPEND_GROUP
