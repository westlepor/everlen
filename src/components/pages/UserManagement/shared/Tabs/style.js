import styled from "styled-components"
import { Link as BaseLink } from "gatsby"

import { colors } from "@everlywell/leaves"

const Wrapper = styled.div`
  margin: 36px 0;
`

const Link = styled(BaseLink)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
  display: inline-block;
  margin-right: 24px;
  padding-right: 2px;

  ${props =>
    props.isActive &&
    `
     border-bottom: 4px solid ${colors.teal5};
    `};
`

export { Wrapper, Link }
