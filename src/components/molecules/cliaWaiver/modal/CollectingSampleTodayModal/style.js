import styled from "styled-components"
import {
  Button as BaseButton,
  colors,
  size,
  H2,
  Dropdown,
  Input,
} from "@everlywell/leaves"

import InfoIcon from "components/atoms/icons/info"
import ModalCloseIcon from "components/atoms/icons/modalClose"

const CloseIcon = styled(ModalCloseIcon)`
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
`

const Content = styled.div`
  height: calc(100% - 128px);
  overflow-y: auto;
  padding: 0 40px;
  position: relative;
`

const PageTitle = styled(H2)`
  width: 100%;
  margin: 0;
  font-size: 41.1px;
  font-weight: normal;
  line-height: 1.36;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${colors.teal6};
`

const Subtitle = styled.div`
  margin: ${size.sm}px 0 19px;
  font-size: 18px;
  line-height: 1.78;
  text-align: center;
  color: ${colors.gray4};
`

const InputField = styled(Input)`
  input[type="text"] {
    height: 48px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${colors.green2};
    background-color: ${colors.white};
    line-height: 1.78;
    color: ${colors.gray4};

    &:disabled {
      -webkit-text-fill-color: ${colors.gray3};
    }
  }

  label {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${colors.gray4};
    margin-bottom: 5px;
  }
`

const Form = styled.form`
  height: calc(100% - 68px);
`

const FormWrapper = styled.div`
  display: block;
  position: relative;
`

const StateSelect = styled(Dropdown)`
  select[name="state"] {
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${colors.green2};
    background-color: ${colors.white};
    width: 100%;
    margin-bottom: 20px;
    font-family: inherit;
  }

  label {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const StateSelectError = styled(Dropdown)`
  select[name="state"] {
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${colors.green2};
    background-color: ${colors.white};
    width: 100%;
    margin-bottom: 5px;
  }

  label {
    color: #cf5b6b;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const CustomErrorMessage = styled.div`
  margin-bottom: 5px;
  color: #cf5b6b;
`

const InputIconWrapper = styled.div`
  position: relative;
`

const StyledInfoIcon = styled(InfoIcon)`
  width: 1.25rem;
  height: 1.25rem;
`

const InfoIconWrapper = styled.a`
  position: absolute;
  top: 2.6rem;
  right: 1rem;
  cursor: pointer;
`

const CloseButtonWrapper = styled.div`
  height: 68px;
`

const SubmitButtonWrapper = styled.div`
  padding: 40px;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 15px 0px;
  position: fixed;
  width: 568px;
`

const Button = styled(BaseButton)`
  width: 100%;
`

const TooltipContentWrapper = styled.p`
  width: 350px;
`

export {
  Content,
  CloseIcon,
  PageTitle,
  Subtitle,
  InputField,
  Form,
  FormWrapper,
  StateSelect,
  StateSelectError,
  CustomErrorMessage,
  InputIconWrapper,
  StyledInfoIcon,
  InfoIconWrapper,
  CloseButtonWrapper,
  Button,
  SubmitButtonWrapper,
  TooltipContentWrapper,
}
