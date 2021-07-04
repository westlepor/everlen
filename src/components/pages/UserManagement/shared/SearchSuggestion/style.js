import styled from "styled-components"
import { colors } from "@everlywell/leaves"

const Wrapper = styled.div`
  position: absolute;
  width: 599px;
  z-index: 1;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.13);
  border-radius: 2px;

  tr {
    cursor: pointer;
    :hover,
    :focus,
    :active {
      background: ${colors.green0};
      outline: none;
    }
  }
`

const Gradient = styled.div`
  position: absolute;
  z-index: 99;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #fff 50%
  );
`

const Scroll = styled.div`
  position: relative;
  ${props => props.maxHeight && `max-height: ${props.maxHeight}px;`}
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export { Wrapper, Gradient, Scroll }
