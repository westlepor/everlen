import React, { useContext } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import ClientLoader from "components/molecules/kitStatus/table/client"

import { checkExpire, logout } from "components/auth/login"

import { SessionContext, AnonymousUser } from "contexts/session"
import { DEFAULT_REDIRECT } from "utils/constants"

import Banner from "components/common/banner"
/**
 * Styled Components
 */
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 49px;
  margin: auto;
  max-width: 120rem;
`

/**
 * Main Component
 */
const KitStatus = () => {
  const session = useContext(SessionContext)
  const { user } = session
  if (checkExpire(user.idToken.idToken)) {
    logout(() => {
      session.setUser(AnonymousUser)
      navigate(DEFAULT_REDIRECT)
    })
    return null
  }
  return (
    <StyledContainer>
      {process.env.MAINTENANCE_MESSAGE && (
        <Banner text={process.env.MAINTENANCE_MESSAGE} />
      )}
      <ClientLoader />
    </StyledContainer>
  )
}

export default KitStatus
