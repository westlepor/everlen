import React, { useState } from "react"
import styled from "styled-components"

import { Container, H4 } from "@everlywell/leaves"

import Menu from "components/molecules/settings/menu"
import Profile from "components/molecules/settings/profile/profile"
import Notifications from "components/molecules/settings/notifications/notifications"

import { SETTINGS_FRAGMENT } from "utils/constants"

/**
 * Styled Components
 */
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-bottom: 49px;
  width: auto;
  padding: 0;
`

const Title = styled(H4)`
  line-height: 40px;
  height: 40px;
`

const Row = styled.div`
  display: flex;
`

const Panel = styled.div`
  margin-left: 80px;
  flex-grow: 1;
`

/**
 * Main Component
 */
const Settings = () => {
  const [fragment, setFragment] = useState(SETTINGS_FRAGMENT.Profile)
  const showFragment = frag => {
    setFragment(frag)
  }
  return (
    <StyledContainer>
      <Title>Settings</Title>
      <Row>
        <Menu fragment={fragment} showFragment={showFragment} />
        <Panel>
          {fragment === SETTINGS_FRAGMENT.Profile && <Profile />}
          {fragment === SETTINGS_FRAGMENT.Notifications && <Notifications />}
        </Panel>
      </Row>
    </StyledContainer>
  )
}

export default Settings
