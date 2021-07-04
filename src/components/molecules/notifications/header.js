import React from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import { fonts } from "utils/styles"

const Div = styled.div`
  color: ${colors.gray5};
  text-align: center;
  padding: 15px 0 10px;
  border-bottom: 2px solid ${colors.green1};
  font-size: 18px;
  font-family: ${fonts.normal};
  line-height: 24px;
`

const NotificationHeader = () => {
  return <Div>Notifications</Div>
}

export default NotificationHeader
