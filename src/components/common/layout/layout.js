/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { size, mediaQueries } from "@everlywell/leaves"

import NavBar from "components/common/navbar/nav-bar"
import SuperAdmin from "components/common/superAdmin"
import CliaWaiverBanner from "components/molecules/cliaWaiver/header/CliaWaiverBanner"

import { SessionContext } from "contexts/session"
import { CliaWaiverContext } from "contexts/cliaWaiver"
import { useSuperAdmin } from "hooks"

import { fonts } from "utils/styles"

const Div = styled.div`
  font-family: ${fonts.normal};
`
const Container = styled.div`
  margin: 0 74px;

  ${mediaQueries.forPhoneOnly} {
    margin: 0 ${size.lg}px;
  }
`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { user, targetUser } = useContext(SessionContext)
  const { isEverlywellSuperAdmin } = useSuperAdmin(user, targetUser)

  const { hasHCPEnteredCLIAWaiverNumber, cliaWaiverNumber } = useContext(
    CliaWaiverContext
  )

  return (
    <Div>
      {isEverlywellSuperAdmin && <SuperAdmin />}

      <NavBar siteTitle={data.site.siteMetadata.title} />

      <CliaWaiverBanner
        hasHCPEnteredCLIAWaiverNumber={hasHCPEnteredCLIAWaiverNumber}
        cliaWaiverNumber={cliaWaiverNumber}
      />

      <Container>
        <main>{children}</main>
      </Container>
    </Div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
