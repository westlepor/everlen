import React, { useState, useContext, useEffect } from "react"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"
import Checkbox from "components/atoms/check"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"
import Field from "utils/fields"
import {
  useTestIds,
  useTestCount,
  useSuperAdmin,
  useVariables,
} from "../../../../../hooks"

const groupUniqueTestNames = data => {
  return data.reduce((list, item) => {
    const name = item.display_name
    const count = item.kit_results_aggregate.aggregate.count

    if (!list[name]) {
      list[name] = 0
    }

    list[name] = list[name] + count

    return list
  }, {})
}

const PopupTestNames = ({ handleOpen }) => {
  const { user, targetUser } = useContext(SessionContext)
  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)
  const variables = useVariables(user, targetUser)

  const { data: testIdsData } = useTestIds({
    ...queryOptions(user),
    variables,
    skip: isEverlywellSuperAdmin && !targetRole,
  })

  const ids = testIdsData?.kit_results?.map(r => r.test_id)
  const [getCount, { called, data }] = useTestCount({
    ...queryOptions(user),
    variables: { ids, ...variables },
  })

  useEffect(() => {
    if (isEverlywellSuperAdmin && !targetRole) {
      return
    }

    if (ids?.length > 0 && !called) {
      getCount()
    }
    // eslint-disable-next-line
  }, [ids])

  const uniqueNames = groupUniqueTestNames(data?.tests || [])
  const testNames = Object.keys(uniqueNames || {})
    .sort()
    .map(name => ({ label: name, count: uniqueNames[name] }))

  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)
  const { filterTestNameOption } = tableContext
  const [filters, setFilters] = useState(
    filterTestNameOption.map(option => ({
      filterIndex: option,
      filterName: testNames[option]?.label,
      value: true,
    }))
  )
  const popupOpen = open === Field.test.name

  const doFilter = () => {
    const selectedFilters = filters.reduce((acc, next) => {
      if (next.value) {
        acc.push(next.filterName)
      }

      return acc
    }, [])

    const selectedFiltersOption = filters.reduce((acc, next) => {
      if (next.value) {
        acc.push(next.filterIndex)
      }

      return acc
    }, [])

    tableContext.setTable({
      filterTestName: selectedFilters,
      filterTestNameOption: selectedFiltersOption,
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterTestName: [],
      filterTestNameOption: [],
    })
  }

  const doOpen = () => {
    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  const doSelectFilter = (filterIndex, checked) => {
    const isExist = filters.findIndex(e => e.filterIndex === filterIndex) > -1
    let changedFilters = [...filters]

    if (!isExist) {
      changedFilters.push({
        filterIndex: filterIndex,
        filterName: testNames[filterIndex].label,
        value: checked,
      })
    } else {
      changedFilters = filters.reduce((acc, next) => {
        if (next.filterIndex === filterIndex) {
          acc.push({
            filterIndex: next.filterIndex,
            filterName: next.filterName,
            value: checked,
          })
        } else {
          acc.push(next)
        }
        return acc
      }, [])
    }
    setFilters(changedFilters)
  }

  const menus = testNames.map((test, index) => {
    const filterState = filters.find(elem => elem.filterIndex === index)
    const checked = filterState ? filterState.value : false
    const disabled = test.count <= 0

    return (
      <MenuItem key={index}>
        <MenuLabel>{`${test.label} (${test.count ?? 0})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(index, checked)}
          disabled={disabled}
        />
      </MenuItem>
    )
  })

  return (
    <Popup
      open={popupOpen}
      menus={menus}
      onOpen={doOpen}
      onClose={doClose}
      onApply={doFilter}
      onReset={doReset}
      width={282}
    />
  )
}

export default PopupTestNames
