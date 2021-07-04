import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ALL_ENTERPRISE_PARTNERS from "../../queries/userManagement/findAllEnterprisePartners"

const useAllEnterprisePartners = () => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ALL_ENTERPRISE_PARTNERS, {
    ...queryOptions(user),
  })
}

export default useAllEnterprisePartners
