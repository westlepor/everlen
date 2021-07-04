import React, { useContext } from "react"
import { useQuery } from "react-apollo"

import { SessionContext } from "contexts/session"
import { queryOptions } from "utils/helper"

import GET from "queries/consumer/get.gql"

const ResolveConsumer = ({ children }) => {
  const session = useContext(SessionContext)
  const { user } = session
  const parts = children.split(":")
  let id = 0
  if (parts.length >= 2) {
    id = parseInt(parts[1])
  }
  const { data } = useQuery(GET, {
    ...queryOptions(user),
    variables: { id: id },
  })

  if (data && data.consumers.length > 0) {
    return (
      <>
        {data.consumers[0].first_name} {data.consumers[0].last_name}
      </>
    )
  }
  return (
    <>
      {parts[0]}:{id}
    </>
  )
}

export default ResolveConsumer
