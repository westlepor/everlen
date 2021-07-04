import { useQuery } from "react-apollo"

import GET_ENTERPRISE_PARTNER_NAME from "../queries/settings/userProfile/get-company"

const usePartner = (options = {}) => {
  return useQuery(GET_ENTERPRISE_PARTNER_NAME, options)
}

export default usePartner
