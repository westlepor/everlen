import React from "react"
import fetch from "cross-fetch"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { ApolloProvider } from "react-apollo"
import { createHttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import * as Sentry from "@sentry/gatsby"

import { displayError } from "components/molecules/common/popup/toast"
import { ERROR_TYPE, ERROR_CONTENT } from "utils/constants"
import { SessionProvider } from "contexts/session"

import cache from "./cache"

const httpLink = createHttpLink({
  uri: process.env.GATSBY_HASURA_BASE_URL,
  fetch,
})

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      // [GraphQL error]: Message: Could not verify JWT: JWTExpired, Location: undefined, Path: undefined
      if (message.includes("JWTExpired")) {
        // hard reloading to enforce re-authorization
        window.location.reload()
      } else {
        const { operationName } = operation

        let exception = new Error(`[GraphQL error]: Message: ${message}`)
        exception.name = operationName

        Sentry.captureException(exception, scope => {
          scope.setContext("Additional Info", {
            message,
            ...operation,
          })

          scope.setLevel(Sentry.Severity.Error)
        })

        if (operationName === "CreateAccessCode") {
          displayError(ERROR_TYPE.ACCESS_CODE, ERROR_CONTENT.CREATE_ACCESS_CODE)
        } else if (operationName === "UpdateAccessCode") {
          displayError(ERROR_TYPE.ACCESS_CODE, ERROR_CONTENT.UPDATE_ACCESS_CODE)
        } else if (operationName === "CreateKitRegistration") {
          displayError(
            ERROR_TYPE.KIT_REGISTRATION,
            ERROR_CONTENT.KIT_REGISTRATION
          )
        } else {
          displayError(ERROR_TYPE.NETWORK, ERROR_CONTENT.NETWORK)
        }
      }

      return null
    })

  if (networkError) {
    let networkException = new Error(`[Network error]: ${networkError}`)
    networkException.name = "Network error"

    Sentry.captureException(networkException, scope => {
      scope.setContext("Additional Info", operation)
      scope.setLevel(Sentry.Severity.Error)
    })

    displayError(ERROR_TYPE.NETWORK, ERROR_CONTENT.NETWORK)
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <SessionProvider>{element}</SessionProvider>
  </ApolloProvider>
)
