import styled from "styled-components"

import Icon from "components/atoms/icons/filtered"

export const Trigger = styled.div`
  position: relative;
  width: 24px;
  min-width: 24px;
  height: 24px;
  justify-content: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2px;

  :hover {
    background-image: linear-gradient(
      to bottom,
      rgb(204, 227, 213),
      rgb(204, 227, 213)
    );
    ${props =>
      !props.popupOpen &&
      !props.sorted &&
      `
    & + div {
      svg {
        visibility: hidden;
      }
    }
    `}
`

export const FilteredIcon = styled(Icon)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 13px;
  height: 13px;
`

export default Trigger
