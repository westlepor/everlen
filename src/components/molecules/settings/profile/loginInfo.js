import React, { useContext } from "react"
import styled from "styled-components"

import { colors, size, typography, TertiaryLink } from "@everlywell/leaves"

import { SessionContext } from "contexts/session"

/**
 * Styled Components
 */
const Container = styled.div`
  margin-top: 48px;
`

const Title = styled.div`
  color: ${colors.teal6};
  font-size: 22.8px;
  line-height: 1.4;
  letter-spacing: 1px;
  margin-bottom: 24px;
`

const Label = styled.div`
  color: ${colors.gray5};
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
  margin-bottom: 5px;
`

const Value = styled.div`
  color: ${colors.gray4};
  font-size: 16px;
  line-height: 1.75;
`

const PassLabel = styled(Label)`
  margin-top: ${size.xl3}px;
`

const PasswordResetLink = styled(TertiaryLink)`
  margin-top: ${size.md}px;
  color: ${colors.green5};
`

const EmailWrapper = styled.span`
  ${typography.bodyTextSmall};
  font-weight: ${typography.weight.bold};
`

const RESET_PASSWORD_URL = `${process.env.GATSBY_OKTA_BASE_URL}/enduser/settings`

/**
 * Main Component
 */
const LoginInfo = () => {
  const { user } = useContext(SessionContext)

  return (
    <Container>
      <Title>Log In Credentials</Title>
      <Label>Email Address</Label>
      <Value>
        Your email address is <EmailWrapper>{user?.email}</EmailWrapper>
      </Value>
      <PassLabel>Password</PassLabel>
      <PasswordResetLink href={RESET_PASSWORD_URL} target="_blank">
        Change Password
      </PasswordResetLink>
    </Container>
  )
}

export default LoginInfo
