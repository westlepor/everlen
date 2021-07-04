import styled from "styled-components"

import {
  Modal as BaseModal,
  Input,
  Button,
  Tooltip as BaseTooltip,
  colors,
  typography,
} from "@everlywell/leaves"

import BaseInfoIcon from "components/atoms/icons/info"
import BaseWarnIcon from "./warning"

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
    padding: 45px 39px 0px;
  }

  & > div:nth-child(3) {
    display: none;
  }
`

const Wrapper = styled.div`
  position: relative;
  font-weight: normal !important;
`

const Title = styled.div`
  font-size: 28.8px;
  line-height: 1.11;
  letter-spacing: 0.63px;
  text-align: center;
  color: ${colors.teal6};
  margin-bottom: 16px;
`

const Description = styled.div`
  font-size: 18px;
  line-height: 1.78;
  text-align: center;
  color: ${colors.gray4};
  width: 80%;
  margin: 0 10% 12px;
`

const Field = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  margin-top: 36px;
  margin-bottom: 2px;
  ${props => props.focused && `color: ${colors.green6};`}
`

const FieldDivider = styled.div`
  margin-top: 36px;
`

const Devider = styled.div`
  margin-top: 10px;
`

const AddClient = styled.button`
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

const GroupNameHeader = styled.div`
  display: flex;
  margin-top: 36px;
  margin-bottom: 2px;
  align-items: center;
`

const GroupNameLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray4};
  ${props => props.focused && `color: ${colors.green6};`}
  ${props => props.isError && `color: ${colors.red3};`}
  margin-right: 4px;
`

const Tooltip = styled(BaseTooltip)`
  display: block;
  height: 20px;

  .badge-tooltip {
    display: none;
    opacity: 0;
    min-width: 278px;
    padding: 0px 28px;
    left: -27px;

    &::before {
      bottom: -5px;
    }

    & > p {
      text-align: left;
    }
  }
`

const InfoIcon = styled(BaseInfoIcon)`
  cursor: pointer;
`

const GroupName = styled(Input)``

const WarnWrapper = styled.div`
  display: flex;
  margin-top: 21px;
`

const WarnIcon = styled(BaseWarnIcon)``

const WarnRight = styled.div`
  margin-left: 7.3px;
`

const WarnLabel = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
  color: #2d2d2d;
`

const WarnBody = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`

const WarnGuide = styled.div`
  font-size: 16px;
  line-height: 1.75;
  letter-spacing: normal;
  color: ${colors.gray4};
`

const WarnLink = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
  cursor: pointer;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AddGroupButton = styled(Button)`
  margin-top: 48px;
  width: 100%;
  font-weight: 500;
  ${props => props.isPadding && `margin-bottom: 39px;`}

  ${props =>
    props.loading &&
    `
    
  `}

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

export {
  Wrapper,
  Title,
  Description,
  Field,
  FieldDivider,
  Devider,
  AddClient,
  Modal,
  GroupNameHeader,
  GroupNameLabel,
  GroupName,
  Buttons,
  AddGroupButton,
  Tooltip,
  InfoIcon,
  WarnWrapper,
  WarnRight,
  WarnIcon,
  WarnLabel,
  WarnBody,
  WarnGuide,
  WarnLink,
}
