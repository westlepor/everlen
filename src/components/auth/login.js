import React, { useState, useEffect, useContext } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import OktaSignIn from "@okta/okta-signin-widget"

import { colors } from "@everlywell/leaves"

import { DEFAULT_REDIRECT } from "utils/constants"

import { SessionContext, setRedirect, getRedirect } from "contexts/session"

import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"

import Spinner from "components/atoms/common/spinner"

import Banner from "components/common/banner"

const Div = styled.div`
  display: flex;
  justify-content: center;
`

const config = {
  baseUrl: `${process.env.GATSBY_OKTA_BASE_URL}`,
  clientId: `${process.env.GATSBY_OKTA_CLIENT_ID}`,
  logo: `${process.env.GATSBY_OKTA_LOGO_URL}`,
  redirectUri:
    typeof window !== "undefined" && window.location.origin + DEFAULT_REDIRECT,
  el: "#signIn",
  authParams: {
    issuer:
      process.env.GATSBY_OKTA_BASE_URL + process.env.GATSBY_OKTA_AUTH_SERVER,
    pkce: true,
    responseType: ["token", "id_token"],
    display: "page",
  },
  colors: {
    brand: colors.green5,
  },
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    en: {
      "primaryauth.title": "Sign In", // Changes the sign in text
      "primaryauth.submit": "Log In",
      needhelp: "Need help logging in?",
      remember: "Remember Me",
      "errors.E0000004": "Unable to log in",
    },
  },
}

export const signIn = typeof window !== "undefined" && new OktaSignIn(config)

const Login = () => {
  const session = useContext(SessionContext)
  const [isTokenLoading, setTokenLoading] = useState(false)

  const authenticate = () => {
    const authClient = signIn.authClient

    authClient.session
      .get()
      .then(s => {
        // Session exists, show logged in state.
        if (s.status === "ACTIVE") {
          // clear parameters from browser window
          window.location.hash = ""
          // show loading while getting token
          setTokenLoading(true)
          // get access and ID tokens
          authClient.token
            .getWithoutPrompt({
              scopes: ["openid", "email", "profile"],
            })
            .then(tokens => {
              tokens.forEach(token => {
                if (token.idToken) {
                  authClient.tokenManager.add("idToken", token)
                }
                if (token.accessToken) {
                  authClient.tokenManager.add("accessToken", token)
                }
              })
              // Say hello to the person who just signed in
              authClient.tokenManager.get("idToken").then(idToken => {
                session.setUser({
                  isLoggedIn: true,
                  name: idToken.claims.name,
                  email: idToken.claims.email,
                  idToken: idToken,
                })
                // redirect to the previous visited URL after login
                navigate(getRedirect())
              })
            })
            .catch(console.log)
          return
        }

        signIn.renderEl({ el: "#signIn" })

        // disable login button when maintenance
        if (process.env.MAINTENANCE_MESSAGE) {
          setTimeout(() => {
            const loginButton = document.getElementById("okta-signin-submit")

            if (loginButton) {
              loginButton.setAttribute("disabled", "")
              loginButton.style.backgroundColor = "#aaa9ac"
              loginButton.style.borderColor = "#444850"
            }
          }, 100)
        }
      })
      .catch(error => console.log(error))

    // cleanup function
    return () => {
      signIn && signIn.remove({ el: "#signIn" })
    }
  }

  const useMountEffect = f => useEffect(f, [])

  // make sure useEffect runs only once without deps warning
  useMountEffect(authenticate)

  if (isTokenLoading) return <Spinner />

  return (
    <>
      {process.env.MAINTENANCE_MESSAGE && (
        <Banner text={process.env.MAINTENANCE_MESSAGE} />
      )}
      <Div id="signIn" />
    </>
  )
}

export const logout = callback => {
  signIn.authClient
    .signOut()
    .catch(error => {
      console.error("Sign out error: " + error)
    })
    .then(() => {
      // we should set redirect to the default like `/app/account`
      // because even though we go to /app/account after logout,
      // there `/app/account` isn't saved to localStorage to allow others
      setRedirect(DEFAULT_REDIRECT)
      callback()
    })
}

export const checkExpire = token => {
  const jwt = require("jsonwebtoken")
  let isExpired = false
  const decodedToken = jwt.decode(token, { complete: true })
  const dateNow = Math.floor(new Date().getTime() / 1000)
  if (decodedToken.payload.exp < dateNow) {
    isExpired = true
  }
  return isExpired
}

export default Login
