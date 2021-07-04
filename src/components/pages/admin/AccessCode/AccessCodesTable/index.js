import React, { useContext } from "react"

import dayjs from "dayjs"

import {
  formatAmount,
  calculateRemaining,
  calculateMaxOrder,
  calculateStatus,
  calculateTimezone,
} from "utils/accessCodes"
import {
  formatDateByTimezone,
  DOB_FORMATTER,
  getTimezoneFromCodeDate,
  getTimezoneOffset,
  getTimezoneOffsetByShort,
} from "utils/datetime"

import { SessionContext } from "contexts/session"
import { useHasuraClaims, useSuperAdmin } from "hooks"

import * as S from "./style"

import Table from "./table"
import StatusIndicator from "./StatusIndicator"
import Menu from "./Menu"

const filterByDate = (rows, field, filterValue) => {
  return rows.filter(row => {
    if (filterValue.length === 0) {
      return true
    }

    let date = row.values[field]
    if (!date) {
      return false
    }

    const timezone = getTimezoneFromCodeDate(date)
    const localTimezone = getTimezoneOffset()
    if (date.includes("T") && !date.includes("Z")) {
      date += "Z" // prevent auto timezone setting
    }
    const target = dayjs(date).utcOffset(0)
    const from = dayjs(filterValue[0])
      .utcOffset(0)
      .add(localTimezone, "hour")
      .subtract(timezone, "hour")
    const to = dayjs(filterValue[1])
      .utcOffset(0)
      .add(localTimezone, "hour")
      .subtract(timezone, "hour")
      .add(1, "day")
      .subtract(1, "second")

    return target.diff(from) >= 0 && to.diff(target) >= 0
  })
}

const filterByClient = (rows, field, filterValue) => {
  return rows.filter(row => {
    if (filterValue.length === 0) {
      return true
    }

    const target = row.values[field]
    if (filterValue.findIndex(e => e === "none") >= 0 && !target) {
      return true
    }

    return filterValue.includes(target)
  })
}

const AccessCodesTable = ({ data, loading, user, queryOptions }) => {
  const { targetUser } = useContext(SessionContext)
  const { hasAccessToMultipleClients } = useHasuraClaims(user)
  const {
    isEverlywellSuperAdmin,
    hasTargetAccessToMultipleClients,
  } = useSuperAdmin(user, targetUser)

  const sortType = (rowA, rowB, columnId) => {
    const valueA = rowA?.values[columnId]?.toLowerCase()
    const valueB = rowB?.values[columnId]?.toLowerCase()

    return valueA > valueB ? 1 : valueB > valueA ? -1 : 0
  }

  const sortTimezone = (rowA, rowB, columnId) => {
    const timezoneA = rowA?.values[columnId]
    const timezoneB = rowB?.values[columnId]

    const valueA = getTimezoneOffsetByShort(timezoneA)
    const valueB = getTimezoneOffsetByShort(timezoneB)
    return valueA > valueB ? 1 : valueB > valueA ? -1 : 0
  }

  const rows = data?.access_codes?.map(code => {
    return {
      ...code,
      remaining: calculateRemaining(code),
      max_orders: calculateMaxOrder(code),
      status: calculateStatus(code),
      timezone: calculateTimezone(code),
    }
  })

  let columns = [
    {
      Header: "Name",
      accessor: "name",
      sortType,
      Cell: ({ value }) => value ?? "-",
      sortDescFirst: true,
      minWidth: 150,
    },
    {
      Header: "Access Code",
      accessor: "code",
      sortType,
      Cell: ({ value }) => value ?? "-",
      sortDescFirst: true,
      minWidth: 139,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusIndicator value={value} />,
      sortDescFirst: true,
      sortType,
      filter: "includesSome",
      enableFilter: true,
      minWidth: 102,
    },
    {
      Header: "Start Date",
      accessor: "opens_at",
      Cell: ({ value }) =>
        !!value
          ? formatDateByTimezone({ date: value, formatter: DOB_FORMATTER })
          : "-",
      sortDescFirst: true,
      minWidth: 117,
      filter: (rows, _columnIds, filterValue) =>
        filterByDate(rows, "opens_at", filterValue),
      enableFilter: true,
    },
    {
      Header: "End Date",
      accessor: "closes_at",
      Cell: ({ value }) =>
        !!value
          ? formatDateByTimezone({ date: value, formatter: DOB_FORMATTER })
          : "-",
      sortDescFirst: true,
      minWidth: 106,
      filter: (rows, _columnIds, filterValue) =>
        filterByDate(rows, "closes_at", filterValue),
      enableFilter: true,
    },
    {
      Header: "Timezone",
      accessor: "timezone",
      Cell: ({ value }) => value ?? "-",
      sortDescFirst: true,
      sortType: sortTimezone,
      filter: "includesSome",
      enableFilter: true,
      minWidth: 106,
    },
    {
      Header: "Usage Limit",
      accessor: "max_orders",
      Cell: ({ value }) => {
        const isUnlimited = value === Number.MAX_SAFE_INTEGER

        return isUnlimited ? "Unlimited" : formatAmount(value)
      },
      sortDescFirst: true,
      minWidth: 104,
    },
    {
      Header: "Claimed",
      accessor: "spree_orders_aggregate.aggregate.count",
      Cell: ({ value }) => (!value ? 0 : formatAmount(value)),
      sortDescFirst: true,
      minWidth: 76,
    },
    {
      Header: "Remaining",
      accessor: "remaining",
      Cell: ({ value }) => {
        return formatAmount(value) ?? "-"
      },
      sortDescFirst: true,
      minWidth: 98,
    },
    {
      id: "menu",
      Cell: ({ row: { original } }) => {
        const { code } = original

        return <Menu code={code} queryOptions={queryOptions} />
      },
    },
  ]

  if (
    hasAccessToMultipleClients ||
    (isEverlywellSuperAdmin && hasTargetAccessToMultipleClients)
  ) {
    columns = [
      {
        Header: "Client",
        id: "Client",
        accessor: "enterprise_client.name",
        Cell: ({ value }) => value ?? "-",
        filter: (rows, _columnIds, filterValue) =>
          filterByClient(rows, "Client", filterValue),
        sortDescFirst: true,
        enableFilter: true,
        minWidth: 120,
      },
      ...columns,
    ]
  }

  return (
    <S.TableWrapper id="access-code-table" data-cy="access-code-table">
      <Table columns={columns} data={rows || []} loading={loading} />
    </S.TableWrapper>
  )
}

export default AccessCodesTable
