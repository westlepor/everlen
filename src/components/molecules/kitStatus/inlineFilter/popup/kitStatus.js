import React, { useState, useContext, useEffect } from "react"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import Checkbox from "components/atoms/check"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import { KitStatusDesc, KitStatusValue } from "utils/constants"
import Field from "utils/fields"

import {
  useSuperAdmin,
  useStatusCount,
  useCountByRapidTestStatus,
  useHasuraClaims,
} from "hooks"

const PopupKitStatus = ({ handleOpen }) => {
  const { user, targetUser } = useContext(SessionContext)

  const { isHCPAdmin, isHCPOrCanViewRapidTests } = useHasuraClaims(user)
  const {
    isEverlywellSuperAdmin,
    isTargetUserHCPAdmin,
    targetRole,
  } = useSuperAdmin(user, targetUser)

  const tableContext = useContext(TableContext)
  const { filterStatus, setTable } = tableContext

  const { open } = useContext(PopupContext)
  const [filters, setFilters] = useState(
    filterStatus.map(e => {
      return { status: e, value: true }
    })
  )

  const popupOpen = open === Field.status.name

  const [
    getRapidTestCount,
    {
      data: rapidTestData,
      called: isRapidTestCountCalled,
      loading: isRapidTestCountLoading,
    },
  ] = useCountByRapidTestStatus()

  const [getCount, { data }] = useStatusCount({
    excludeRegisteredKitsWithIds: [
      ...(rapidTestData?.collected?.nodes?.map(n => n.kitResultId) || []),
      ...(rapidTestData?.results_entered?.nodes?.map(n => n.kitResultId) || []),
    ],
    includeResultsEnteredKitsWithIds:
      rapidTestData?.results_entered?.nodes?.map(n => n.kitResultId) || [],
  })

  useEffect(() => {
    if (isRapidTestCountCalled && !isRapidTestCountLoading) {
      getCount()
    }
    // eslint-disable-next-line
  }, [isRapidTestCountCalled, isRapidTestCountLoading])

  const kitIds = {
    registered: {
      include: [],
      exclude: [
        ...(rapidTestData?.collected?.nodes?.map(n => n.kitResultId) || []),
        ...(rapidTestData?.results_entered?.nodes?.map(n => n.kitResultId) ||
          []),
      ],
    },
    collected: {
      include: rapidTestData?.collected?.nodes?.map(n => n.kitResultId) || [],
      exclude: [],
    },
    results_entered: {
      include:
        rapidTestData?.results_entered?.nodes?.map(n => n.kitResultId) || [],
      exclude: [],
    },
    retrievable_results: {
      include: [],
      exclude: [
        ...(rapidTestData?.collected?.nodes?.map(n => n.kitResultId) || []),
        ...(rapidTestData?.results_entered?.nodes?.map(n => n.kitResultId) ||
          []),
      ],
    },
  }

  const doFilter = () => {
    const selectedFilters = filters.reduce((acc, next) => {
      if (next.value) {
        acc.push(next.status)
      }

      return acc
    }, [])

    let filterStatusIncludeKitsWithIds = []
    let filterStatusExcludeKitsWithIds = []

    selectedFilters.map(filter => {
      filterStatusIncludeKitsWithIds = [
        ...filterStatusIncludeKitsWithIds,
        ...(kitIds[filter]?.include || []),
      ]

      filterStatusExcludeKitsWithIds = [
        ...filterStatusExcludeKitsWithIds,
        ...(kitIds[filter]?.exclude || []),
      ]

      return null
    })

    setTable({
      filterStatus: selectedFilters,
      filterStatusIncludeKitsWithIds,
      filterStatusExcludeKitsWithIds: filterStatusExcludeKitsWithIds.filter(
        id => !filterStatusIncludeKitsWithIds.includes(id)
      ),
      currentPage: 0,
    })
  }

  const doReset = () => {
    setTable({ filterStatus: [] })
  }

  const doSelectFilter = (status, checked) => {
    const isExist = filters.findIndex(e => e.status === status) > -1

    let changedFilters = [...filters]

    if (!isExist) {
      changedFilters.push({ status: status, value: checked })
    } else {
      changedFilters = filters.reduce((acc, next) => {
        if (next.status === status) {
          acc.push({ status: next.status, value: checked })
        } else {
          acc.push(next)
        }

        return acc
      }, [])
    }

    setFilters(changedFilters)
  }

  const doOpen = () => {
    if (isEverlywellSuperAdmin && !targetRole) {
      return
    }

    if (isHCPOrCanViewRapidTests || isTargetUserHCPAdmin) {
      getRapidTestCount()
    } else {
      getCount()
    }

    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  const list = [
    {
      value: KitStatusValue.Registered,
      label: KitStatusDesc[KitStatusValue.Registered].label,
      count: data?.registered?.aggregate?.count || 0,
      isVisible: true,
    },
    {
      value: KitStatusValue.SampleCollected,
      label: KitStatusDesc[KitStatusValue.SampleCollected].label,
      count: rapidTestData?.collected?.totalCount || 0,
      isVisible: isHCPOrCanViewRapidTests || isTargetUserHCPAdmin,
    },
    {
      value: KitStatusValue.Retrievable,
      label: KitStatusDesc[KitStatusValue.Retrievable].label,
      count: data?.retrievable_results?.aggregate?.count || 0,
      isVisible: !isHCPAdmin && !isTargetUserHCPAdmin,
    },
    {
      value: KitStatusValue.ResultsEntered,
      label: KitStatusDesc[KitStatusValue.ResultsEntered].label,
      count:
        (rapidTestData?.results_entered?.totalCount || 0) -
        (data?.approved_results_entered?.aggregate?.count || 0),
      isVisible: isHCPOrCanViewRapidTests || isTargetUserHCPAdmin,
    },
    {
      value: KitStatusValue.Approved,
      label: KitStatusDesc[KitStatusValue.Approved].label,
      count: data?.approved?.aggregate?.count || 0,
      isVisible: true,
    },
    {
      value: KitStatusValue.Canceled,
      label: KitStatusDesc[KitStatusValue.Canceled].label,
      count: data?.canceled?.aggregate?.count || 0,
      isVisible: true,
    },
  ]

  const menus = list.map((item, i) => {
    const filterState = filters.find(elem => elem.status === item.value)
    const checked = filterState ? filterState.value : false
    const disabled = item.count > 0 ? false : true

    if (!item.isVisible) {
      return null
    }

    return (
      <MenuItem key={i} data-cy={item.label}>
        <MenuLabel>{`${item.label} (${item.count})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(item.value, checked)}
          disabled={disabled}
        />
      </MenuItem>
    )
  })

  if (
    !data ||
    ((isHCPOrCanViewRapidTests || isTargetUserHCPAdmin) && !rapidTestData)
  ) {
    return (
      <Popup
        open={popupOpen}
        menus={<MenuLabel>Loading...</MenuLabel>}
        onOpen={doOpen}
        onClose={doClose}
        width={282}
      />
    )
  }

  return (
    <Popup
      open={popupOpen}
      menus={<>{menus}</>}
      onOpen={doOpen}
      onClose={doClose}
      onApply={doFilter}
      onReset={doReset}
      width={282}
    />
  )
}

export default PopupKitStatus
