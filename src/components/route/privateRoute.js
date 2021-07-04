import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"

import { SessionContext, setRedirect, AnonymousUser } from "contexts/session"

import { DEFAULT_REDIRECT, URL } from "utils/constants"
import { checkExpire, logout } from "components/auth/login"

const getDetailId = url => {
  const id = url.replace(URL.kitStatus + "/", "")
  return id
}

const PrivateComponent = ({ component: Component, ...rest }) => {
  const session = useContext(SessionContext)
  const { user } = session
  if (checkExpire(user.idToken.idToken)) {
    logout(() => {
      session.setUser(AnonymousUser)
      navigate(DEFAULT_REDIRECT)
    })
    return null
  }
  return <Component {...rest} />
}

const PrivateRoute = ({ location, ...rest }) => {
  const session = useContext(SessionContext)
  const { user, setUser } = session

  useEffect(() => {
    if (!user.isLoggedIn && location.pathname !== URL.login) {
      navigate(URL.login)
    } else if (checkExpire(user.idToken.idToken)) {
      logout(() => {
        setUser(AnonymousUser)
        navigate(DEFAULT_REDIRECT)
      })
    }
    // for redirecting to the previous visited URL after login
    setRedirect(location.pathname)
  }, [location, user, setUser])

  if (!user.isLoggedIn && location.pathname !== URL.login) {
    return null
  }

  const detailId = getDetailId(location.pathname)
  if (detailId) {
    return <PrivateComponent {...rest} detailId={detailId} />
  } else {
    return <PrivateComponent {...rest} />
  }
}
export default PrivateRoute
