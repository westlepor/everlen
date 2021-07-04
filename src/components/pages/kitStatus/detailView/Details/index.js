import React, { useState, useContext } from "react"

import {
  dayjs,
  hcpFormatTimeToUTC,
  isValidCollectionTime,
} from "utils/datetime"

import { client } from "apollo/client"

import GET_TEST_KIT_DETAILS from "queries/kitStatus/getDetail"

import {
  useSuperAdmin,
  useHasuraClaims,
  useTestKitDetails,
  useCollectRapidTestMutation,
} from "hooks"

import { SessionContext } from "contexts/session"
import { TableContext } from "contexts/table"
import { CliaWaiverContext } from "contexts/cliaWaiver"

import Header from "components/molecules/kitStatus/detail/header"
import Summary from "components/molecules/kitStatus/detail/summary"
import TestInfo from "components/molecules/kitStatus/detail/testInfo"
import Tracking from "components/molecules/kitStatus/detail/tracking"

import * as S from "./styles"

const Details = ({
  kitResult,
  isPdfExist,
  standalone,
  isSettingResultsEntered,
  updateIsSettingResultsEntered,
  isSettingCollectedAt,
  updateIsSettingCollectedAt,
  loadingResultsEntered,
  resultsEntered,
  setResultsEntered,
  triggerSaveResultsEntered,
}) => {
  const { user, targetUser } = useContext(SessionContext)
  const {
    isHCPAdmin,
    canViewRapidTests,
    isEnterprisePartnerClinicalAdmin,
    currentUserId,
  } = useHasuraClaims(user)

  const { isTargetUserHCPAdmin, isMasqueradeMode } = useSuperAdmin(
    user,
    targetUser
  )

  const {
    setTable,
    pendingResultsEntered,
    retryingResultsEntered,
  } = useContext(TableContext)

  const {
    isCanceled,
    isResultApproved,
    isCollected,
    isResultEntered,
    kitResultId,
    testId,
    pwnOrderNumber,
    barcodeSerialNumber,
    enterpriseClientId,
    enterprisePartnerId,
  } = useTestKitDetails(kitResult?.data)

  const { hasHCPEnteredCLIAWaiverNumber } = useContext(CliaWaiverContext)

  const [collectedAt, setCollectedAt] = useState(new Date())

  const [collectRapidTest] = useCollectRapidTestMutation({})

  const [loadingCollectedAt, setLoadingCollectedAt] = useState(false)

  const updateCollectedAtCache = () => {
    try {
      // Updates collectedAt in Apollo Cache
      const variables = {
        id: kitResultId,
        isPartnerClinicalAdmin: isEnterprisePartnerClinicalAdmin,
        shouldFetchRapidTests: isHCPAdmin || canViewRapidTests,
      }

      const data = client.readQuery({
        query: GET_TEST_KIT_DETAILS,
        variables,
      })

      const [cachedKitResult] = data?.kit_results || []

      const updatedKitResult = {
        ...cachedKitResult,
        rapid_test: {
          kitResultId,
          collectedAt: hcpFormatTimeToUTC({ time: collectedAt }),
          displayStatus: "collected",
          result: null,
          resultsEnteredAt: null,
          __typename: "RapidTest",
        },
      }

      client.writeQuery({
        query: GET_TEST_KIT_DETAILS,
        variables,
        data: {
          kit_results: [updatedKitResult],
        },
      })
    } catch (error) {
      console.log({ error })
    } finally {
      updateIsSettingCollectedAt(false)
    }
  }

  const handleSave = () => {
    if (isSettingCollectedAt) {
      setLoadingCollectedAt(true)

      collectRapidTest({
        variables: {
          kit_result_id: kitResultId,
          collected_at: dayjs(collectedAt).utc(),
          collected_by: currentUserId,
          test_id: testId,
          pwn_order_number: pwnOrderNumber,
          barcode_serial_number: barcodeSerialNumber,
          enterprise_client_id: enterpriseClientId,
          enterprise_partner_id: enterprisePartnerId,
        },
      })
        .then(({ data }) => {
          const { errors } = data?.collectRapidTest || {}

          if (!!errors?.value) {
            throw new Error(errors?.value)
          }

          updateCollectedAtCache()
        })
        .catch(error => console.log({ error }))
        .finally(() => setLoadingCollectedAt(false))
    }

    if (isSettingResultsEntered && resultsEntered) {
      triggerSaveResultsEntered()
    }
  }

  return (
    <>
      {
        <Header
          detail={kitResult}
          kitResultId={kitResultId}
          isPdfExist={isPdfExist}
          standalone={standalone}
          updateIsSettingResultsEntered={updateIsSettingResultsEntered}
          updateIsSettingCollectedAt={updateIsSettingCollectedAt}
          setResultsEntered={setResultsEntered}
        />
      }

      <Summary detail={kitResult} />

      <TestInfo
        isHCPAdmin={isHCPAdmin || isTargetUserHCPAdmin}
        hasHCPEnteredCLIAWaiverNumber={hasHCPEnteredCLIAWaiverNumber}
        canViewRapidTests={canViewRapidTests}
        detail={kitResult}
        isSettingResultsEntered={isSettingResultsEntered}
        updateIsSettingResultsEntered={updateIsSettingResultsEntered}
        setResultsEntered={setResultsEntered}
        kitResultId={kitResultId}
      />

      <Tracking
        isHCPAdmin={isHCPAdmin || isTargetUserHCPAdmin}
        hasHCPEnteredCLIAWaiverNumber={hasHCPEnteredCLIAWaiverNumber}
        canViewRapidTests={canViewRapidTests}
        detail={kitResult}
        isSettingCollectedAt={isSettingCollectedAt}
        updateIsSettingCollectedAt={updateIsSettingCollectedAt}
        collectedAt={collectedAt}
        setCollectedAt={setCollectedAt}
      />

      {(isHCPAdmin || isTargetUserHCPAdmin) &&
        !isCanceled &&
        !isResultApproved &&
        (!isCollected ||
          !isResultEntered ||
          (retryingResultsEntered.get(kitResultId) &&
            pendingResultsEntered.has(kitResultId))) && (
          <S.ButtonWrapper>
            <S.DismissButton
              appearance="secondary"
              onClick={() => {
                updateIsSettingResultsEntered(false)
                setResultsEntered(undefined)
                updateIsSettingCollectedAt(false)
                retryingResultsEntered.delete(kitResultId)
                setTable({
                  openDetailView: false,
                  retryingResultsEntered,
                })
              }}
            >
              Dismiss
            </S.DismissButton>

            {(loadingCollectedAt || loadingResultsEntered) && (
              <S.SaveButton loading="true" color="white" />
            )}

            {!loadingCollectedAt && !loadingResultsEntered && (
              <S.SaveButton
                disabled={
                  isMasqueradeMode ||
                  (!isSettingCollectedAt &&
                    !(isSettingResultsEntered && resultsEntered)) ||
                  isValidCollectionTime(collectedAt) !== "true" ||
                  (pendingResultsEntered.has(kitResultId) &&
                    resultsEntered &&
                    pendingResultsEntered.get(kitResultId) === resultsEntered)
                }
                data-cy="detail-save"
                onClick={handleSave}
                label="Save"
              />
            )}
          </S.ButtonWrapper>
        )}
    </>
  )
}

export default Details
