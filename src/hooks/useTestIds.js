import { useQuery } from "react-apollo"

import GET_TEST_IDS from "../queries/kitStatus/getTestIds"

const useTestIds = (options = {}) => {
  return useQuery(GET_TEST_IDS(options?.variables), options)
}

export default useTestIds
