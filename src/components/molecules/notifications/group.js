import React from "react"
import { navigate } from "gatsby"
import Cell from "components/molecules/notifications/cell"

const NotificationGroup = ({ activityGroup, onMarkAsRead }) => {
  const handleClickNotification = kitId => {
    onMarkAsRead(activityGroup)
    navigate(`/app/kit_status/${kitId}`)
  }

  const items = activityGroup.activities.map((elem, key) => (
    <Cell
      isRead={activityGroup.is_read}
      cell={elem}
      key={key}
      handleClick={() => handleClickNotification(elem.kit_result_id)}
    />
  ))

  return <div>{items}</div>
}

export default NotificationGroup
