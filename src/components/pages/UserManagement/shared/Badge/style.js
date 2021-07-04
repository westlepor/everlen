import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

const Badge = styled.div`
  max-width: ${props => props.maxWidth}px;
  padding: ${size.xs2}px 6px;
  color: #004f51;
  background: ${colors.teal1};
  border-radius: 10px;
  font-size: 12.6px;
  letter-spacing: 0.21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`

export { Badge }
