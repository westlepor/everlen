import React from "react"
import PropTypes from "prop-types"
import { KitResultDesc, KitResultColor } from "utils/constants"
import { colors } from "@everlywell/leaves"
import Mark from "components/atoms/common/mark"

const KitStatusMark = ({ status, className }) => {
  if (status === KitResultDesc.Normal) {
    return (
      <Mark
        label={status}
        bgColor={KitResultColor.Normal}
        borderColor={KitResultColor.NormalBorder}
        color={colors.gray5}
        className={className}
      />
    )
  } else if (status === KitResultDesc.NeedsReview) {
    return (
      <Mark
        label={status}
        bgColor={KitResultColor.NeedsReview}
        borderColor={KitResultColor.NeedsReviewBorder}
        color={colors.gray5}
        className={className}
      />
    )
  }
  return <></>
}

KitStatusMark.propTypes = {
  label: PropTypes.string,
  bgColor: PropTypes.string,
}

KitStatusMark.defaultProps = {}

export default KitStatusMark
