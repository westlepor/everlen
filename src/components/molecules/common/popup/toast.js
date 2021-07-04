import React from "react"
import styled from "styled-components"
import { toast } from "react-toastify"

import { colors } from "@everlywell/leaves"
import { fonts } from "utils/styles"

import AlertIcon from "components/atoms/icons/alertCircle"

const Container = styled.div`
  border-color: ${colors.red3};
  font-size: 16px;
  color: ${colors.gray4};
`
const Row = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.div`
  font-family: ${fonts.bold};
  margin-left: 12px;
`
const Content = styled.div`
  font-family: ${fonts.normal};
  padding: 6px 36px;
  font-weight: 300;
  line-height: 28px;
`

const Toast = ({ title, content }) => {
  return (
    <Container>
      <Row>
        <AlertIcon width={24} height={24} color={colors.red3} />
        <Title>{title}</Title>
      </Row>
      <Content>{content}</Content>
    </Container>
  )
}

export default Toast

export const displayError = (title, content) => {
  toast(<Toast title={title} content={content} />, {
    position: toast.POSITION.TOP_CENTER,
    type: "error",
    autoClose: 4000,
  })
}
