import React from "react"
import styled from "styled-components"
import { colors } from "@everlywell/leaves"
import NotifyRow from "components/molecules/settings/notifications/notifyRow"
import Switch from "components/atoms/settings/followSwitch"

/**
 * Styled Components
 */
const Container = styled.div`
  padding-bottom: 48px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  color: ${colors.teal6};
  font-size: 23px;
  width: 70%;
  margin-bottom: 25px;
`

/**
 * Main Component
 */
const UserProfile = () => {
  return (
    <Container>
      <Row>
        <Title>In App Notifications</Title>
      </Row>
      <NotifyRow
        label="Immediately notify me of results needing review"
        style={{ marginBottom: "31px" }}
        switchComponent={<Switch targetType="abnormal_result" />}
      />
      <NotifyRow
        label="Immediately notify me of sample issues"
        switchComponent={<Switch targetType="sample_issues" />}
      />
    </Container>
  )
}

export default UserProfile
