import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const Container = styled.div`
  padding-top: 48px;
  border-top: 1px solid ${colors.gray2};
`

const Title = styled.div`
  color: ${colors.teal6};
  font-size: 23px;
  width: 70%;
  margin-bottom: 32px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export { Container, Title, Row }
