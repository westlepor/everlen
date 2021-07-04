import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ALL_ENTERPRISE_CLIENTS from "../../queries/userManagement/findAllEnterpriseClients"

const useAllEnterpriseClients = () => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ALL_ENTERPRISE_CLIENTS, {
    ...queryOptions(user),
  })
}

export default useAllEnterpriseClients
