import React from "react"
import styled from "styled-components"
import Table from "components/molecules/common/table/table"
import * as mockKitResults from "__tests__/mockKitResults.json"
import { parseKitResults } from "utils/parseTableData"
import { TableProvider } from "contexts/table"
const tableData = parseKitResults({ data: mockKitResults.data.kit_results })
const StyledTable = styled(Table)``

export default {
  title: "Table",
  component: TableStory,
}

export const TableStory = () => (
  <TableProvider>
    <StyledTable data={tableData} />
  </TableProvider>
)
