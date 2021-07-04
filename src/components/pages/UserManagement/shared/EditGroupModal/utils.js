import { client } from "apollo/client"

import FIND_ONE_GROUP from "queries/userManagement/findOneGroup"

const updateCache = ({ id, payload }) => {
  try {
    const data = client.readQuery({
      query: FIND_ONE_GROUP,
      variables: { id },
    })

    const existingGroup = data?.findUserGroupByID || {}
    const { name, role, enterprise_partner_id, enterprise_client_ids } =
      payload || {}

    client.writeQuery({
      query: FIND_ONE_GROUP,
      variables: { id },
      data: {
        findUserGroupByID: {
          ...existingGroup,
          name,
          role,
          partner_id: enterprise_partner_id,
          client_ids: enterprise_client_ids,
        },
      },
    })
  } catch (error) {
    console.log({ error })
  }
}

export { updateCache }
