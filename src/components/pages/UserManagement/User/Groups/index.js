import React from "react"

import { UserGroupsTable } from "../../shared"

const Groups = ({ user }) => {
  const groups = !!user?.group ? [user?.group] : []

  return <UserGroupsTable rows={groups} user={user} />
}

export default Groups
