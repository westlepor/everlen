import styled from "styled-components"

import { Modal as BaseModal, H4, colors, size } from "@everlywell/leaves"

const Modal = styled(BaseModal)`
  text-align: center;
  width: 644px;
  border: none;
  box-shadow: 0 7px 30px -10px #dce4e5;

  & > button {
    top: 15px;
    right: 15px;
    padding: 1px;
  }

  & > div {
    width: 565px;
    padding: 13px 41px 38px 38px;

    &:last-child {
      display: none;
    }
  }
`

const Title = styled(H4)`
  margin: 32px 0;
  font-size: 28.8px;
  line-height: 1.11;
  letter-spacing: 0.63px;
`

const BodyText = styled.div`
  font-weight: 400;
  color: ${colors.gray4};
  font-size: 1.125rem;
  line-height: 2rem;
  letter-spacing: 0;
  margin: 0;
  letter-spacing: 0.4px;

  strong {
    font-weight: 500;
  }
`

const Actions = styled.div`
  margin-top: ${size.xl1}px;

  button {
    font-weight: 500;

    &:first-child {
      width: 224px;
      margin-right: ${size.md}px;
    }
  }
`

export { Modal, Title, BodyText, Actions }
