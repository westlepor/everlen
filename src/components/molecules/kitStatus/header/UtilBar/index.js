import React, { useContext } from "react"
import { useQuery } from "react-apollo"

import SearchBox from "components/molecules/kitStatus/header/Search"

import { TableContext } from "contexts/table"
import { SessionContext } from "contexts/session"

import {
  TABLE_MAX_ROWS,
  TABLE_PAGER_COUNT,
  DEFAULT_SEARCH_COLUMNS,
} from "utils/constants"
import { parseKitResults } from "utils/parseTableData"
import { queryOptions, getLastNameSearchText } from "utils/helper"

import GET_KSPSR from "queries/kitStatus/getPreSearchResults"
import { useSuperAdmin, useHasuraClaims } from "hooks"

import ManageColumnsSelectorWrapper from "./ManageColumnsSelectorWrapper"

import * as S from "./style"

export default ({ isLoading, maxRows, setMaxRows }) => {
  const session = useContext(SessionContext)
  const tableContext = useContext(TableContext)
  const { preSearchText } = tableContext
  const { user, targetUser } = session
  const { isHCPAdmin, canViewRapidTests, rapidTestId } = useHasuraClaims(user)
  const {
    isTargetUserHCPAdmin,
    isEverlywellSuperAdmin,
    targetPartnerId,
    targetClientIds,
    targetRole,
  } = useSuperAdmin(user, targetUser)

  const getParameters = () => {
    if (isEverlywellSuperAdmin && targetClientIds) {
      return {
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        client_ids: targetClientIds,
      }
    } else if (isEverlywellSuperAdmin && targetPartnerId) {
      return {
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        partner_id: targetPartnerId,
      }
    } else {
      return { isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin, rapidTestId }
    }
  }

  const getVariables = () => {
    if (isEverlywellSuperAdmin && targetClientIds) {
      return {
        offset: 0,
        limit: TABLE_MAX_ROWS * TABLE_PAGER_COUNT,
        search_text: preSearchText
          ? `%${preSearchText.replace(/[-]/g, "")}%`
          : "",
        last_name_search: getLastNameSearchText(preSearchText),
        client_ids: targetClientIds,
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        shouldFetchRapidTests:
          isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
      }
    } else if (isEverlywellSuperAdmin && targetPartnerId) {
      return {
        offset: 0,
        limit: TABLE_MAX_ROWS * TABLE_PAGER_COUNT,
        search_text: preSearchText
          ? `%${preSearchText.replace(/[-]/g, "")}%`
          : "",
        last_name_search: getLastNameSearchText(preSearchText),
        partner_id: targetPartnerId,
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        shouldFetchRapidTests:
          isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
      }
    } else {
      return {
        offset: 0,
        limit: TABLE_MAX_ROWS * TABLE_PAGER_COUNT,
        search_text: preSearchText
          ? `%${preSearchText.replace(/[-]/g, "")}%`
          : "",
        last_name_search: getLastNameSearchText(preSearchText),
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        shouldFetchRapidTests:
          isHCPAdmin || isTargetUserHCPAdmin || canViewRapidTests,
      }
    }
  }

  const { loading, data } = useQuery(GET_KSPSR(getParameters()), {
    ...queryOptions(user),
    variables: getVariables(),
    skip: isEverlywellSuperAdmin && !targetRole,
  })

  let preSearchData = null

  if (data) {
    preSearchData = parseKitResults({
      data,
      columns: DEFAULT_SEARCH_COLUMNS,
      isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
      canViewRapidTests,
    })
  }

  return (
    <S.Root>
      {isLoading && (
        <>
          <S.SearchSkeleton />
          <S.RightButtons>
            <S.PageSkeleton />

            {!isHCPAdmin && !isTargetUserHCPAdmin && <S.ManageColumnSkeleton />}
          </S.RightButtons>
        </>
      )}

      {!isLoading && (
        <>
          <SearchBox
            placeholder="Search by Kit ID or Participant Name"
            data={preSearchData}
            isSearchLoading={loading}
          />
          <S.RightButtons>
            <S.PageSelector
              isLoading={isLoading}
              maxRows={maxRows}
              setMaxRows={setMaxRows}
            />

            {!isHCPAdmin && !isTargetUserHCPAdmin && (
              <ManageColumnsSelectorWrapper />
            )}
          </S.RightButtons>
        </>
      )}
    </S.Root>
  )
}
