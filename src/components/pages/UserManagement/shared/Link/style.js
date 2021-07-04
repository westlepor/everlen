import styled from "styled-components"
import { Link as BaseLink } from "gatsby"

import { colors } from "@everlywell/leaves"

const Wrapper = styled.div`
  max-width: ${props => props.maxWidth}px;
  display: inline-block;
`

const Link = styled(BaseLink)`
  padding: 5px 6px 0;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.green6};
  display: inline-block;
  max-width: ${props => props.maxWidth}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export { Wrapper, Link }
