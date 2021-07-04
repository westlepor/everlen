import styled from "styled-components"

import {
  Modal as BaseModal,
  Button,
  Input as BaseInput,
  Checkbox as BaseCheckbox,
  colors,
  typography,
} from "@everlywell/leaves"

const Modal = styled(BaseModal)`
  border: unset;
  width: 644px;

  & > button {
    border: unset;
    padding: 3px;
    top: 15px;
    right: 15px;

    &:focus {
      outline: unset;
    }

    & > svg {
      width: 18px;
      height: 18px;
    }
  }

  & > div {
    width: unset;
    padding: 45px 39px 0;
    min-height: 310px;
  }

  & > div:nth-child(3) {
    display: none;
  }
`

const Wrapper = styled.form`
  position: relative;
  font-weight: normal !important;
  min-height: 310px;
`

const Title = styled.div`
  font-size: 28.8px;
  line-height: 1.11;
  letter-spacing: 0.63px;
  text-align: center;
  color: ${colors.teal6};
  margin-bottom: 16px;
`

const Field = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  margin-top: 12px;
  margin-bottom: 2px;
  ${props => props.focused && `color: ${colors.green6};`}
`

const FieldOption = styled(Field)`
  margin-top: 32px;
`

const FieldDivider = styled.div`
  margin-top: 12px;
`

const Devider = styled.div`
  margin-top: 10px;
`

const AddGroup = styled.button`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  letter-spacing: 0.23px;
  color: ${colors.green6};
  cursor: pointer;
  margin: 0px;
  font-family: ${typography.type.nexa};
  padding: 0;
  border: 0;
  background: 0;
`

const Buttons = styled.div`
  margin-top: 48px;
  margin-bottom: 45px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const SaveUserButton = styled(Button)`
  width: 123px;
  height: 48px;
  font-weight: 500;
  padding: 0;
  margin-left: 16px;

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
`

const ChangeGroupButton = styled(SaveUserButton)`
  width: 150px;
  margin-top: 15px;
  position: absolute;
  bottom: 40px;
  right: 0px;
`

const Input = styled(BaseInput)`
  label {
    font-weight: 500;
  }

  ${props =>
    props.isError &&
    `
    input {
      border-color: ${colors.red3} !important;
      border-bottom-width: 2px !important;
      &:focus {
        border-bottom: 2px solid ${colors.red3} !important;
        box-shadow: unset !important;
      }
    }
    div {
      display: none;
    }
  `}
`

const Checkbox = styled(BaseCheckbox)`
  cursor: pointer;
  width: unset;

  div {
    & > div {
      margin: 0 12px 0 0;
    }
  }

  label {
    cursor: pointer;
    font-size: 16px;
    line-height: 1.75;
    color: ${colors.gray4};
    font-weight: normal;
  }
`

const WarningWrapper = styled.div`
  display: flex;
`

const InvalidEmail = styled.div`
  color: ${colors.red3};
`

const WarningBody = styled.div`
  font-size: 18px;
  line-height: 1.78;
  color: ${colors.gray4};
`

const WarningLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const WarningLink = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.3px;
  color: ${colors.green5};
  margin-left: 10px;
  margin-right: 6px;
`

export {
  Wrapper,
  Title,
  Field,
  FieldDivider,
  FieldOption,
  Devider,
  AddGroup,
  Modal,
  Buttons,
  SaveUserButton,
  ChangeGroupButton,
  Input,
  Checkbox,
  WarningWrapper,
  InvalidEmail,
  WarningBody,
  WarningLinkWrapper,
  WarningLink,
}
