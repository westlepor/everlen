import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

const ManageButton = styled.div`
  width: 136px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
  background: ${props => (props.open ? "#f7fbf9" : colors.white)};
  text-align: center;
  padding: ${size.xs2}px 10px;
  cursor: pointer;
  border-radius: 2px;
  border: solid 1px;
  border-color: ${props => (props.open ? colors.green4 : colors.green2)};

  margin-left: ${size.md}px;

  :hover {
    background-color: #f7fbf9;
    border-color: ${colors.green4};
  }
`

const PopupContent = styled.div`
  padding: ${size.sm}px ${size.xl1}px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`

export { ManageButton, PopupContent, Row }
