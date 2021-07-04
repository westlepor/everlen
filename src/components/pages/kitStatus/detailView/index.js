import React, { useState, useContext } from "react"
import { useQuery } from "react-apollo"

import GET_KSD from "queries/kitStatus/getDetail"

import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"
import { queryStatus } from "utils/constants"

import { useHasuraClaims, useSuperAdmin } from "hooks"

import ResultsEnteredWrapper from "./ResultsEnteredWrapper"

const DetailView = ({ detailId, open, standalone, isPdfExist }) => {
  const { user, targetUser } = useContext(SessionContext)
  const {
    isEnterprisePartnerClinicalAdmin,
    isHCPAdmin,
    canViewRapidTests,
  } = useHasuraClaims(user)
  const {
    isEverlywellSuperAdmin,
    isTargetUserHCPAdmin,
    targetRole,
  } = useSuperAdmin(user, targetUser)
  const { loading, error, data } = useQuery(GET_KSD, {
    ...queryOptions(user),
    variables: {
      id: detailId,
      isPartnerClinicalAdmin: isEnterprisePartnerClinicalAdmin,
      shouldFetchRapidTests:
        isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
    },
    skip: isEverlywellSuperAdmin && !targetRole,
    fetchPolicy: "cache-first",
  })
  let content = null

  const [isSettingResultsEntered, updateIsSettingResultsEntered] = useState(
    false
  )

  const [isSettingCollectedAt, updateIsSettingCollectedAt] = useState(false)

  let kitResult = null

  if (loading) {
    content = <p>Loading...</p>
  } else if (error || !data || data.kit_results.length === 0) {
    content = <p>Please reload the page.</p>
  } else {
    kitResult = {
      status: queryStatus.SUCCESS,
      data: data.kit_results[0],
    }
  }

  return (
    <ResultsEnteredWrapper
      content={content}
      kitResult={kitResult}
      isPdfExist={isPdfExist}
      open={open}
      standalone={standalone}
      isSettingResultsEntered={isSettingResultsEntered}
      updateIsSettingResultsEntered={updateIsSettingResultsEntered}
      isSettingCollectedAt={isSettingCollectedAt}
      updateIsSettingCollectedAt={updateIsSettingCollectedAt}
    />
  )
}

export default DetailView
