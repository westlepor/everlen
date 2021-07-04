import styled from "styled-components"

import { Button, colors } from "@everlywell/leaves"

const Loader = styled.div`
  border: 3px solid ${colors.white};
  border-top: 3px solid ${colors.green5};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
`

const SubmitButton = styled(Button)`
  margin-top: 48px;
  width: 100%;
  font-weight: 500;
  ${props => props.isPadding && `margin-bottom: 39px;`}

  ${props =>
    props.disabled &&
    `
      cursor: not-allowed;
      pointer-events: all;

      &:hover {
        border-color: rgba(37,34,40,0.05);
        background-color: rgba(37,34,40,0.05);
        color: #aaa9ac;
      }
    `}

    ${props =>
      props.loading &&
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

const LoadingButton = styled(SubmitButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export { SubmitButton, Loader, LoadingButton }
