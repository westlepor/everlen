import React, { useState, useContext, useRef } from "react"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"
import Checkbox from "components/atoms/check"
import GradientScrollable from "components/atoms/common/GradientScrollable"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import Field from "utils/fields"

import { useSuperAdmin, useSampleIssuesCount } from "hooks"

const PopupSampleIssue = ({ handleOpen }) => {
  const { user, targetUser } = useContext(SessionContext)
  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)
  const { filterSampleIssues } = tableContext
  const [filters, setFilters] = useState(filterSampleIssues)
  const popupOpen = open === Field.issue.name

  const doFilter = () => {
    tableContext.setTable({
      filterSampleIssues: [...filters],
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterSampleIssues: [],
    })
  }

  const doSelectFilter = name => {
    let changedFilters = [...filters]
    const findIndex = changedFilters.findIndex(filter => filter === name)

    if (findIndex > -1) {
      for (let i = 0; i < changedFilters.length; i++) {
        if (changedFilters[i] === name) {
          changedFilters.splice(i, 1)
        }
      }
    } else {
      changedFilters.push(name)
    }

    setFilters(changedFilters)
  }

  const [getSampleIssuesCount, { data, loading }] = useSampleIssuesCount()

  const doOpen = () => {
    if (isEverlywellSuperAdmin && !targetRole) {
      return
    }

    getSampleIssuesCount()

    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  let list = data?.issue_groups || []
  list = list
    .map(issue => {
      return {
        name: issue.name,
        count: issue?.issues_aggregate?.aggregate?.count || 0,
      }
    })
    .filter(issue => issue.count !== 0)
    .sort((a, b) => (a.count > b.count ? -1 : 1)) // sort by count

  const lastMenuRef = useRef()

  const menus = list.map((e, i) => {
    const filterState = filters.find(elem => elem === e.name)
    const checked = filterState ? true : false

    const menu = (
      <>
        <MenuLabel>{`${e.name} (${e.count ? e.count : 0})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(e.name, checked)}
        />
      </>
    )

    if (i === list.length - 1) {
      return (
        <MenuItem key={i} ref={lastMenuRef}>
          {menu}
        </MenuItem>
      )
    }

    return <MenuItem key={i}>{menu}</MenuItem>
  })

  if (list.length === 0) {
    return (
      <Popup
        open={popupOpen}
        menus={<MenuLabel>{loading ? "Loading..." : "No Data"}</MenuLabel>}
        onOpen={doOpen}
        onClose={doClose}
        width={282}
      />
    )
  }

  return (
    <Popup
      open={popupOpen}
      menus={<GradientScrollable menus={menus} />}
      onOpen={doOpen}
      onClose={doClose}
      onApply={doFilter}
      onReset={doReset}
      width={282}
      isScrollable={true}
    />
  )
}

export default PopupSampleIssue
