import React from "react"

import { useUserProfileDetails } from "hooks"

const UserName = ({ fallbackName }) => {
  const { data } = useUserProfileDetails()

  const name = data?.findUserByID?.full_name || fallbackName

  return <>{name}</>
}

export default UserName
