import { useLazyQuery } from "react-apollo"

import GET_TEST_COUNT from "../queries/kitStatus/getTestCount"

const useTestCount = (options = {}) => {
  return useLazyQuery(GET_TEST_COUNT(options?.variables), options)
}

export default useTestCount
