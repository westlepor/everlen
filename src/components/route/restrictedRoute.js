import React, { useContext } from "react"
import { navigate } from "gatsby"

import { SessionContext } from "contexts/session"
import { useHasuraClaims, useSuperAdmin } from "hooks"

import PrivateRoute from "./privateRoute"

const RestrictedRoute = props => {
  const { user, targetUser } = useContext(SessionContext)

  const {
    hasAccessToAdministrationPages,
    hasAccessToRegistrationPages,
  } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    isUserManagementFeatureOn,
    hasTargetAccessToAdministrationPages,
    hasTargetAccessToRegistrationPages,
  } = useSuperAdmin(user, targetUser)

  const adminDenied =
    !hasAccessToAdministrationPages &&
    !hasTargetAccessToAdministrationPages &&
    props.accessType === "admin"

  const registrationDenied =
    !hasAccessToRegistrationPages &&
    !hasTargetAccessToRegistrationPages &&
    props.accessType === "registration"

  const userManagementDenied =
    (isUserManagementFeatureOn || !isEverlywellSuperAdmin) &&
    props.accessType === "user-management"

  if (adminDenied || registrationDenied || userManagementDenied) {
    navigate("/app/kit_status")

    return null
  }

  return <PrivateRoute {...props} />
}

RestrictedRoute.defaultProps = {
  accessType: "admin",
}

export default RestrictedRoute
