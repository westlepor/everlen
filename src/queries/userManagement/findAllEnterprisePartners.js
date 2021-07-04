import { gql } from "@apollo/client"

const FIND_ALL_ENTERPRISE_PARTNERS = gql`
  query EnterprisePartners {
    enterprise_partners {
      id
      name: display_name
    }
  }
`

export default FIND_ALL_ENTERPRISE_PARTNERS
