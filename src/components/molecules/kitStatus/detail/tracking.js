import React from "react"

import { useTestKitDetails } from "hooks"

import TrackingDetailsIcon from "components/atoms/icons/stopWatch"
import IssueMark from "components/atoms/kitStatus/issueMark"

import CollectSampleButton from "components/atoms/CollectSampleButton"
import TimePicker from "components/atoms/common/TimePicker/WithAmPm"

import * as S from "./style"

const DetailTracking = ({
  detail,
  isSettingCollectedAt,
  updateIsSettingCollectedAt,
  collectedAt: enteredCollectedAt,
  setCollectedAt,
  isHCPAdmin,
  hasHCPEnteredCLIAWaiverNumber,
  canViewRapidTests,
}) => {
  const {
    isCanceled,
    isOrdered,
    orderedAt,
    isCollected,
    collectedAt,
    isResultEntered,
    resultsEnteredAt,
    isRegistered,
    registeredAt,
    isReceivedByLab,
    receivedByLabAt,
    hasAnySampleIssues,
    sampleIssues,
    isResultApproved,
    resultsApprovedAt,
    isParticipantViewedAt,
    participantViewedAt,
  } = useTestKitDetails(detail?.data)

  const isOnHCPReadOnlyMode =
    (!isHCPAdmin && canViewRapidTests) ||
    (isHCPAdmin && (isCanceled || isResultApproved))
  const isDisableHCPCollect = isHCPAdmin && !hasHCPEnteredCLIAWaiverNumber

  return (
    <S.Container>
      <S.StyledTitleRow>
        <TrackingDetailsIcon />
        <S.Title>Tracking Details</S.Title>
      </S.StyledTitleRow>

      <S.RowWrapper>
        {isOrdered && !isHCPAdmin && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Ordered</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{orderedAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isRegistered && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Registered</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{registeredAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isReceivedByLab && !isHCPAdmin && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Received by Lab</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{receivedByLabAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {hasAnySampleIssues && !isHCPAdmin && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Sample Issue</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>
                <IssueMark value={sampleIssues} size={10} />
              </S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isOnHCPReadOnlyMode && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Sample Collected</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{collectedAt || "-"}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isHCPAdmin && !isCanceled && !isResultApproved && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Sample Collected</S.Label>

              {!isCollected &&
                isSettingCollectedAt &&
                !isCanceled &&
                !isResultApproved &&
                !isDisableHCPCollect && (
                  <TimePicker
                    time={enteredCollectedAt}
                    setTime={setCollectedAt}
                  />
                )}
            </S.LabelColumn>

            <S.ValueColumn>
              {isCollected || isCanceled || isResultApproved ? (
                <S.Text>{collectedAt || "-"}</S.Text>
              ) : (
                !isSettingCollectedAt && (
                  <CollectSampleButton
                    isDisabled={isDisableHCPCollect}
                    onClick={_event => {
                      updateIsSettingCollectedAt(true)
                    }}
                  >
                    Collect Sample
                  </CollectSampleButton>
                )
              )}
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {(isHCPAdmin || canViewRapidTests) && isResultEntered && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Results Entered</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{resultsEnteredAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isResultApproved && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Results Released</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{resultsApprovedAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isParticipantViewedAt && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Participant Viewed At</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{participantViewedAt}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}
      </S.RowWrapper>
    </S.Container>
  )
}

export default DetailTracking
