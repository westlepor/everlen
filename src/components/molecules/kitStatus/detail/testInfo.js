import React, { useContext, useEffect, useState, useRef } from "react"

import { useTestKitDetails } from "hooks"

import AddResultsButton from "components/atoms/AddResultsButton"
import ResultSelector from "components/atoms/detail/ResultSelector"

import { TableContext } from "contexts/table"

import * as S from "./style"

const DetailTestInfo = ({
  isHCPAdmin,
  hasHCPEnteredCLIAWaiverNumber,
  canViewRapidTests,
  detail,
  isSettingResultsEntered,
  updateIsSettingResultsEntered,
  setResultsEntered,
  kitResultId,
}) => {
  const {
    isCanceled,
    isResultApproved,
    testName,
    client,
    pwnOrderNumber,
    isCollected,
    isResultEntered,
    resultsEntered,
  } = useTestKitDetails(detail?.data)

  const {
    pendingResultsEntered,
    retryingResultsEntered,
    setTable,
  } = useContext(TableContext)

  const [pendingResultsEnteredTimer, setPendingResultsEnteredTimer] = useState(
    0
  )
  const [
    pendingResultsEnteredCountDown,
    setPendingResultsEnteredCountDown,
  ] = useState(0)
  const timerRef = useRef(null)
  timerRef.current = pendingResultsEnteredCountDown

  const isOnHCPReadOnlyMode =
    (!isHCPAdmin && canViewRapidTests) ||
    (isHCPAdmin && (isCanceled || isResultApproved))
  const isDisableHCPCollect = isHCPAdmin && !hasHCPEnteredCLIAWaiverNumber

  useEffect(() => {
    if (retryingResultsEntered.has(kitResultId)) {
      if (!pendingResultsEnteredTimer) {
        setPendingResultsEnteredCountDown(1)
        const timerId = setInterval(() => {
          setPendingResultsEnteredCountDown(timerRef.current + 1)
        }, 1000)
        setPendingResultsEnteredTimer(timerId)
      } else if (pendingResultsEnteredCountDown > 60) {
        // clear timer
        clearInterval(pendingResultsEnteredTimer)
        setPendingResultsEnteredTimer(0)

        // delete retrying
        retryingResultsEntered.delete(kitResultId)
        setTable({ retryingResultsEntered })

        // init isSetting...
        updateIsSettingResultsEntered(false)
      }
    } else {
      clearInterval(pendingResultsEnteredTimer)
      setPendingResultsEnteredTimer(0)
    }
  }, [
    retryingResultsEntered,
    kitResultId,
    pendingResultsEnteredTimer,
    pendingResultsEnteredCountDown,
    updateIsSettingResultsEntered,
    setTable,
  ])

  return (
    <S.Container>
      <S.StyledTitleRow>
        <S.StyledTestIcon />
        <S.Title>Test Information</S.Title>
      </S.StyledTitleRow>

      <S.RowWrapper>
        {!!client && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Client</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{client}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {!!testName && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Test Name</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{testName}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        <S.StyledRow>
          <S.LabelColumn>
            <S.Label>PWN no.</S.Label>
          </S.LabelColumn>

          <S.ValueColumn>
            <S.Text>{pwnOrderNumber}</S.Text>
          </S.ValueColumn>
        </S.StyledRow>

        {isOnHCPReadOnlyMode && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Results Entered</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.CapitalizedText>{resultsEntered || "-"}</S.CapitalizedText>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        {isHCPAdmin && !isCanceled && !isResultApproved && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>Results Entered</S.Label>

              {((!isResultEntered && isSettingResultsEntered) ||
                (retryingResultsEntered.has(kitResultId) &&
                  pendingResultsEnteredCountDown < 61)) && (
                <>
                  <ResultSelector
                    defaultValue={
                      retryingResultsEntered.has(kitResultId)
                        ? pendingResultsEntered.get(kitResultId)
                        : undefined
                    }
                    onChange={result => setResultsEntered(result)}
                  />
                  {retryingResultsEntered.has(kitResultId) &&
                    pendingResultsEnteredCountDown < 61 &&
                    pendingResultsEnteredCountDown > 0 && (
                      <S.PendingResultsEnteredCountDown>{`${
                        61 - pendingResultsEnteredCountDown
                      } seconds left to change result`}</S.PendingResultsEnteredCountDown>
                    )}
                </>
              )}
            </S.LabelColumn>
            {(!retryingResultsEntered.has(kitResultId) ||
              pendingResultsEnteredCountDown > 60) && (
              <S.ValueColumn>
                {isResultEntered ? (
                  <S.CapitalizedText>{resultsEntered}</S.CapitalizedText>
                ) : !isSettingResultsEntered &&
                  pendingResultsEntered.has(kitResultId) ? (
                  <S.CapitalizedText>
                    {pendingResultsEntered.get(kitResultId)}
                  </S.CapitalizedText>
                ) : (
                  !isSettingResultsEntered && (
                    <AddResultsButton
                      isDisabled={!isCollected || isDisableHCPCollect}
                      onClick={() => updateIsSettingResultsEntered(true)}
                    >
                      Add Results
                    </AddResultsButton>
                  )
                )}
              </S.ValueColumn>
            )}
          </S.StyledRow>
        )}
      </S.RowWrapper>
    </S.Container>
  )
}

export default DetailTestInfo
