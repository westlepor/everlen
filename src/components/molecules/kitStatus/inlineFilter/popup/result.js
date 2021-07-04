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

import { useSuperAdmin, useResultCount } from "hooks"

const PopupResult = ({ handleOpen, sorted }) => {
  const { user, targetUser } = useContext(SessionContext)

  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)
  const { filterResult, setTable } = useContext(TableContext)

  const { open } = useContext(PopupContext)

  const popupOpen = open === Field.result.name

  const [filters, setFilters] = useState(
    filterResult.map(e => {
      return { result: e, value: true }
    })
  )

  const doFilter = () => {
    const selectedFilters = filters.reduce((acc, next) => {
      if (next.value) {
        acc.push(next.result)
      }

      return acc
    }, [])

    setTable({
      filterResult: selectedFilters,
      currentPage: 0,
    })
  }

  const doReset = () => {
    setTable({ filterResult: [] })
  }

  const doSelectFilter = (result, checked) => {
    const isExist = filters.findIndex(e => e.result === result) > -1

    let changedFilters = [...filters]

    if (!isExist) {
      changedFilters.push({ result: result, value: checked })
    } else {
      changedFilters = filters.reduce((acc, next) => {
        if (next.result === result) {
          acc.push({ result: next.result, value: checked })
        } else {
          acc.push(next)
        }

        return acc
      }, [])
    }

    setFilters(changedFilters)
  }

  const [getCount, { data, loading }] = useResultCount()

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
      label: "Normal",
      value: "normal",
      count: data?.normal?.aggregate?.count || 0,
    },
    {
      label: "Needs Review",
      value: "needs_review",
      count: data?.needs_review?.aggregate?.count || 0,
    },
  ]

  const menus = list.map((e, i) => {
    const filterState = filters.find(elem => elem.result === e.value)
    const checked = filterState ? filterState.value : false
    const disabled = e.count > 0 ? false : true

    return (
      <MenuItem key={i}>
        <MenuLabel>{`${e.label} (${e.count})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(e.value, checked)}
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
      sorted={sorted}
    />
  )
}

export default PopupResult
