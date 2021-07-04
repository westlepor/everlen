import React, { useContext } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { colors } from "@everlywell/leaves"
import { SessionContext, AnonymousUser } from "contexts/session"
import { DEFAULT_REDIRECT, SETTINGS_FRAGMENT } from "utils/constants"
import { logout } from "components/auth/login"
import Image from "components/common/image"

/**
 * Styled Components
 */
const Container = styled.div``

const MenuItem = styled.div`
  color: ${colors.green5};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 23px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid ${colors.red2};
  margin-right: 8px;
`

const ImageView = styled.div`
  margin: auto 8px auto 0;
  width: 24px;
`

/**
 * Main Component
 */
const Menu = ({ fragment, showFragment }) => {
  const session = useContext(SessionContext)
  return (
    <Container>
      <MenuItem onClick={() => showFragment(SETTINGS_FRAGMENT.Profile)}>
        {fragment === SETTINGS_FRAGMENT.Profile && <Arrow />}
        <div>Profile Details</div>
      </MenuItem>
      <MenuItem onClick={() => showFragment(SETTINGS_FRAGMENT.Notifications)}>
        {fragment === SETTINGS_FRAGMENT.Notifications && <Arrow />}
        <div>Notifications</div>
      </MenuItem>
      <MenuItem
        onClick={event => {
          event.preventDefault()
          logout(() => {
            session.setUser(AnonymousUser)
            navigate(DEFAULT_REDIRECT)
          })
        }}
        style={{ marginTop: "30px" }}
      >
        <ImageView>
          <Image imgId="logOutIcon" />
        </ImageView>
        <div>Log Out</div>
      </MenuItem>
    </Container>
  )
}

export default Menu
