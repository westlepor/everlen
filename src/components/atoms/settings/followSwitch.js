import React, { useState, useEffect, useContext } from "react"
import { connect } from "getstream"

import Toggle from "components/atoms/common/toggle"

import { SessionContext } from "contexts/session"
import { getHasuraClientIDs } from "utils/helper"

import { useHasuraClaims } from "hooks"

const makeTargetPartnerSuffix = hasuraClaim => {
  const hasuraClaims = JSON.parse(hasuraClaim)
  return `enterprise_partner_${hasuraClaims["x-hasura-partner-id"]}`
}

const makeTargetClientSuffix = clientId => {
  return `enterprise_client_${clientId}`
}

const makeTargetFeed = (targetType, suffix) => {
  return `${targetType}:${suffix}`
}

const FollowSwitch = ({ targetType }) => {
  const { user } = useContext(SessionContext)

  const { isHCPAdmin } = useHasuraClaims(user)
  const isDisabled = isHCPAdmin && targetType === "sample_issues"

  const [following, setFollowing] = useState(false)
  const role = user.idToken.claims["x-hasura-role"]
  const partnerRole = "enterprise_partner_clinical_admin"

  // feeds
  const feedPrefix = "notification"
  const clientIds = getHasuraClientIDs(JSON.parse(user.idToken.claims.hasura))
  const targetPartnerSuffix = makeTargetPartnerSuffix(
    user.idToken.claims.hasura
  )
  const targetPartnerFeed = makeTargetFeed(targetType, targetPartnerSuffix)

  // get client/feed
  const streamToken = user.idToken.claims.streamToken
  const client = connect(
    process.env.GATSBY_STREAM_ACCESS_KEY,
    streamToken,
    process.env.GATSBY_STREAM_APP_ID
  )
  const userFeed = client.feed(feedPrefix, user.idToken.sub)

  // set the initial value
  useEffect(() => {
    async function isFollowing() {
      try {
        let feed = makeTargetFeed(
          targetType,
          makeTargetClientSuffix(clientIds[0])
        )
        if (role === partnerRole) {
          feed = targetPartnerFeed
        }
        const response = await userFeed.following({
          offset: 0,
          limit: 1,
          filter: [feed],
        })
        setFollowing(response.results.length > 0)
      } catch (err) {
        console.log(err)
      }
    }
    if (clientIds && clientIds.length > 0) {
      isFollowing()
    }
  }, [targetType, clientIds, userFeed, role, targetPartnerFeed])

  // handle change
  const toggleFollow = () => {
    if (role === partnerRole) {
      if (following) {
        userFeed
          .unfollow(targetType, targetPartnerSuffix)
          .then(() => setFollowing(false))
          .catch(e => console.log(e))
      } else {
        userFeed
          .follow(targetType, targetPartnerSuffix)
          .then(() => setFollowing(true))
          .catch(e => console.log(e))
      }
    } else {
      if (!clientIds) {
        return
      }
      if (following) {
        clientIds.forEach(async clientId => {
          await userFeed.unfollow(targetType, makeTargetClientSuffix(clientId))
          setFollowing(false)
        })
      } else {
        clientIds.forEach(async clientId => {
          await userFeed.follow(targetType, makeTargetClientSuffix(clientId))
          setFollowing(true)
        })
      }
    }
  }

  return (
    <Toggle
      width={64}
      height={32}
      isChecked={following}
      onChange={toggleFollow}
      isDisabled={isDisabled}
    />
  )
}

export default FollowSwitch
