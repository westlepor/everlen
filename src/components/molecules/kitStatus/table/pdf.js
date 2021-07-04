import React, { useState, useContext } from "react"
import { useLazyQuery } from "react-apollo"
import { toast } from "react-toastify"

import KitStatusTable from "components/molecules/kitStatus/table/main"
import { displayError } from "components/molecules/common/popup/toast"
import Toast from "components/common/Toast"

import { TableContext } from "contexts/table"
import { SessionContext } from "contexts/session"

import { queryOptions } from "utils/helper"
import { generatePdf } from "utils/pdf"
import {
  ERROR_TYPE,
  ERROR_CONTENT,
  ROW_MENUS,
  TOAST_MSG,
  TOAST_DESC,
} from "utils/constants"

import GET_KSPDF from "queries/kitStatus/getPdf.gql"

/**
 * Component
 */
const PdfDownloader = ({ setIsLoading, maxRows }) => {
  const session = useContext(SessionContext)
  const tableContext = useContext(TableContext)
  const { user } = session
  const [pdfDetailId, setPdfDetailId] = useState(0)
  const [checkPdf, setCheckPdf] = useState(false)

  // download PDF data for a detailId (it's lazy load run by getPdfData)
  const [getPdfData, { data: dataPdf, error: errorPdf }] = useLazyQuery(
    GET_KSPDF,
    {
      ...queryOptions(user),
      variables: {
        id: pdfDetailId,
      },
    }
  )

  /**
   * Download PDF for a detail
   */
  const downloadPdf = detailId => {
    setCheckPdf(true)
    setPdfDetailId(detailId)
    getPdfData()
  }
  if (errorPdf && checkPdf) {
    setCheckPdf(false)
  }
  if (dataPdf && pdfDetailId && checkPdf) {
    if (dataPdf.kit_results && dataPdf.kit_results.length) {
      const data = dataPdf.kit_results[0]
      if (data.raw_results) {
        generatePdf(data.raw_results, data.barcode.serial_number)
        setPdfDetailId(0)
        toast(
          <Toast
            message={TOAST_MSG.PDF_DOWNLOADED}
            description={TOAST_DESC.PDF_DOWNLOADING}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "success",
            autoClose: 4000,
          }
        )
      } else {
        displayError(ERROR_TYPE.DOWNLOAD, ERROR_CONTENT.NO_RESULT)
        setCheckPdf(false)
      }
    }
  }

  const menus = [
    {
      label: ROW_MENUS.DETAILS,
      handler: (detailId, isPdfExist) => {
        tableContext.setTable({ openDetailView: true, detailId, isPdfExist })
      },
    },
    {
      label: ROW_MENUS.PDF,
      handler: detailId => {
        downloadPdf(detailId)
      },
    },
  ]

  return (
    <KitStatusTable
      setIsLoading={setIsLoading}
      menus={menus}
      maxRowCount={maxRows}
    />
  )
}

export default PdfDownloader
