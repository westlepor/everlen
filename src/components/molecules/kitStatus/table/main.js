import React, { useEffect, useContext } from "react"
import { useQuery } from "react-apollo"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import TableBody from "components/molecules/common/table/tableBody"
import Header from "components/molecules/common/table/tableHeader"
import Pager from "components/molecules/common/table/tablePager"
import Row from "components/molecules/common/table/tableRow"
import PopupWrapper from "components/molecules/kitStatus/inlineFilter/popup/popupWrapper"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import {
  TABLE_MAX_ROWS,
  TABLE_PAGER_COUNT,
  DEFAULT_COLUMN_PREFERENCE,
  HCP_COLUMN_PREFERENCE,
} from "utils/constants"

import {
  parseKitResults,
  buildHeader,
  buildFakeRows,
} from "utils/parseTableData"

import Field from "utils/fields"
import { queryOptions, getLastNameSearchText } from "utils/helper"
import { formatTimezoneDate } from "utils/datetime"

import GET_KS from "queries/kitStatus/get"
import { useVariables, useSuperAdmin, useHasuraClaims } from "hooks"

import { useUserColumnPreference } from "hooks"

/**
 * Styled Components
 */

const Container = styled.div`
  color: ${colors.gray4};
  font-size: 14px;
  width: 100%;
`

const GhostContainer = styled(Container)`
  overflow: hidden;
  padding-top: 10px;
`

const HScrollable = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: ${size.xl2}px;
  border-radius: 4px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  border: solid 1px ${colors.green1};
`

const StyledPager = styled(Pager)`
  margin-top: 20px;
`

/**
 * Main Component
 */
const MainTable = ({ maxRowCount, setIsLoading, menus }) => {
  const session = useContext(SessionContext)
  const { offsetX } = useContext(PopupContext)
  const tableContext = useContext(TableContext)
  const {
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
    currentPage,
    setTable,
    columns,
    updateColumnVisibility,
  } = tableContext
  const { user, targetUser, isLoadedClients, hasClients } = session

  const { isHCPAdmin, rapidTestId, canViewRapidTests } = useHasuraClaims(user)

  const {
    isTargetUserHCPAdmin,
    isEverlywellSuperAdmin,
    targetRole,
    isMasqueradeMode,
  } = useSuperAdmin(user, targetUser)

  const {
    data: fetchedColumnPreference,
    loading: isColumnPreferenceLoading,
  } = useUserColumnPreference(user, targetUser)

  const columnPreference =
    fetchedColumnPreference?.findUserByID?.test_kit_table_config

  useEffect(() => {
    if (
      ((typeof isLoadedClients !== undefined && !!isLoadedClients) ||
        (isEverlywellSuperAdmin && targetRole)) &&
      !isColumnPreferenceLoading
    ) {
      if (isHCPAdmin) {
        updateColumnVisibility({ ...HCP_COLUMN_PREFERENCE, client: hasClients })
      } else if (!isHCPAdmin && !!isTargetUserHCPAdmin) {
        updateColumnVisibility({ ...HCP_COLUMN_PREFERENCE, client: hasClients })
      } else if (!!columnPreference) {
        updateColumnVisibility(columnPreference)
      } else if (isEverlywellSuperAdmin && !isMasqueradeMode) {
        updateColumnVisibility(DEFAULT_COLUMN_PREFERENCE)
      } else {
        updateColumnVisibility(prevColumns => ({
          ...prevColumns,
          client: hasClients,
        }))
      }
    }
    // eslint-disable-next-line
  }, [
    isLoadedClients,
    isColumnPreferenceLoading,
    columnPreference,
    isEverlywellSuperAdmin,
    targetRole,
  ])

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
    case Field.ordered.name:
      sortBy = {
        barcode: {
          spree_order: {
            completed_at: direction,
          },
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
    case Field.test.name:
      sortBy = {
        test: {
          display_name: direction,
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

  /**
   * Fetch one page data
   */

  const chooseVariables = () => {
    let kitStatusVar = {
      offset: 0,
      limit: maxRowCount * TABLE_PAGER_COUNT,
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

  const { loading, error, data, fetchMore } = useQuery(
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
      onCompleted() {
        const info = {
          start: currentPage * maxRowCount + 1,
          end: (currentPage + 1) * maxRowCount,
          total: testKits?.kit_results_aggregate?.aggregate?.count,
        }
        if (getDatas().length > 0) {
          setTable({
            disableCsv: false,
            info,
          })
        } else {
          setTable({
            disableCsv: true,
            info,
          })
        }
      },
      skip: isEverlywellSuperAdmin && !targetRole,
    }
  )

  const testKits =
    isEverlywellSuperAdmin && !targetRole
      ? { kit_results: [], kit_results_aggregate: { aggregate: { count: 0 } } }
      : data

  const getDatas = () => {
    return testKits?.kit_results ? testKits?.kit_results : []
  }

  const getTotalRows = () => {
    return testKits?.kit_results_aggregate
      ? testKits?.kit_results_aggregate?.aggregate?.count
      : TABLE_MAX_ROWS
  }

  /**
   * Fetch next pages for one pager group
   */
  const fetchNext = () => {
    fetchMore({
      ...queryOptions(user),
      variables: {
        offset: getDatas().length,
        limit: maxRowCount * TABLE_PAGER_COUNT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          kit_results: [...prev.kit_results, ...fetchMoreResult.kit_results],
        })
      },
    })
  }

  useEffect(() => setIsLoading(loading), [setIsLoading, loading])

  if (
    loading ||
    isColumnPreferenceLoading ||
    error ||
    typeof isLoadedClients === undefined
  ) {
    const fakeRows = buildFakeRows()
    const rowComs = fakeRows.map((elem, key) => (
      <Row key={key} row={elem.row} />
    ))

    return (
      <GhostContainer>
        <Header header={buildHeader({ isFake: true })} isFake />
        <div>{rowComs}</div>
      </GhostContainer>
    )
  }
  const fetchedRows = getDatas().length
  const totalRowCount = getTotalRows()
  const tableData = parseKitResults({
    data,
    columns,
    isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
    canViewRapidTests,
  })
  tableData.menus = menus

  let fetchedPages = Math.ceil(fetchedRows / maxRowCount)
  let pageCount = Math.ceil(totalRowCount / maxRowCount)

  if (pageCount * maxRowCount < totalRowCount) {
    pageCount++
  }

  const handleScroll = () => {
    const tableDom = document.querySelector("#kit-table")
    const popup = document.querySelector("#filter-popup")
    if (popup) {
      let left = offsetX - tableDom.scrollLeft
      if (left < tableDom.offsetLeft) {
        left = tableDom.offsetLeft
      }
      const maxLeft =
        tableDom.offsetLeft + tableDom.clientWidth - popup.clientWidth
      if (left > maxLeft) {
        left = maxLeft
      }

      popup.style.left = `${left}px`
    }
  }

  return (
    <Container data-cy="kit-status-table">
      <PopupWrapper />
      <HScrollable id="kit-table" onScroll={handleScroll}>
        <Header header={tableData.header} />
        <TableBody
          data={tableData}
          maxRowCount={maxRowCount}
          onLoadMore={fetchNext}
        />
      </HScrollable>
      {tableData && tableData.rows.length > 0 && (
        <StyledPager
          count={pageCount}
          totalRowCount={totalRowCount}
          maxRowCount={maxRowCount}
          fetchedPages={fetchedPages}
          onLoadMore={fetchNext}
        />
      )}
    </Container>
  )
}

MainTable.propTypes = {
  maxRowCount: PropTypes.number,
}

MainTable.defaultProps = {
  maxRowCount: TABLE_MAX_ROWS,
}

export default MainTable
