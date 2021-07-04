import { gql } from "@apollo/client"

const FIND_ALL_ENTERPRISE_CLIENTS = gql`
  query EnterpriseClients {
    enterprise_clients {
      id
      name
    }
  }
`

export default FIND_ALL_ENTERPRISE_CLIENTS
