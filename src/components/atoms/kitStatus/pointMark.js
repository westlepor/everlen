import React from "react"
import { KitStatusDesc, KitResultDesc, KitResultColor } from "utils/constants"
import { colors } from "@everlywell/leaves"
import PointMark from "components/atoms/common/pointMark"
import Mark from "components/atoms/common/mark"

const MainMark = ({ status, className }) => {
  const desc = KitStatusDesc[status]

  if (desc) {
    return (
      <PointMark
        label={desc.label}
        color={desc.color}
        pointColor={desc.pointColor ? desc.pointColor : desc.color}
        className={className}
      />
    )
  } else {
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
    } else if (status === "positive") {
      return (
        <Mark
          label="Positive"
          bgColor={KitResultColor.NeedsReview}
          borderColor={KitResultColor.NeedsReviewBorder}
          color={colors.gray5}
          className={className}
        />
      )
    } else if (status === "negative") {
      return (
        <Mark
          label="Negative"
          bgColor={KitResultColor.Normal}
          borderColor={KitResultColor.NormalBorder}
          color={colors.gray5}
          className={className}
        />
      )
    } else if (status === "invalid") {
      return (
        <Mark
          label="Invalid"
          bgColor={KitResultColor.Invalid}
          borderColor={KitResultColor.InvalidBorder}
          color={colors.gray5}
          className={className}
        />
      )
    }
  }

  return <></>
}

export default MainMark
