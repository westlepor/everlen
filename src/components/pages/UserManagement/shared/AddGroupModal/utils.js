import { client } from "apollo/client"

import FIND_ALL_GROUPS from "queries/userManagement/findAllGroups"

const SIZE = 1000

const updateCache = ({ id, oktaId, payload }) => {
  try {
    const data = client.readQuery({
      query: FIND_ALL_GROUPS,
      variables: { size: SIZE },
    })

    const allGroups = data?.allUserGroups?.data || []

    const newGroup = {
      id: id?.value,
      okta_id: oktaId?.value,
      name: payload.name,
      partner_id: payload.enterprise_partner_id,
      client_ids: payload.enterprise_client_ids,
      user_count: 0,
      __typename: "UserGroupWithCount",
    }

    client.writeQuery({
      query: FIND_ALL_GROUPS,
      variables: { size: SIZE },
      data: {
        allUserGroups: {
          data: [...allGroups, newGroup],
          __typename: "QueryAllUserGroupsPage",
        },
      },
    })
  } catch (error) {
    console.log({ error })
  }
}

export { updateCache }
