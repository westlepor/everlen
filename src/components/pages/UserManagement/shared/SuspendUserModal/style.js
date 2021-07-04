import styled from "styled-components"

import { Button, colors } from "@everlywell/leaves"

import { Actions as BaseActions } from "../ConfirmationModal/style"

const Actions = styled(BaseActions)`
  margin-top: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    width: 150px !important;
  }
`

const SuspendButton = styled(Button)`
  background: #c6394c;
  border-color: #c6394c;
  letter-spacing: 0.27px;

  &:hover,
  &:focus,
  &:active {
    background: #e56575;
    border-color: #e56575;
  }

  ${props =>
    props.disabled &&
    `
      cursor: not-allowed;
      pointer-events: all !important;

      &:hover {
        border-color: rgba(37,34,40,0.05);
        background-color: rgba(37,34,40,0.05);
        color: #aaa9ac;
      }
      
      .loader {
        margin: auto;
        border: 2px solid ${colors.orange1};
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
      }
    `}
`

export { Actions, SuspendButton }
