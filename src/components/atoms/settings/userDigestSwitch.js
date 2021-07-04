import React, { useState, useEffect, useContext } from "react"
import { useQuery, useMutation } from "react-apollo"
import styled from "styled-components"

import Toggle from "components/atoms/common/toggle"
import Skeleton from "components/atoms/common/skeleton"

import { SessionContext } from "contexts/session"
import UPDATE_SQL from "queries/settings/userEmailDigest/update.gql"
import GET_SQL from "queries/settings/userEmailDigest/get.gql"
import { queryOptions, getHasuraClientIDs } from "utils/helper"

import { useHasuraClaims } from "hooks"

const StyledDiv = styled.div`
  display: inline-block;
  padding: 15px 10px 15px 0;
  box-sizing: border-box;
  width: 64px;
`

const UserDigestSwitch = () => {
  const { user } = useContext(SessionContext)
  const { isHCPAdmin } = useHasuraClaims(user)

  const { faunaId, email, hasura } = user.idToken.claims
  const hasuraClaims = JSON.parse(hasura)
  const partnerId = parseInt(hasuraClaims["x-hasura-partner-id"])
  const clientIds = getHasuraClientIDs(hasuraClaims)
  const [following, setFollowing] = useState(false)
  const { loading, data } = useQuery(GET_SQL, {
    ...queryOptions(user),
    variables: {
      id: faunaId,
    },
  })

  const [triggerUpdate, { data: dataUpdate }] = useMutation(UPDATE_SQL, {
    ...queryOptions(user, true /* isMutation */),
    variables: {
      digest: !following,
      email: email,
      partnerId: partnerId,
      clientIds: clientIds,
      id: faunaId,
    },
  })

  useEffect(() => {
    const updateValue = dataUpdate?.partialUpdateUser?.send_email_digest
    const getValue = data?.findUserByID?.send_email_digest
    if (updateValue !== null && updateValue !== undefined) {
      setFollowing(updateValue)
    } else if (getValue !== null && getValue !== undefined) {
      setFollowing(getValue)
    }
  }, [data, dataUpdate])

  if (loading) {
    return (
      <StyledDiv>
        <Skeleton />
      </StyledDiv>
    )
  }

  const handleChange = () => {
    triggerUpdate()
  }

  return (
    <Toggle
      width={64}
      height={32}
      isChecked={following}
      onChange={handleChange}
      isDisabled={isHCPAdmin}
    />
  )
}

export default UserDigestSwitch
