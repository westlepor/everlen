import styled from "styled-components"

import { size } from "@everlywell/leaves"

const Status = styled.div`
  color: ${props => props.textColor};
  font-size: 14px;

  :before {
    content: " ";
    display: inline-block;
    margin-right: ${size.xs2}px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${props => props.circleColor};
  }
`

export { Status }
