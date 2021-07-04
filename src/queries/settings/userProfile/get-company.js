import { gql } from "@apollo/client"

const GET_ENTERPRISE_PARTNER_NAME = gql`
  query enterprise_partners($id: Int) {
    enterprise_partners(where: { id: { _eq: $id } }) {
      display_name
    }
  }
`
export default GET_ENTERPRISE_PARTNER_NAME
