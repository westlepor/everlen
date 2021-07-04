import React, { useContext, useState, useEffect, useCallback } from "react"

import {
  useUpdateUserColumnPreferenceMutation,
  useSuperAdmin,
  useHasuraClaims,
} from "hooks"

import { SessionContext } from "contexts/session"
import { TableContext } from "contexts/table"

import { DISABLED_COLUMNS } from "utils/constants"

import ManageColumnsSelector from "components/molecules/ManageColumnsSelector"

const ManageColumnsSelectorWrapper = () => {
  const { user, targetUser, hasClients } = useContext(SessionContext)
  const { columns, updateColumnVisibility } = useContext(TableContext)

  const [isUpdatePending, setPendingUpdate] = useState(false)

  const { isMasqueradeMode } = useSuperAdmin(user, targetUser)
  const { canViewRapidTests, faunaId } = useHasuraClaims(user)

  const [triggerUpdate] = useUpdateUserColumnPreferenceMutation({
    user,
    columns,
  })

  useEffect(() => {
    if (isUpdatePending) {
      !!faunaId && triggerUpdate()

      setPendingUpdate(false)
    }
    // eslint-disable-next-line
  }, [isUpdatePending])

  const handleChange = useCallback(({ column, isChecked }) => {
    updateColumnVisibility(prev => {
      setPendingUpdate(true)

      return { ...prev, [column]: isChecked }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <ManageColumnsSelector
      isDisabled={isMasqueradeMode}
      canViewClientColumn={hasClients}
      canViewRapidTests={canViewRapidTests}
      columns={columns}
      disabledColumns={DISABLED_COLUMNS}
      onChange={handleChange}
    />
  )
}

export default ManageColumnsSelectorWrapper
