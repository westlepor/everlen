import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

import IconNeedsReviewResult from "components/atoms/icons/needsReviewNotification"
import IconSampleIssue from "components/atoms/icons/sampleIssueNotification"

const Container = styled.div`
  display: flex;
  align-items: center;
`

const UnreadMark = styled.span`
  display: inline-block;
  min-width: 10px;
  min-height: 10px;
  border-radius: 10px;
  background: ${props => (props.isRead ? "white" : colors.red3)};
  margin: 0 12px;
`

const StyledIconNeedsReviewResult = styled(IconNeedsReviewResult)`
  margin-right: 12px;
  stroke: #a2a2a2;
  width: 24px;
  height: 24px;
`

const StyledIconSampleIssue = styled(IconSampleIssue)`
  margin-right: 12px;
`

const Desc = styled.div`
  font-family: ${typography.type.nexa};
  font-size: 14px;
  width: 412px;
  padding: 19px 0 13px 0;
  border-bottom: 1px solid ${colors.gray2};
  flex-grow: 1;
  color: ${colors.gray4};
`

const P = styled.div`
  display: flex;
  align-items: center;
  line-height: 22px;
  margin-right: 24px;
  position: relative;
`

const Name = styled.span`
  width: 80%;
`
const Dot = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: ${colors.gray4};
  margin: 3px 6px;
`
const Time = styled.span`
  width: 15%;
  position: absolute;
  right: 0;
  text-align: right;
`

export {
  Container,
  UnreadMark,
  StyledIconNeedsReviewResult,
  StyledIconSampleIssue,
  P,
  Name,
  Dot,
  Time,
  Desc,
}
