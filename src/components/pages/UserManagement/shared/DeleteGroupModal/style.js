import styled from "styled-components"

import { Actions as BaseActions } from "../ConfirmationModal/style"

const Actions = styled(BaseActions)`
  margin-top: 50px;

  button {
    width: 150px !important;
    margin: 0 !important;
  }
`

const DescriptionWrapper = styled.div`
  margin: 0 24px 0 27px;
`

const Description = styled.div`
  margin-bottom: 24px;
`

export { Actions, DescriptionWrapper, Description }
