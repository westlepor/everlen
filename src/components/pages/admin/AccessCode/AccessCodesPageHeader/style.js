import styled from "styled-components"

import { colors, H3, size, Button } from "@everlywell/leaves"

const Title = styled(H3)`
  font-size: 32.4px;
  font-weight: normal;
  line-height: 1.23;
  letter-spacing: 0.56px;
  color: ${colors.teal6};
  margin: 0;
`

const OuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 45px 0 2.062rem;
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin: 0;
  }

  button {
    margin-left: ${size.xl1}px;
  }
`

const StyledButton = styled(Button)`
  font-weight: 500;
  margin-left: ${size.xl2}px;
`

export { Title, OuterWrapper, InnerWrapper, StyledButton }
