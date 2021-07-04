import React, { useState } from "react"
import { navigate } from "gatsby"

import { useOptInList } from "../../../../../hooks"

import PopupMenu from "components/molecules/common/popup/popup"

import {
  getOptInCsvHeaders,
  getOptInCsvRow,
  getStringifiedRows,
} from "utils/csv"

const Menu = ({ code, queryOptions }) => {
  const [isDownloadable, setDownloadable] = useState(false)

  const [getOptInList, { data: optInData }] = useOptInList({
    ...queryOptions,
    variables: { code },
  })

  if (optInData && isDownloadable) {
    let csvContent = "data:text/csv;charset=utf-8," + getOptInCsvHeaders()
    let rows = optInData.spree_orders.map(e => getOptInCsvRow(e))

    // wrap data with quote
    getStringifiedRows(rows).then(results => {
      const encodedUri = encodeURI(csvContent + results)
      const link = document.createElement("a")

      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "access-code.csv")
      document.body.appendChild(link)
      link.click()
      setDownloadable(false)
    })

    setDownloadable(false)
  }

  const list = [
    {
      label: "Edit Access Code",
      handler: () => {
        navigate(`/app/edit-access-code/${code}`)
      },
    },
    {
      label: "Download Opt In List",
      handler: () => {
        setDownloadable(true)
        getOptInList()
      },
    },
  ]

  return <PopupMenu list={list} />
}

export default Menu
