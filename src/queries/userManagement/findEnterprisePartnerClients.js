import { gql } from "@apollo/client"

const FIND_ENTERPRISE_PARTNER_CLIENTS = gql`
  query EnterprisePartnerClients($enterprisePartnerID: bigint) {
    enterprise_clients(
      where: { enterprise_partner_id: { _eq: $enterprisePartnerID } }
    ) {
      id
      name
    }
  }
`

export default FIND_ENTERPRISE_PARTNER_CLIENTS
