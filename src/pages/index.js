import React, { useContext } from "react"

import Layout from "components/common/layout/layout"
import SEO from "components/common/seo"
import Login from "components/auth/login"

import { SessionContext } from "contexts/session"

import "styles/index.css"
import "styles/calendar.css"

const IndexPage = () => {
  const session = useContext(SessionContext)
  const { user } = session
  return (
    <Layout>
      <SEO title="Home" />
      {!user.isLoggedIn && <Login />}
    </Layout>
  )
}
export default IndexPage
