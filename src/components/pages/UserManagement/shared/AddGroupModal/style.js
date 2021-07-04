import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const ToastLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
`

const Title = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 1.75;
`

export { ToastLink, Title, Description }
