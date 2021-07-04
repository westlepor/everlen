import { useQuery } from "react-apollo"

import GET_OPT_IN_PORTAL_URLS from "../queries/admin/getOptInPortalUrls"

const useOptInPortalUrls = (options = {}) => {
  return useQuery(GET_OPT_IN_PORTAL_URLS, options)
}

export default useOptInPortalUrls
