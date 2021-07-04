import React, { useState, useContext, useEffect, useRef } from "react"

import { toast } from "react-toastify"

import { dayjs, hcpFormatTimeToUTC } from "utils/datetime"
import { TOAST_MSG, TOAST_DESC } from "utils/constants"
import { formatKitID } from "utils/helper"

import { client } from "apollo/client"

import GET_TEST_KIT_DETAILS from "queries/kitStatus/getDetail"

import {
  useHasuraClaims,
  useTestKitDetails,
  useEnterRapidTestResultMutation,
} from "hooks"

import { SessionContext } from "contexts/session"
import { TableContext } from "contexts/table"
import { CliaWaiverContext } from "contexts/cliaWaiver"

import Details from "../Details"
import Toast from "components/common/Toast"

import * as S from "./styles"

const ResultsEnteredWrapper = ({
  content,
  kitResult,
  isPdfExist,
  open,
  standalone,
  isSettingResultsEntered,
  updateIsSettingResultsEntered,
  isSettingCollectedAt,
  updateIsSettingCollectedAt,
}) => {
  const wrapperRef = useRef(null)
  const kitResultIdRef = useRef(null)
  const [
    pendingResultsEnteredTimers,
    setPendingResultsEnteredTimers,
  ] = useState(new Map())

  const tableContext = useContext(TableContext)
  const { isModalOpen } = useContext(CliaWaiverContext)
  const { user } = useContext(SessionContext)
  const {
    isHCPAdmin,
    canViewRapidTests,
    isEnterprisePartnerClinicalAdmin,
    currentUserId,
  } = useHasuraClaims(user)

  const {
    setTable,
    retriedSaveResultsEntered,
    retryingResultsEntered,
    pendingResultsEntered,
  } = useContext(TableContext)

  const { kitResultId } = useTestKitDetails(kitResult?.data)
  kitResultIdRef.current = kitResultId
  const { cliaWaiverNumber, cliaWaiverLabFacilityId } = useContext(
    CliaWaiverContext
  )

  const [resultsEntered, setResultsEntered] = useState()

  const [enterRapidTestResult] = useEnterRapidTestResultMutation({})

  const [loadingResultsEntered, setLoadingResultsEntered] = useState(false)

  const handleClickOutside = event => {
    let close = false
    if (isSettingResultsEntered || isSettingCollectedAt || isModalOpen) {
      close = false
    } else if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      if (
        event.target.className &&
        typeof event.target.className === "string" &&
        event.target.className.includes("popup-overlay")
      ) {
        close = false
      } else if (
        event.target?.parentElement?.parentElement?.className &&
        typeof event.target?.parentElement?.parentElement?.className ===
          "string" &&
        event.target?.parentElement?.parentElement?.className.includes(
          "Toastify"
        )
      ) {
        close = false
      } else {
        close = true
      }
    }

    if (close) {
      if (tableContext.openDetailView) {
        setResultsEntered(undefined)
        retryingResultsEntered.delete(kitResultId)
        tableContext.setTable({ openDetailView: false, retryingResultsEntered })
      }
    }
  }

  const updateResultsEnteredCache = (
    revert = false,
    curKitResultIdRef = null,
    finalResultsEntered = resultsEntered
  ) => {
    try {
      // Updates collected_at in Apollo Cache
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
          ...cachedKitResult.rapid_test,
          result: revert ? null : finalResultsEntered,
          resultsEnteredAt: revert ? null : hcpFormatTimeToUTC(),
          displayStatus: revert ? "collected" : "results_entered",
        },
      }

      client.writeQuery({
        query: GET_TEST_KIT_DETAILS,
        variables,
        data: { kit_results: [updatedKitResult] },
      })
    } catch (error) {
      console.log({ error })
    } finally {
      if (!retryingResultsEntered.get(curKitResultIdRef?.current)) {
        updateIsSettingResultsEntered(false)
      }
    }
  }

  const showResultsEnteredToast = () => {
    const result = resultsEntered[0].toUpperCase() + resultsEntered.slice(1)
    const kitId = formatKitID(
      kitResult.data.barcode.serial_number,
      kitResult.data.barcode.fulfillment_provider.name
    )
    const message = TOAST_MSG.RESULT_ADDED.replace("{result}", result).replace(
      "{kit_id}",
      kitId
    )

    toast(
      <Toast
        message={message}
        description={
          <>
            {TOAST_DESC.RESULT_ADDED} <S.ToastLink>Change Here</S.ToastLink>
          </>
        }
        onClick={retryResultsEntered}
      />,
      {
        position: toast.POSITION.TOP_CENTER,
        type: "success",
        autoClose: 15000,
        onClose: _ => {
          const isRetrying = pendingResultsEnteredTimers.has(kitResultId)
          if (!isRetrying) {
            saveResultsEntered(false, kitResultIdRef)
          }
        },
      }
    )
  }

  const retryResultsEntered = () => {
    // update pending value
    pendingResultsEntered.set(kitResultId, resultsEntered)
    retryingResultsEntered.set(kitResultId, true)

    if (pendingResultsEnteredTimers.has(kitResultId)) {
      const oldTimerId = pendingResultsEnteredTimers.get(kitResultId)
      clearTimeout(oldTimerId)
    }

    // update retried count
    let retried = 0
    if (retriedSaveResultsEntered.has(kitResultId)) {
      retried = retriedSaveResultsEntered.get(kitResultId)
    }
    retriedSaveResultsEntered.set(kitResultId, retried + 1)

    // trigger timer
    const timerId = setTimeout(
      () => saveResultsEntered(true, kitResultIdRef),
      60000
    )
    pendingResultsEnteredTimers.set(kitResultId, timerId)
    setPendingResultsEnteredTimers(new Map(pendingResultsEnteredTimers))

    // update context
    setTable({
      openDetailView: true,
      detailId: kitResultId,
      pendingResultsEntered,
      retriedSaveResultsEntered,
    })

    // updateResultsEnteredCache(true /* revert */)

    setTimeout(() => updateIsSettingResultsEntered(true), 100)
  }

  const saveResultsEntered = (
    triggeredByTimer = false,
    curKitResultIdRef = null
  ) => {
    if (!triggeredByTimer) {
      setLoadingResultsEntered(true)
    }

    // kitResultId is the value in the timer context
    // pendingResultsEntered map isn't affected by the timer context
    // if it is not the timer context, we just use the state itself
    const finalResultsEntered = triggeredByTimer
      ? pendingResultsEntered.get(kitResultId)
      : resultsEntered

    enterRapidTestResult({
      variables: {
        kit_result_id: kitResultId,
        results_entered_at: dayjs().utc(),
        results_entered_by: currentUserId,
        result: finalResultsEntered,
        clia: cliaWaiverNumber,
        lab_facility_id: cliaWaiverLabFacilityId,
      },
    })
      .then(({ data }) => {
        const { errors } = data?.enterRapidTestResult || {}

        if (!!errors?.value) {
          throw new Error(errors?.value)
        }

        updateResultsEnteredCache(false, curKitResultIdRef, finalResultsEntered)
      })
      .catch(error => console.log({ error }))
      .finally(() => {
        if (!triggeredByTimer) {
          setLoadingResultsEntered(false)
        }
      })
  }

  const triggerSaveResultsEntered = () => {
    retryingResultsEntered.delete(kitResultId)

    // get retried value
    let retried = 0
    if (retriedSaveResultsEntered.has(kitResultId)) {
      retried = retriedSaveResultsEntered.get(kitResultId)
    }

    if (pendingResultsEnteredTimers.has(kitResultId)) {
      const oldTimerId = pendingResultsEnteredTimers.get(kitResultId)
      clearTimeout(oldTimerId)
      pendingResultsEnteredTimers.delete(kitResultId)
      setPendingResultsEnteredTimers(new Map(pendingResultsEnteredTimers))
    }

    if (retried >= 3) {
      saveResultsEntered(false, kitResultIdRef)
    } else {
      // display toast, update cache, run timer
      showResultsEnteredToast()

      updateResultsEnteredCache(false, kitResultIdRef)

      const newState = {}

      // update context
      pendingResultsEntered.set(kitResultId, resultsEntered)
      newState.pendingResultsEntered = pendingResultsEntered

      setTable(newState)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  if (kitResult && (open || standalone)) {
    content = (
      <Details
        kitResult={kitResult}
        isPdfExist={isPdfExist}
        standalone={standalone}
        isSettingResultsEntered={isSettingResultsEntered}
        updateIsSettingResultsEntered={updateIsSettingResultsEntered}
        isSettingCollectedAt={isSettingCollectedAt}
        updateIsSettingCollectedAt={updateIsSettingCollectedAt}
        loadingResultsEntered={loadingResultsEntered}
        resultsEntered={resultsEntered}
        setResultsEntered={setResultsEntered}
        triggerSaveResultsEntered={triggerSaveResultsEntered}
      />
    )
  }

  if (standalone) {
    return (
      <S.StandaloneContainer data-cy="detail-view">
        {content}
      </S.StandaloneContainer>
    )
  }

  return (
    <S.ViewContainer data-cy="detail-view" open={open} ref={wrapperRef}>
      {content}
    </S.ViewContainer>
  )
}

export default ResultsEnteredWrapper
