import styled from "styled-components"

const Scroll = styled.div`
  position: relative;
  max-height: 395px;
  overflow-y: scroll;
  padding-top: 25px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Gradient = styled.div`
  position: absolute;
  z-index: 99;
  top: 395px;
  height: 40px;
  width: 235px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #fff 50%
  );
`

export { Scroll, Gradient }
