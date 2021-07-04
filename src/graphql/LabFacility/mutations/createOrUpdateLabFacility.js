import gql from "graphql-tag"

const CREATE_OR_UPDATE_LAB_FACILITY = gql`
  mutation CreateOrUpdateLabFacilty(
    $clia: String!
    $okta_user_id: String!
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $zip5: String!
    $last_used_at: timestamp!
  ) {
    createOrUpdateLabFacility(
      clia: $clia
      okta_user_id: $okta_user_id
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zip5: $zip5
      last_used_at: $last_used_at
    ) {
      id
      errors
    }
  }
`

export default CREATE_OR_UPDATE_LAB_FACILITY
