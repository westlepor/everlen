import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const Container = styled.div`
  padding-bottom: 48px;
  border-bottom: 1px solid ${colors.gray2};
`
const Title = styled.div`
  color: ${colors.teal6};
  font-size: 22.8px;
  line-height: 1.4;
  letter-spacing: 1px;
`

const Details = styled.div`
  margin-top: 24px;
`

const Detail = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0px;
  }
`

const Label = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
  color: #2d2d2d;
  margin-bottom: 4px;
`

const Value = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${colors.gray4};
`

export { Container, Title, Details, Detail, Label, Value }
