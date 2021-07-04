import { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import FIND_ONE_GROUP_BY_CONFIGRUATION from "../../queries/userManagement/findOneGroupByConfiguration"

const useOneGroupByConfiguration = ({
  enterprisePartnerID,
  enterpriseClientIDs,
  role,
}) => {
  const { user } = useContext(SessionContext)

  return useQuery(FIND_ONE_GROUP_BY_CONFIGRUATION, {
    ...queryOptions(user),
    variables: { enterprisePartnerID, enterpriseClientIDs, role },
    skip: !enterprisePartnerID || !role,
  })
}

export default useOneGroupByConfiguration
