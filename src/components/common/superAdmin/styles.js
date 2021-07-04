import styled from "styled-components"
import {
  Row,
  Col,
  typography,
  Button,
  colors,
  Input,
  size,
} from "@everlywell/leaves"

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.gray1};
  border-bottom: 1px solid ${colors.gray2};
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Label = styled.div`
  ${typography.bodyTextSmall};
  text-align: left;

  b {
    font-weight: 500;
  }
`

const Permission = styled.div`
  ${typography.bodyTextSmall};
  text-transform: capitalize;
`

const StyledInput = styled(Input)`
  margin-left: 10px;
  margin-top: 21px;
  width: 270px;

  input[type="text"] {
    height: 48px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${props => (props.error ? colors.red3 : colors.green2)};
    background-color: ${colors.white};
    padding: 12px 16px;

    &:focus {
      border: solid 1px ${props => (props.error ? colors.red3 : colors.teal5)};
      border-bottom: solid 2px
        ${props => (props.error ? colors.red3 : colors.teal5)};
      box-shadow: none;
      caret-color: ${props => (props.error ? colors.red2 : colors.teal4)};
    }
  }

  label {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const LoadingButton = styled.div`
  margin-left: 10px;
  width: 112px;
  height: 48px;
  cursor: not-allowed;
  background-color: ${colors.green5};
  box-shadow: 0 2px 15px -5px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div`
  border: 3px solid ${colors.white};
  border-top: 3px solid ${colors.green5};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
`

const InfoWrapperRow = styled(Row)`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 24px 0;
`

const InfoWrapperCol = styled(Col)`
  padding: 0;
`

const CancelButton = styled(Button)`
  width: 100%;
`

const Details = styled.details`
  display: contents;

  summary {
    list-style-type: none;
    display: inline-block;
    margin-left: 5px;
    padding: 0 3px;
    cursor: pointer;
    color: ${colors.green6};
  } /* Firefox */

  summary::-webkit-details-marker {
    display: none;
  } /* Chrome */

  summary::marker {
    display: none;
  }

  summary::before {
    content: "+ ";
  }

  summary::after {
    content: " More";
  }

  &[open] {
    summary::before {
      content: "- ";
    }

    summary::after {
      content: " Less";
    }

    p {
      margin: 0;
    }
  }
`

export {
  OuterWrapper,
  InnerWrapper,
  Label,
  StyledInput,
  StyledButton,
  InfoWrapperRow,
  InfoWrapperCol,
  CancelButton,
  Details,
  LoadingButton,
  Loader,
  Permission,
}
