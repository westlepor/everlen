import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

const Field = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  margin-top: 6px;
  margin-bottom: 2px;
  ${props => props.focused && `color: ${colors.green6};`}
`

const FieldDivider = styled.div`
  margin-top: 36px;
`

const Devider = styled.div`
  margin-top: 10px;
`

const AddGroup = styled.button`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  letter-spacing: 0.23px;
  color: ${colors.green6};
  cursor: pointer;
  margin: 0px;
  font-family: ${typography.type.nexa};
  padding: 0;
  border: 0;
  background: 0;
`

export { Field, FieldDivider, Devider, AddGroup }
