import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

const DeleteGroupButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.3px;
  color: ${colors.green5};
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 39px;
  appearance: unset;
  outline: unset;
  background: unset;
  border: unset;
  width: 100%;
  height: 46px;
  font-family: ${typography.type.nexa};

  &:focus {
    border: 1px solid #4ba373;
  }

  ${props =>
    props.disabled &&
    `
  &:disabled {
      cursor: not-allowed;
      pointer-events: all !important;
      border: 1px solid #d6ebdd;
    }
    
    .loader {
      margin: auto;
      border: 2px solid rgba(191, 219, 178, 0.84);
      border-radius: 50%;
      border-top: 2px solid white;
      width: 18px;
      height: 18px;
      -webkit-animation: spin 1s linear infinite; /* Safari */
      animation: spin 1s linear infinite;
    }
    
    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`}
`

const Title = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 1.75;
`

const ToastLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
`

export { DeleteGroupButton, ToastLink, Title, Description }
