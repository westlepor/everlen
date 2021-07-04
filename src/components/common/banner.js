import React from "react"
import styled from "styled-components"
import { colors } from "@everlywell/leaves"
import { fonts } from "utils/styles"

const Container = styled.div`
  display: flex;
`

const Message = styled.span`
  width: 500px;
  border: 1px solid ${colors.red3};
  color: ${colors.gray4};
  margin: 10px auto;
  padding: 10px 36px;
  font-family: ${fonts.normal};
  font-size: 14.2px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
`

const Banner = ({ text }) => {
  return (
    <Container>
      <Message>{text}</Message>
    </Container>
  )
}

export default Banner
