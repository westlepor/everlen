import styled from "styled-components"

import { Input as BaseInput, size, colors } from "@everlywell/leaves"

const Wrapper = styled.div`
  width: ${props => (props.isExpanded ? "599px" : "250px")};
  ${props => props.isExpanded && `max-width: 599px;`}
  position: relative;
  transition: all 0.3s;
`

const SearchIconWrapper = styled.span`
  position: absolute;
  left: ${size.md}px;
  top: 5px;
  width: 24px;
  height: 24px;
  font-size: 18px;
  z-index: 1;
`

const CloseIconWrapper = styled.span`
  position: absolute;
  right: 8px;
  top: 7px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const Input = styled(BaseInput)`
  input[type="text"] {
    padding: 0 28px 0 ${size.xl3}px;
    box-shadow: 4px 4px 6px -5px rgba(0, 0, 0, 0.1);

    &:focus {
      border-color: ${colors.green4};
      box-shadow: none;
    }
  }

  div {
    display: none;
  }
`

export { Wrapper, Input, SearchIconWrapper, CloseIconWrapper }
