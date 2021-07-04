import React, { useState } from "react"

import Checkbox from "components/atoms/check"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"

import Popup from "./popup"

const PopupNormal = ({ open, handleOpen, data, column }) => {
  const { filterValue, setFilter, preFilteredRows, id } = column
  const filters = filterValue || []

  const [selectFilters, setSelectFilters] = useState(filters)

  const options = React.useMemo(() => {
    const options = new Set()

    data.forEach(row => {
      let option = ""

      if (id === "Client") {
        option = row.enterprise_client?.name
      } else {
        option = row[id]
      }

      if (option) {
        options.add(option)
      } else {
        options.add("none")
      }
    })

    return [...options.values()].filter(Boolean).map(option => ({
      name: option,
      count: (
        preFilteredRows?.filter(row => {
          if (option === "none" && !row.values[id]) {
            return true
          } else {
            return row.values[id] === option
          }
        }) || []
      ).length,
    }))
  }, [id, preFilteredRows, data])

  // handler for select filter
  const doSelectFilter = (value, checked) => {
    let newFilters = []
    if (checked) {
      if (!selectFilters.includes(value)) {
        newFilters = [...selectFilters, value]
      }
    } else {
      newFilters = selectFilters.filter(f => f !== value)
    }

    setSelectFilters(newFilters)
  }

  // item for every status with check, disabled and onChange handler
  const menus = options.map((s, i) => {
    const checked = selectFilters?.includes(s.name)
    const disabled = s.count ? false : true

    return (
      <MenuItem key={i}>
        <MenuLabel>{`${s.name} (${s.count})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(s.name, checked)}
          disabled={disabled}
        />
      </MenuItem>
    )
  })

  const onApply = () => setFilter(selectFilters)

  const onReset = () => {
    setFilter([])
    setSelectFilters([])
  }

  const onOpen = () => {
    if (!filterValue && selectFilters.length > 0) {
      setSelectFilters([])
    }

    handleOpen && handleOpen(true)
  }

  const onClose = () => {
    handleOpen && handleOpen(false)
  }

  return (
    <Popup
      column={column}
      open={open}
      menus={menus}
      onApply={onApply}
      onReset={onReset}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupNormal
