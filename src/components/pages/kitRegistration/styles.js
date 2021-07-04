import styled from "styled-components"
import { Link } from "gatsby"

import {
  size,
  typography,
  colors,
  Input,
  H3,
  H5,
  RadioButton,
  Button,
  Dropdown,
} from "@everlywell/leaves"

import InternalLink from "components/atoms/link"

const backArrow = require("images/icons/backArrow.svg")

const Title = styled(H3)`
  text-align: center;
  font-weight: normal;
  line-height: 1.23;
  letter-spacing: 0.56px;
  margin: 0;
`

const Subtitle = styled.div`
  text-align: center;
  ${typography.bodyText};
  font-weight: ${typography.weight.light};
  margin: ${size.xs2}px ${size.xs1}px ${size.md}px;
`

const OuterWrapper = styled.div`
  max-width: 644px;
  margin: ${size.lg}px auto ${size.xl4}px;
`

const InnerWrapper = styled.div`
  padding: ${size.xl2}px;
  border-radius: 2px;
  box-shadow: 0 2px 30px -5px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`

const Description = styled.div`
  ${typography.bodyTextSmall};
  text-align: center;
  color: ${colors.gray4};
`;

const FormSection = styled.div`
  display: ${props => props.hideSection ? 'none' : 'block'};
  padding: ${props => props.smallPadding ? `${size.xs1}px 0` : `${size.xl1}px 0`};
  border-bottom: ${props => props.hideBorder ? 'none' : `solid 1px ${colors.gray2}`};
`

const Step = styled(H5)`
  margin: ${size.md}px 0 ${size.md}px;
  font-weight: ${typography.weight.book};
`

const Prompt = styled(H5)`
  ${typography.bodyText};
  font-weight: ${typography.weight.book};
  margin: ${props => props.noMargin ? '0' : '0 0 20px 0'} ;
`

const BodyCopy = styled.div`
  ${typography.bodyTextSmall};
  font-weight: ${typography.weight.light};
  margin: ${size.xs2}px 0px ${size.md}px;
`

const BodyCopySmall = styled.div`
  ${typography.bodyTextXSmall};
  font-weight: ${typography.weight.light};
  margin: ${size.xs2}px 0px ${size.md}px;
`

const BodyCopyLink = styled.a`
  color: ${colors.green6};
  font-weight: ${typography.weight.bold};
  text-decoration: none;
`

const BodyUL = styled.ul`
  margin: 0px 0px ${size.lg}px;
`

const BodyLI = styled.li`
  ${typography.bodyTextSmall};
  font-weight: ${typography.weight.light};
  margin: ${size.xs2}px 0px ${size.xs2}px;
`

const EditLink = styled(InternalLink)`
  color: ${colors.green6};
  font-weight: ${typography.weight.bold};
  text-decoration: none;
  justify-content: flex-end;
`

const StyledInput = styled(Input)`
  input[type="text"] {
    height: 48px;
    background-color: ${colors.white};
  }
  label {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: ${typography.weight.regular};
    margin-bottom: ${size.xs3}px;
    ${props => props.disabled && `color: ${colors.gray4} !important`}
  }
`

const FlexDiv = styled.div`
  display: flex;
  margin-top: ${size.sm}px;
`

const FlexRow = styled(FlexDiv)`
  justify-content: ${props => props.justifyContent ? props.justifyContent : ''};
`

const FlexCol = styled(FlexDiv)`
  flex: ${props => props.flex ? props.flex : '1'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : ''};
  flex-direction: column;
  margin: 0;
`

const RadioWrapper = styled.div`
  flex: 1;
`

const StyledRadioButton = styled(RadioButton)`
  margin-bottom: ${size.lg}px;
  label {
    height: auto;
    font-weight: ${typography.weight.regular};
  }
  ${props =>
    props.disabled &&
    `
    label {
      div {
        color: ${colors.gray3};
      }
      cursor: not-allowed;
    }
  `}
  ${props =>
    !props.checked &&
    `
    label {
      &:before {
        border: 1px solid rgba(113, 172, 133, 0.61)
      }
    }
  `}
`
const WideStyledRadioButton = styled(RadioButton)`
  margin-bottom: ${size.md}px;
  height: auto;
  label {
    height: auto;
    div {
      font-weight: ${typography.weight.light};
    }
  }
  ${props =>
    props.disabled &&
    `
    label {
      div {
        color: ${colors.gray3};
      }
      cursor: not-allowed;
    }
  `}
  ${props =>
    !props.checked &&
    `
    label {
      &:before {
        border: 1px solid rgba(113, 172, 133, 0.61)
      }
    }
  `}
`

const Label = styled.label`
  display: block;
  ${typography.bodyTextSmall};
  color: ${props => props.disabled ? colors.gray3 : colors.gray4};
  font-weight: ${typography.weight.regular};
  margin: ${props => props.withMargin ? `${size.md}px 0 0 0` : '0'};
`

const KitRegistrationNextButton = styled(Button)`
  margin: ${props => props.middleStep ? '0 0 0 20px' : '0 0 0 auto'};
  display: block;
  width: 12.188rem;
  ${props =>
    props.isLoading &&
    `
    &:disabled {
      cursor: not-allowed;
      pointer-events: all !important;
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
    }
  `}
`

const BarcodeEnterButton = styled(KitRegistrationNextButton)`
  margin: 26px 0 0 20px;
`

const KitRegistrationPrevButton = styled(KitRegistrationNextButton)`
  position: relative;
  &:before {
    content: url(${backArrow});
    position: relative;
    right: 20px;
    top: 1px;
  }
`

const BackLink = styled(Link)`
  display: block;
  font-size: 16px;
  line-height: 1.5;
  font-weight: ${typography.weight.regular};
  letter-spacing: 0.27px;
  color: ${colors.green5};
  margin-bottom: ${size.lg}px;
  position: relative;
  padding-left: ${size.md}px;
  text-decoration: none;
  &:before {
    content: url(${backArrow});
    position: absolute;
    left: 0;
    top: 1px;
  }
`

const Select = styled(Dropdown)`
  margin-bottom: 1.875rem;
  select {
    width: 100%;
    height: 48px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${colors.green2};
    background-color: ${colors.white};
    font-family: inherit;
    color: ${colors.gray4};
    &:focus {
      border-bottom: solid 1px ${colors.green2};
    }
  }
  label {
    font-size: 1rem;
    font-weight: ${typography.weight.regular};
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const SecondaryHeading = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: ${typography.weight.light};
  letter-spacing: 0.45px;
  margin-top: ${size.lg}px;
`

const TertiaryHeading = styled.div`
  color: ${colors.gray5};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.27px;
  margin-top: ${size.sm}px;
`

const ReadOnlyValue = styled.div`
  color: ${colors.gray4};
  ${typography.bodyTextSmall};
  font-weight: ${typography.weight.light};
  letter-spacing: 0px;
`

const InputContainer = styled.div`
  margin-right: ${props => props.noMargin ? '0' : `${size.lg}px`};
  flex: 1;
`

const Footer = styled.div`
  margin-top: ${size.xl2}px;
`

const ErrorMessage = styled.div`
  a {
    color: inherit;
    pointer-events: auto;
  }
`

export {
  BarcodeEnterButton,
  Title,
  Subtitle,
  OuterWrapper,
  InputContainer,
  InnerWrapper,
  Description,
  BodyCopySmall,
  BodyCopy,
  BodyCopyLink,
  BodyUL,
  BodyLI,
  EditLink,
  FormSection,
  StyledInput,
  FlexCol,
  FlexDiv,
  FlexRow,
  Step,
  Prompt,
  RadioWrapper,
  ReadOnlyValue,
  SecondaryHeading,
  StyledRadioButton,
  WideStyledRadioButton,
  Label,
  KitRegistrationNextButton,
  KitRegistrationPrevButton,
  TertiaryHeading,
  BackLink,
  Select,
  Footer,
  ErrorMessage,
}
