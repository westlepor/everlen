import { gql } from "@apollo/client"

const GET_LAST_USED_LAB_FACILITY = gql`
  query LastUsedLabFacility($currentUserId: String!) {
    labFacilities(where: { oktaUserId: $currentUserId }, last: 1) {
      nodes {
        id
        clia
        address1
        address2
        city
        state
        zip5
        active
      }
    }
  }
`

export default GET_LAST_USED_LAB_FACILITY
