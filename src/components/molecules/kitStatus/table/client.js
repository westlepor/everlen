import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"

import Spinner from "components/atoms/common/spinner"
import DetailView from "components/pages/kitStatus/detailView"
import PdfDownloader from "components/molecules/kitStatus/table/pdf"
import TopBar from "components/molecules/kitStatus/header/TopBar"
import UtilBar from "components/molecules/kitStatus/header/UtilBar"

import { SessionContext } from "contexts/session"
import { TableContext } from "contexts/table"

import { TABLE_MAX_ROWS, HASURA_ROLE } from "utils/constants"
import {
  useHasuraClaims,
  useSuperAdmin,
  useLazyClients,
} from "../../../../hooks"

const Row = styled.div`
  display: flex;
`

const ClientLoader = () => {
  const session = useContext(SessionContext)
  const { user, targetUser, isLoadedClients } = session
  const [isLoading, setIsLoading] = useState(false)
  const tableContext = useContext(TableContext)
  const [maxRows, setMaxRows] = useState(TABLE_MAX_ROWS)

  const {
    isEnterprisePartnerClinicalAdmin,
    isEnterpriseClientClinicalAdmin,
  } = useHasuraClaims(user)

  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)

  const handleCompleted = data => {
    if (data?.enterprise_clients) {
      if (
        ((isEnterprisePartnerClinicalAdmin ||
          (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.partner)) &&
          data.enterprise_clients.length > 0) ||
        ((isEnterpriseClientClinicalAdmin ||
          (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.client)) &&
          data.enterprise_clients.length > 1)
      ) {
        session.setClients(data.enterprise_clients)
      } else {
        session.setClients([])
      }
    }
  }

  const handleError = () => {
    session.setClients([])
  }

  const [getClientsData, { loading, called }] = useLazyClients(
    user,
    targetUser,
    handleCompleted,
    handleError
  )

  useEffect(() => {
    if (
      isEnterprisePartnerClinicalAdmin ||
      isEnterpriseClientClinicalAdmin ||
      (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.partner) ||
      (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.client)
    ) {
      if (!isLoadedClients && !called) {
        getClientsData()
      }
    }
  })

  if (!isLoadedClients && called && loading) {
    return <Spinner />
  } else {
    return (
      <>
        <TopBar title="Test Kits" isLoading={isLoading} />
        <UtilBar
          maxRows={maxRows}
          setMaxRows={setMaxRows}
          isLoading={isLoading}
        />
        <Row>
          <PdfDownloader setIsLoading={setIsLoading} maxRows={maxRows} />
          <DetailView
            detailId={tableContext.detailId}
            open={tableContext.openDetailView}
            isPdfExist={tableContext.isPdfExist}
          />
        </Row>
      </>
    )
  }
}

export default ClientLoader
