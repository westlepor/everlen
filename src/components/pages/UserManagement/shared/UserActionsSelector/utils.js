import { client } from "apollo/client"

import FIND_ONE_USER from "queries/userManagement/findOneUser"

const updateCache = ({ id, payload }) => {
  try {
    const data = client.readQuery({
      query: FIND_ONE_USER,
      variables: { id },
    })

    const existingUser = data?.findUserByID || {}

    const { status } = payload || {}

    client.writeQuery({
      query: FIND_ONE_USER,
      variables: { id },
      data: {
        findUserByID: { ...existingUser, status },
      },
    })
  } catch (error) {
    console.log({ error })
  }
}

export { updateCache }
