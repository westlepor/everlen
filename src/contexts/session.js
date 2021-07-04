import React, { useState } from "react"
import { isBrowser } from "utils/environment"
import { STORAGE_REDIRECT, DEFAULT_REDIRECT } from "utils/constants"

/** The only LoggedOutUser, the AnonymousUser */
export const AnonymousUser = {
  isLoggedIn: false,
  name: "",
  email: "",
  idToken: {},
}

export const DefaultTargetUser = {
  email: null,
  role: null,
  enterprise_partner_id: null,
  enterprise_client_ids: [],
  access_code_manager: "false",
  can_register_kits: "false",
  getstream_token: null,
  fauna_id: null,
}

export const SessionContext = React.createContext({
  isLoading: true,
  user: AnonymousUser,
  clients: [],
  isLoadedClients: undefined,
  targetUser: DefaultTargetUser,
  setUser: () => {},
  setClients: () => {},
  setLoadedClients: () => {},
  setTargetUser: () => {},
})

/**
 * The SessionProvider maintains user authentication state and provides it to the app
 * via the context API. Auth0-related functions are proxied to the Auth service singleton.
 */
export const SessionProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState({
    isLoading: true,
    user: AnonymousUser,
    isLoadedClients: false,
    clients: [],
    targetUser: DefaultTargetUser,
  })

  const setUser = user => {
    setSessionState({ ...sessionState, isLoading: false, user })
  }

  const hasClients =
    sessionState.isLoadedClients && sessionState.clients.length > 0

  const setClients = clients => {
    setSessionState({
      ...sessionState,
      isLoadedClients: true,
      clients,
    })
  }

  const setLoadedClients = isLoadedClients => {
    setSessionState({ ...sessionState, isLoadedClients })
  }

  const setTargetUser = targetUser => {
    setSessionState({ ...sessionState, targetUser })
  }

  return (
    <SessionContext.Provider
      value={{
        ...sessionState,
        hasClients,
        setUser,
        setClients,
        setLoadedClients,
        setTargetUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const setRedirect = redirect => {
  if (isBrowser) {
    window.localStorage.setItem(STORAGE_REDIRECT, redirect)
  }
}

export const getRedirect = () => {
  if (isBrowser) {
    return window.localStorage.getItem(STORAGE_REDIRECT) || DEFAULT_REDIRECT
  }
  return "/"
}
