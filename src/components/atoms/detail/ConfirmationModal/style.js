import styled from "styled-components"

import { colors, size, Button } from "@everlywell/leaves"

const Trigger = styled.div`
  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  text-align: center;
  color: ${colors.green5};
  cursor: pointer;

  :hover {
    border: solid 1px ${colors.green4};
    background-color: #f7fbf9;
  }
`

const Tooltip = styled.div`
  font-size: 14px;
  line-height: 1.57;
  text-align: center;
  color: ${colors.white};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${size.xl2}px ${size.xl1}px ${size.xl3}px;
`

const Question = styled.div`
  font-size: 32.4px;
  line-height: 1.23;
  letter-spacing: 0.56px;
  text-align: center;
  color: ${colors.teal6};
  margin-bottom: ${size.lg}px;
`

const Description = styled.div`
  font-size: 18px;
  line-height: 1.78;
  text-align: center;
  color: ${colors.gray4};
  margin-bottom: ${size.xl1}px;
`

const NoButton = styled(Button)`
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.3px;
  margin-bottom: ${size.md}px;
`

const YesButton = styled(Button)`
  width: 248px;
  font-weight: 500;
  letter-spacing: 0.3px;
`

export {
  Trigger,
  Tooltip,
  Container,
  Question,
  Description,
  NoButton,
  YesButton,
}
