import React from "react"
import styled from "styled-components"
import UserProfile from "components/molecules/settings/profile/userProfile"
import LoginInfo from "components/molecules/settings/profile/loginInfo"

/**
 * Styled Components
 */
const Container = styled.div``

/**
 * Main Component
 */
const Profile = () => {
  return (
    <Container>
      <UserProfile />
      <LoginInfo />
    </Container>
  )
}

export default Profile
