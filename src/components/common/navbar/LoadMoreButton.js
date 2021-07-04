import React from "react"

import { Button } from "react-activity-feed"

const LoadMoreButton = props => (
  <div className="raf-load-more-button">
    <Button
      onClick={props.onClick}
      buttonStyle="info"
      disabled={props.refreshing}
      loading={props.refreshing}
    >
      Show more
    </Button>
  </div>
)

export default LoadMoreButton
