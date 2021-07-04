import React from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -45px;
  margin-left: -45px;
  border: 12px solid ${colors.gray1};
  border-radius: 50%;
  border-top: 12px solid ${colors.gray3};
  width: 90px;
  height: 90px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Spinner = () => {
  return <Loader />
}

export default Spinner
