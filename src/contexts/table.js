import React, { useState } from "react"
import Field, { DEFAULT_COLUMN_COUNT } from "utils/fields"

import { DEFAULT_COLUMN_PREFERENCE } from "utils/constants"

export const TableContext = React.createContext({
  currentPage: 0,
  searchText: "",
  preSearchText: "",
  sort: {
    direction: "desc_nulls_last",
    field: Field.id.name,
  },
  filterClient: [],
  filterStatus: [],
  filterStatusIncludeKitsWithIds: [],
  filterStatusExcludeKitsWithIds: [],
  filterOrdered: "",
  filterOrderedOption: 0,
  filterRegistered: "",
  filterRegisteredOption: 0,
  filterCollected: "",
  filterCollectedIds: [],
  filterCollectedOption: 0,
  filterReceived: "",
  filterReceivedOption: 0,
  filterSampleIssues: [],
  filterApproved: "",
  filterApprovedOption: 0,
  filterParticipantViewedAt: "",
  filterParticipantViewedAtOption: 0,
  filterTestName: [],
  filterTestNameOption: [],
  filterResult: [],
  filterResultsEntered: [],
  filterResultsEnteredAt: "",
  filterResultsEnteredAtIds: [],
  filterResultsEnteredAtOption: 0,
  openDetailView: false,
  pendingResultsEntered: new Map(),
  retriedSaveResultsEntered: new Map(),
  retryingResultsEntered: new Map(),
  isPdfExist: false,
  detailId: 0,
  disableCsv: false,
  longColumns: [],
  info: {
    start: 0,
    end: 0,
    total: 0,
  },
  columns: DEFAULT_COLUMN_PREFERENCE,
  setTable: () => {},
})

export const TableProvider = ({ children }) => {
  const [tableState, setTableState] = useState({
    currentPage: 0,
    searchText: "",
    preSearchText: "",
    sort: {
      direction: "desc_nulls_last",
      field: Field.id.name,
    },
    filterClient: [],
    filterStatus: [],
    filterStatusIncludeKitsWithIds: [],
    filterStatusExcludeKitsWithIds: [],
    filterOrdered: "",
    filterOrderedOption: 0,
    filterRegistered: "",
    filterRegisteredOption: 0,
    filterCollected: "",
    filterCollectedIds: [],
    filterCollectedOption: 0,
    filterReceived: "",
    filterReceivedOption: 0,
    filterApproved: "",
    filterApprovedOption: 0,
    filterParticipantViewedAt: "",
    filterParticipantViewedAtOption: 0,
    filterSampleIssues: [],
    filterTestName: [],
    filterTestNameOption: [],
    filterResult: [],
    filterResultsEntered: [],
    filterResultsEnteredAt: "",
    filterResultsEnteredAtIds: [],
    filterResultsEnteredAtOption: 0,
    openDetailView: false,
    pendingResultsEntered: new Map(),
    retriedSaveResultsEntered: new Map(),
    retryingResultsEntered: new Map(),
    isPdfExist: false,
    detailId: 0,
    disableCsv: false,
    longColumns: [],
    info: {
      start: 0,
      end: 0,
      total: 0,
    },
  })

  const [columns, updateColumnVisibility] = useState(DEFAULT_COLUMN_PREFERENCE)

  const setTable = tableData => {
    setTableState({ ...tableState, ...tableData })
  }

  const columnCount =
    Object.values(columns)?.filter(column => column === true)?.length ||
    DEFAULT_COLUMN_COUNT

  return (
    <TableContext.Provider
      value={{
        ...tableState,
        columns,
        updateColumnVisibility,
        columnCount,
        setTable,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
