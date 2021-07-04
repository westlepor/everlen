import React, { useContext, useState } from "react"

import { useLazyQuery } from "react-apollo"
import { toast } from "react-toastify"

import Toast from "components/common/Toast"

import {
  getCsvHeaders,
  getHCPCsvHeaders,
  getCsvRow,
  getHCPCsvRow,
  getStringifiedRows,
} from "utils/csv"
import { queryOptions, getLastNameSearchText } from "utils/helper"
import { TOAST_MSG, TOAST_DESC } from "utils/constants"
import Field from "utils/fields"
import { formatTimezoneDate } from "utils/datetime"
import { TableContext } from "contexts/table"
import { SessionContext } from "contexts/session"

import GET_KS from "queries/kitStatus/get"
import { useVariables, useSuperAdmin, useHasuraClaims } from "hooks"

import * as S from "./style"

const CsvExporter = ({ isLoading }) => {
  const session = useContext(SessionContext)
  const tableContext = useContext(TableContext)
  const {
    disableCsv,
    sort: { direction, field },
    searchText,
    filterClient,
    filterStatus,
    filterStatusIncludeKitsWithIds,
    filterStatusExcludeKitsWithIds,
    filterOrdered,
    filterRegistered,
    filterCollected,
    filterCollectedIds,
    filterReceived,
    filterSampleIssues,
    filterApproved,
    filterParticipantViewedAt,
    filterTestName,
    filterResult,
    filterResultsEntered,
    filterResultsEnteredAt,
    filterResultsEnteredAtIds,
  } = tableContext
  const { user, targetUser, isLoadedClients, clients } = session

  const { isHCPAdmin, rapidTestId, canViewRapidTests } = useHasuraClaims(user)

  const { isTargetUserHCPAdmin } = useSuperAdmin(user, targetUser)

  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false)

  const hasClients = isLoadedClients && clients.length > 0

  // default order_by query
  let sortBy = {
    barcode: { serial_number: "desc_nulls_last" },
  }

  switch (field) {
    case Field.id.name:
      sortBy = {
        barcode: {
          serial_number: direction,
        },
      }
      break
    case Field.name.name:
      sortBy = {
        spree_user: {
          consumer: {
            first_name: direction,
          },
        },
      }
      break
    case Field.dob.name:
      sortBy = {
        spree_user: {
          consumer: {
            dob: direction,
          },
        },
      }
      break
    case Field.test.name:
      sortBy = {
        test: {
          display_name: direction,
        },
      }
      break
    case Field.approveTime.name:
      sortBy = {
        results_approved_at: direction,
      }
      break
    case Field.client.name:
      sortBy = {
        barcode: {
          spree_order: {
            enterprise_client: {
              name: direction,
            },
          },
        },
      }
      break
    case Field.ordered.name:
      sortBy = {
        barcode: {
          spree_order: {
            completed_at: direction,
          },
        },
      }
      break
    case Field.participantViewedAt.name:
      sortBy = {
        viewed_at: direction,
      }
      break
    case Field.result.name:
      sortBy = {
        summary: direction,
      }
      break
    default:
      break
  }

  const chooseVariables = () => {
    let kitStatusVar = {
      offset: 0,
      order_by: sortBy,
    }

    if (searchText) {
      kitStatusVar.search_text = `%${searchText.replace(/[-]/g, "")}%`
      kitStatusVar.last_name_search = getLastNameSearchText(searchText)
    }

    if (filterClient.length > 0) {
      kitStatusVar.clients = filterClient
        .filter(c => c.id !== "none")
        .map(c => c.id)
      kitStatusVar.noneClient = filterClient.find(c => c.id === "none")?.value
        ? 1
        : 0
    }

    if (filterStatus.length > 0) {
      kitStatusVar.status = filterStatus
      kitStatusVar.filterStatusIncludeKitsWithIds = filterStatusIncludeKitsWithIds
      kitStatusVar.filterStatusExcludeKitsWithIds = filterStatusExcludeKitsWithIds
    }

    if (filterOrdered?.from && filterOrdered?.to) {
      kitStatusVar.orderedFrom = formatTimezoneDate({
        date: filterOrdered.from,
        isEnd: false,
      })
      kitStatusVar.orderedTo = formatTimezoneDate({
        date: filterOrdered.to,
        isEnd: true,
      })
    }

    if (filterRegistered?.from && filterRegistered?.to) {
      kitStatusVar.registeredFrom = formatTimezoneDate({
        date: filterRegistered.from,
        isEnd: false,
      })
      kitStatusVar.registeredTo = formatTimezoneDate({
        date: filterRegistered.to,
        isEnd: true,
      })
    }

    if (filterCollected?.from && filterCollected?.to) {
      kitStatusVar.isFilteredByCollectedAt = true
      kitStatusVar.includeKitResultsWithIdsFilteredByCollectedAt = filterCollectedIds
    }

    if (filterResultsEnteredAt?.from && filterResultsEnteredAt?.to) {
      kitStatusVar.isFilteredByResultsEnteredAt = true
      kitStatusVar.includeKitResultsWithIdsFilteredByResultsEnteredAt = filterResultsEnteredAtIds
    }

    if (filterReceived?.from && filterReceived?.to) {
      kitStatusVar.receivedFrom = formatTimezoneDate({
        date: filterReceived.from,
        isEnd: false,
      })
      kitStatusVar.receivedTo = formatTimezoneDate({
        date: filterReceived.to,
        isEnd: true,
      })
    }

    if (filterSampleIssues.length > 0) {
      kitStatusVar.sampleIssues = filterSampleIssues
    }

    if (filterApproved?.from && filterApproved?.to) {
      kitStatusVar.approvedFrom = formatTimezoneDate({
        date: filterApproved.from,
        isEnd: false,
      })
      kitStatusVar.approvedTo = formatTimezoneDate({
        date: filterApproved.to,
        isEnd: true,
      })
    }

    if (filterParticipantViewedAt?.from && filterParticipantViewedAt?.to) {
      kitStatusVar.participantViewedAtFrom = formatTimezoneDate({
        date: filterParticipantViewedAt.from,
        isEnd: false,
      })
      kitStatusVar.participantViewedAtTo = formatTimezoneDate({
        date: filterParticipantViewedAt.to,
        isEnd: true,
      })
    }

    if (filterTestName.length > 0) {
      kitStatusVar.testNames = filterTestName
    }

    if (filterResult.length > 0) {
      kitStatusVar.results = filterResult
    }

    if (filterResultsEntered.length > 0) {
      kitStatusVar.isFilteredByResultsEntered = true
      kitStatusVar.includeKitResultsWithIds = filterResultsEntered
        .flatMap(resultSelected => resultSelected.kitResultIds)
        .filter(id => !!id)
    }

    return kitStatusVar
  }

  const variables1 = chooseVariables()
  const variables2 = useVariables(user, targetUser)

  // download all data for CSV (it's lazy load run by getAllData)
  const [getAllData, { loading: loadingAll }] = useLazyQuery(
    GET_KS({
      ...variables1,
      ...variables2,
      isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
      rapidTestId,
      shouldFetchRapidTests:
        isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
    }),
    {
      ...queryOptions(user),
      variables: {
        ...variables1,
        ...variables2,
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        shouldFetchRapidTests:
          isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
      },
      onError() {
        setIsDownloadingCSV(false)
      },
      onCompleted(csvData) {
        if (!isDownloadingCSV) {
          return
        }

        setIsDownloadingCSV(false)
        const kitResults = csvData?.kit_results || []
        const markerResultNames = [
          ...new Set(
            kitResults
              .map(result => result?.marker_results?.map(m => m.name) || [])
              .reduce((acc, val) => acc.concat(val), [])
          ),
        ]

        const headers =
          isHCPAdmin || isTargetUserHCPAdmin
            ? getHCPCsvHeaders()
            : getCsvHeaders({
                hasClients,
                markerResultNames,
                canViewRapidTests,
              })

        const csvContent = "data:text/csv;charset=utf-8," + headers
        const data = kitResults.map(elem =>
          isHCPAdmin || isTargetUserHCPAdmin
            ? getHCPCsvRow({ elem })
            : getCsvRow({
                elem,
                hasClients,
                canViewRapidTests,
                markerResultNames,
              })
        )

        // wrap data with quote
        getStringifiedRows(data).then(results => {
          var encodedUri = encodeURI(csvContent + results)
          var link = document.createElement("a")
          link.setAttribute("href", encodedUri)
          link.setAttribute("download", "kit-status.csv")
          document.body.appendChild(link) // Required for FF
          link.click()
        })

        toast(
          <Toast
            message={TOAST_MSG.CSV_EXPORTED}
            description={TOAST_DESC.CSV_EXPORTED}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "success",
            autoClose: 4000,
          }
        )
      },
    }
  )

  /**
   * Download CSV for all data
   */
  const downloadCsv = () => {
    if (!disableCsv) {
      setIsDownloadingCSV(true)
      getAllData()
    }
  }

  if (isLoading) {
    return <S.CsvSkeleton />
  }

  if (disableCsv) {
    return (
      <S.CsvButton
        label="Export CSV"
        Icon={S.ExportIcon}
        disabled={true}
        loading={false}
      />
    )
  }

  return (
    <>
      {loadingAll ? (
        <S.CsvButton loading="true" color="white" />
      ) : (
        <S.CsvButton
          label="Export CSV"
          Icon={S.ExportIcon}
          onClick={downloadCsv}
          disabled={disableCsv}
        />
      )}
    </>
  )
}

export default CsvExporter
