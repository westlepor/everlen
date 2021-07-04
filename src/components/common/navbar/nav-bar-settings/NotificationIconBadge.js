import React, { useContext } from "react"

import { FeedContext, IconBadge } from "react-activity-feed"

import BellIcon from "components/atoms/icons/bell"

const NotificationIconBadge = () => {
  const { realtimeAdds, unseen } = useContext(FeedContext)

  const addedGroups = realtimeAdds?.map(item => item.group) || []

  const uniqueLiveAdditions = [...new Set(addedGroups)].length
  const extraLiveAdditions = addedGroups.length - uniqueLiveAdditions

  const customUnseen =
    uniqueLiveAdditions > 0 ? unseen - extraLiveAdditions : unseen

  return (
    <IconBadge showNumber={true} unseen={customUnseen} hidden={false}>
      <BellIcon />
    </IconBadge>
  )
}

export default NotificationIconBadge
