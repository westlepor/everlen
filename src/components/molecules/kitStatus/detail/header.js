import React, { useContext } from "react"
import { useLazyQuery } from "react-apollo"

import { navigate } from "gatsby-link/index"

import * as S from "./style"

import ModalCloseIcon from "components/atoms/icons/modalClose"
import ArrowLeftIcon from "components/atoms/icons/arrowLeft"
import KitStatusMark from "components/atoms/kitStatus/mark"
import CLIAWaiverWarning from "components/molecules/cliaWaiver/detail/CLIAWaiverWarning"

import { displayError } from "components/molecules/common/popup/toast"

import { SessionContext } from "contexts/session"
import { TableContext } from "contexts/table"

import { generatePdf } from "utils/pdf"
import { queryOptions, formatKitID } from "utils/helper"
import { parseResult } from "utils/parseTableData"
import { ERROR_TYPE, ERROR_CONTENT, URL } from "utils/constants"

import GET_KSPDF from "queries/kitStatus/getPdf.gql"

import { useHasuraClaims, useSuperAdmin, useTestKitDetails } from "hooks"

const DetailHeader = ({
  detail,
  standalone,
  updateIsSettingResultsEntered,
  updateIsSettingCollectedAt,
  kitResultId,
  setResultsEntered,
}) => {
  const { user, targetUser } = useContext(SessionContext)
  const { setTable, retryingResultsEntered } = useContext(TableContext)

  const data = detail.data
  const pdfDetailId = data.id

  const { isResultApproved, isResultEntered } = useTestKitDetails(data)
  const { isHCPAdmin } = useHasuraClaims(user)
  const { isTargetUserHCPAdmin } = useSuperAdmin(user, targetUser)

  // download PDF data for a detailId (it's lazy load run by triggerDownload)
  const [triggerDownload, { data: dataPdf }] = useLazyQuery(GET_KSPDF, {
    ...queryOptions(user),
    variables: {
      id: pdfDetailId,
    },
  })

  const handleBackBtn = () => {
    if (standalone) {
      navigate(URL.kitStatus)
    } else {
      updateIsSettingResultsEntered(false)
      setResultsEntered(undefined)
      updateIsSettingCollectedAt(false)
      retryingResultsEntered.delete(kitResultId)
      setTable({
        openDetailView: false,
        isPdfExist: false,
        retryingResultsEntered,
      })
    }
  }

  if (dataPdf) {
    if (dataPdf.kit_results && dataPdf.kit_results.length) {
      const data = dataPdf.kit_results[0]
      if (data.raw_results) {
        generatePdf(data.raw_results, data.barcode.serial_number)
      } else {
        displayError(ERROR_TYPE.DOWNLOAD, ERROR_CONTENT.NO_RESULT)
      }
    } else {
      displayError(ERROR_TYPE.NETWORK, ERROR_CONTENT.PDF)
    }
  }

  let result = parseResult(data)

  if (!result) {
    result = data.status
  }

  const isPDFDownloadDisabled = !isResultApproved

  return (
    <S.Header>
      <S.BackButton>
        {standalone ? (
          <S.BackArrowLink onClick={handleBackBtn}>
            <ArrowLeftIcon />
            <S.BackButtonText>Back</S.BackButtonText>
          </S.BackArrowLink>
        ) : (
          <S.CloseArrowLink data-cy="close-detail" onClick={handleBackBtn}>
            <ModalCloseIcon />
          </S.CloseArrowLink>
        )}
      </S.BackButton>
      <S.KitIDLabel>KIT ID</S.KitIDLabel>
      <S.HeaderContainer>
        <S.KitIDValue>
          {formatKitID(
            data.barcode.serial_number,
            data.barcode.fulfillment_provider.name
          )}
        </S.KitIDValue>

        <S.DesktopPDFButton
          appearance="secondary"
          isDisabled={isPDFDownloadDisabled}
          onClick={triggerDownload}
        >
          Download Result PDF
        </S.DesktopPDFButton>
      </S.HeaderContainer>
      <S.HeaderRow>
        <KitStatusMark status={result} />

        <S.MobilePDFButton
          appearance="secondary"
          isDisabled={isPDFDownloadDisabled}
          onClick={triggerDownload}
        >
          Download Result PDF
        </S.MobilePDFButton>
      </S.HeaderRow>

      {(isHCPAdmin || isTargetUserHCPAdmin) && !isResultEntered && (
        <CLIAWaiverWarning />
      )}
    </S.Header>
  )
}

export default DetailHeader
