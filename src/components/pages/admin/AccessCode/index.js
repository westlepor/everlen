import React, { useContext } from "react"
import { navigate } from "gatsby"

import Banner from "components/common/banner"
import { checkExpire, logout } from "components/auth/login"
import { queryOptions } from "utils/helper"

import { SessionContext, AnonymousUser } from "contexts/session"
import { AccessCodeProvider } from "contexts/accessCode"
import { DEFAULT_REDIRECT } from "utils/constants"

import { useAccessCodes, useVariables, useSuperAdmin } from "../../../../hooks"

import AccessCodesPageHeader from "./AccessCodesPageHeader"
import AccessCodesTable from "./AccessCodesTable"

const AccessCode = () => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)
  const queryOpt = queryOptions(user)

  const { data, loading } = useAccessCodes({
    ...queryOpt,
    variables: useVariables(user, targetUser),
    skip: isEverlywellSuperAdmin && !targetRole,
  })

  if (checkExpire(user.idToken.idToken)) {
    logout(() => {
      session.setUser(AnonymousUser)
      navigate(DEFAULT_REDIRECT)
    })

    return null
  }

  return (
    <div>
      {process.env.MAINTENANCE_MESSAGE && (
        <Banner text={process.env.MAINTENANCE_MESSAGE} />
      )}

      <AccessCodesPageHeader user={user} targetUser={targetUser} />

      <AccessCodeProvider>
        <AccessCodesTable
          data={data}
          loading={loading}
          user={user}
          isSuperAdmin={isEverlywellSuperAdmin}
          queryOptions={queryOpt}
        />
      </AccessCodeProvider>
    </div>
  )
}

export default AccessCode
