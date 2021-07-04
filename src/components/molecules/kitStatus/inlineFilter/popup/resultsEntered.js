import React, { useContext, useState } from "react"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import Checkbox from "components/atoms/check"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import Field from "utils/fields"

import { useSuperAdmin, useResultsEnteredCount } from "hooks"

const PopupResultsEntered = ({ handleOpen }) => {
  const { user, targetUser } = useContext(SessionContext)
  const { filterResultsEntered, setTable } = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)

  const popupOpen = open === Field.resultsEntered.name

  const [filters, setFilters] = useState(
    filterResultsEntered.map(resultsEntered => ({
      resultsEntered: resultsEntered.label,
      value: true,
    }))
  )

  const doReset = () => {
    setTable({ filterResultsEntered: [] })
    setFilters([])
  }

  const doSelectFilter = (resultsEntered, checked) => {
    const isExist =
      filters.findIndex(e => e.resultsEntered === resultsEntered) > -1
    let changedFilters = [...filters]

    if (!isExist) {
      changedFilters.push({ resultsEntered, value: checked })
    } else {
      changedFilters = filters.reduce((acc, next) => {
        if (next.resultsEntered === resultsEntered) {
          acc.push({ resultsEntered: next.resultsEntered, value: checked })
        } else {
          acc.push(next)
        }
        return acc
      }, [])
    }

    setFilters(changedFilters)
  }

  const [getCount, { data, loading }] = useResultsEnteredCount()

  const doFilter = () => {
    const selectedFilters = filters.reduce((filtersList, filter) => {
      if (filter.value) {
        filtersList.push({
          label: filter.resultsEntered,
          kitResultIds: data[filter.resultsEntered]?.nodes?.map(
            node => node.kitResultId
          ),
        })
      }

      return filtersList
    }, [])

    setTable({
      filterResultsEntered: selectedFilters,
      currentPage: 0,
    })
  }

  const doOpen = () => {
    if (isEverlywellSuperAdmin && !targetRole) {
      return
    }

    getCount()

    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  const list = [
    {
      label: "negative",
      kitResultIds: data?.negative?.nodes?.map(node => node.kitResultId) || [],
      count: data?.negative?.totalCount || 0,
    },
    {
      label: "positive",
      kitResultIds: data?.positive?.nodes?.map(node => node.kitResultId) || [],
      count: data?.positive?.totalCount || 0,
    },
    {
      label: "invalid",
      kitResultIds: data?.invalid?.nodes?.map(node => node.kitResultId) || [],
      count: data?.invalid?.totalCount || 0,
    },
  ]

  const menus = list.map((e, i) => {
    const filterState = filters.find(elem => elem.resultsEntered === e.label)
    const checked = filterState ? filterState.value : false
    const disabled = e.count > 0 ? false : true

    return (
      <MenuItem key={i}>
        <MenuLabel>{`${e.label} (${e.count})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(e.label, checked)}
          disabled={disabled}
        />
      </MenuItem>
    )
  })

  if (!data && loading) {
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

export default PopupResultsEntered
