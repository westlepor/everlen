import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ENTERPRISE_PARTNER_CLIENTS from "../../queries/userManagement/findEnterprisePartnerClients"

const useEnterprisePartnerClients = ({ enterprisePartnerID }) => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ENTERPRISE_PARTNER_CLIENTS, {
    ...queryOptions(user),
    variables: { enterprisePartnerID },
    skip: !enterprisePartnerID,
  })
}

export default useEnterprisePartnerClients
