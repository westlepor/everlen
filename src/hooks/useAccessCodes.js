import { useQuery } from "react-apollo"

import GET_ACCESS_CODES from "../queries/admin/getAccessCodes"

const useAccessCodes = (options = {}) => {
  return useQuery(GET_ACCESS_CODES(options?.variables), options)
}

export default useAccessCodes
