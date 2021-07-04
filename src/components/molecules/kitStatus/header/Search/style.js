import styled from "styled-components"

import { DebounceInput } from "react-debounce-input"

import { colors, size } from "@everlywell/leaves"

import { fonts } from "utils/styles"

const StyledDiv = styled.div`
  position: relative;
  width: ${props => (props.isExpanded ? "66%" : "25%")};
  min-width: ${props => (props.isExpanded ? "450px" : "339px")};
  max-width: 867px;
  transition: all 0.3s;
`

const StyledSeachContainer = styled.div`
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  border: ${props =>
    props.active ? `1px solid ${colors.green4}` : `1px solid ${colors.green2}`};
  border-radius: 1px;
  padding: ${size.xs3}px ${size.xs1}px;
  :hover {
    border-color: ${colors.green4};
  }
`

const PreSearchDropDown = styled.div`
  display: ${props => (props.open ? "block" : "none")};
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 9;
  border-radius: 2px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.13);
`

const StyledInput = styled(DebounceInput)`
  border: unset;
  font-size: 16px;
  font-family: ${fonts.normal};
  color: ${colors.gray4};
  outline: none;
  width: 100%;
  caret-color: ${colors.teal5};
  margin-left: ${size.xs1}px;
  ::placeholder {
    color: ${colors.gray3};
  }
`

const StyledImg = styled.img`
  position: absolute;
  right: 17px;
  display: ${props => (props.isLoading ? "block" : "none")};
  width: 30px;
  height: 30px;
`

const ClearSearch = styled.div`
  display: flex;
  position: absolute;
  right: 17px;
  margin: auto 0;
  cursor: pointer;
  height: 16px;
`

const Gradient = styled.div`
  position: absolute;
  z-index: 99;
  bottom: 0;
  height: 33px;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #fff 50%
  );
`

const Scroll = styled.div`
  position: relative;
  max-height: 420px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export {
  StyledDiv,
  StyledSeachContainer,
  PreSearchDropDown,
  StyledInput,
  StyledImg,
  ClearSearch,
  Gradient,
  Scroll,
}
