import React, { useContext } from "react"
import { Link, navigate } from "gatsby"

import { DEFAULT_REDIRECT, URL } from "utils/constants"

import { SessionContext, AnonymousUser } from "contexts/session"

import { logout } from "components/auth/login"

export default function NavBar() {
  const session = useContext(SessionContext)
  const { user } = session
  let greetingMessage = ""
  if (user.isLoggedIn) {
    greetingMessage = `Hello ${user.name}`
  } else {
    greetingMessage = "You are not logged in"
  }
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {` `}
        <Link to={URL.settings}>Profile</Link>
        {` `}
        {user.isLoggedIn ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => {
                session.setUser(AnonymousUser)
                navigate(DEFAULT_REDIRECT)
              })
            }}
          >
            Logout
          </a>
        ) : null}
      </nav>
      <span>{greetingMessage}</span>
    </div>
  )
}
