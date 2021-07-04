import { useLazyQuery } from "react-apollo"

import GET_OPT_IN_LIST from "../queries/admin/getOptInList"

const useOptInList = (options = {}) => {
  return useLazyQuery(GET_OPT_IN_LIST, options)
}

export default useOptInList
