import React from "react"

import ResolveConsumer from "components/atoms/consumer/resolveConsumer"

import { formatKitID, truncate } from "utils/helper"
import { diffTime } from "utils/datetime"

import * as S from "./styles"

const HyphenWrapper = ({ text }) => {
  const code = "\u2011"
  return <>{text.replace(/-/g, code)}</>
}

const NeedsReviewResultNotificationCell = ({ cell, time }) => (
  <>
    <S.StyledIconNeedsReviewResult width={24} height={24} />
    <S.Desc>
      <S.P style={{ marginBottom: "6px" }}>
        <ResolveConsumer>{cell.actor}</ResolveConsumer>'s &nbsp;lab results need
        review
      </S.P>
      <S.P>
        <S.Name>
          {truncate(cell.test_name)} <S.Dot />
          <HyphenWrapper text={formatKitID(cell.kit_id)} />
        </S.Name>
        <S.Time>{time}</S.Time>
      </S.P>
    </S.Desc>
  </>
)

const SampleIssueNotificationCell = ({ cell, time }) => (
  <>
    <S.StyledIconSampleIssue width={24} height={24} />
    <S.Desc>
      <S.P style={{ marginBottom: "6px" }}>
        <ResolveConsumer>{cell.actor}</ResolveConsumer>'s lab results ran into
        an issue caused by {cell.issue_name}
      </S.P>
      <S.P>
        <S.Name>
          {truncate(cell.test_name)} <S.Dot />
          <HyphenWrapper text={formatKitID(cell.kit_id)} />
        </S.Name>
        <S.Time>{time}</S.Time>
      </S.P>
    </S.Desc>
  </>
)

const NotificationCell = ({ cell, isRead, handleClick }) => {
  const time = diffTime(cell.time)

  return (
    <S.Container onClick={handleClick}>
      <S.UnreadMark isRead={isRead} />

      {cell.verb === "received_abnormal_results" ? (
        <NeedsReviewResultNotificationCell cell={cell} time={time} />
      ) : (
        <SampleIssueNotificationCell cell={cell} time={time} />
      )}
    </S.Container>
  )
}

export default NotificationCell
