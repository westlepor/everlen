import styled from "styled-components"
import { Link } from "gatsby"

import {
  size,
  typography,
  colors,
  Input,
  H3,
  H4,
  RadioButton,
  Button,
  Dropdown,
} from "@everlywell/leaves"

import { withStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"

const backArrow = require("images/icons/backArrow.svg")

const Title = styled(H3)`
  text-align: center;
  font-weight: normal;
  line-height: 1.23;
  letter-spacing: 0.56px;
  margin: 0;
`

const OuterWrapper = styled.div`
  max-width: 644px;
  margin: ${size.lg}px auto ${size.xl4}px;
`

const InnerWrapper = styled.div`
  padding: ${size.xl1}px ${size.xl3}px ${size.xl2}px;
  border-radius: 2px;
  box-shadow: 0 2px 30px -5px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`

const FormSection = styled.div`
  display: block;
  padding: 3.5rem 0;
  border-bottom: solid 1px ${colors.gray2};
`

const CodeFrequencySection = styled(FormSection)`
  border-bottom: none;
`

const PaymentOptionsSection = styled(FormSection)`
  border-bottom: none;
  padding-bottom: 3.5rem;
  border-top: solid 1px ${colors.gray2};
`

const Step = styled(H4)`
  margin: 0;
`

const BodyCopy = styled.div`
  ${typography.bodyTextSmall};
  margin-bottom: ${size.xl1}px;
`

const BodyCopySmall = styled.div`
  ${typography.bodyTextXSmall};
`

const StyledInput = styled(Input)`
  input[type="text"] {
    height: 48px;
    box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
    border: solid 1px ${colors.green2};
    background-color: ${colors.white};
  }

  label {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const AccessCodeInput = styled(StyledInput)`
  input {
    text-transform: uppercase;

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      text-transform: initial;
    }
  }

  ${props =>
    !!props.error &&
    `
    input {
      border: solid 1px ${colors.red3} !important;
    }

    svg {
      visibility: hidden;
    }
  `}
`

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${size.lg}px;
  margin-bottom: 24px;
`

const FlexDiv = styled.div`
  display: flex;
  margin-top: ${size.sm}px;
`

const Tests = styled.div`
  display: block;
`

const TestItem = styled.label`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${size.xl1}px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TestLabel = styled.div`
  margin-left: ${size.xs1}px;
  color: ${colors.gray4};
`

const RadioWrapper = styled.div`
  flex: 1;
`

const StyledRadioButton = styled(RadioButton)`
  margin-bottom: ${size.lg}px;

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

const UsageLimitSection = styled.div.attrs(props => ({
  show: props.show,
}))`
  display: ${({ show }) => (show ? "block" : "none")};
`

const Label = styled.label`
  display: block;
  ${typography.bodyTextSmall};
  color: ${colors.gray4};
  font-weight: ${typography.weight.bold};
`

const OccuranceOption = styled.div`
  display: block;
`

const Occurances = styled.div`
  display: flex;
`

const FrequencySlider = withStyles({
  root: {
    color: colors.green5,
    height: 8,
    margin: "23px 12px 20px 12px",
    width: "calc(100% - 24px)",
  },
  thumb: {
    height: "1.5rem",
    width: "1.5rem",
    backgroundColor: colors.green1,
    border: "2px solid currentColor",
    marginTop: -10,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  track: {
    height: "0.25rem",
    marginLeft: -12,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rail: {
    marginLeft: -12,
    marginRight: -12,
    width: "calc(100% + 24px)",
    height: "0.25rem",
    borderRadius: 2,
    backgroundColor: colors.gray5,
    opacity: 0.05,
  },
  mark: {
    visibility: "hidden",
  },
  markLabel: {
    fontFamily: "inherit",
    fontSize: "1.125rem",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: 0.3,
    textAlign: "center",
    color: colors.gray3,
    top: -23,
  },
  valueLabel: {
    fontFamily: "inherit",
    fontSize: "1.125rem",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: 0.45,
    textAlign: "center",
    color: colors.gray5,
    left: "calc(-50% + 3px)",
    top: -23,

    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
})(Slider)

const CreateAccessCodeButton = styled(Button)`
  margin: 0 0 0 auto;
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

const UsageLimitCopy = styled(BodyCopy)`
  margin-bottom: ${size.md}px;
  font-size: 0.875rem;
  line-height: 1.57;
`

const BackLink = styled(Link)`
  display: block;
  font-size: 16px;
  line-height: 1.5;
  font-weight: ${typography.weight.bold};
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

const OccurrenceToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
  margin-bottom: 3.188rem;
`

const OccurrenceToggle = styled.button`
  font-family: inherit;
  background: white;
  border: none;
  font-size: 1rem;
  color: ${colors.gray4};
  padding-left: 1rem;
  padding-right: 1rem;
  outline: none;
  cursor: pointer;
  border: 1px solid transparent;

  &:first-child {
    padding-right: 1.25rem;
  }

  &:last-child {
    padding-right: 1.562rem;
  }

  ${props =>
    props.isActive &&
    `
    text-shadow: 0.6px 0 0 ${colors.green5};
    color: ${colors.green5};
    border-radius: 1px;
    background-color: #f7fbf9;
    border: 1px solid ${colors.green4};
  `}
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
    font-weight: ${typography.weight.bold};
    line-height: 1.5;
    margin-bottom: ${size.xs3}px;
  }
`

const TimezoneWrapper = styled.div`
  margin-bottom: 37px;
  position: relative;
`

export {
  Title,
  OuterWrapper,
  InnerWrapper,
  BodyCopySmall,
  BodyCopy,
  FormSection,
  CodeFrequencySection,
  PaymentOptionsSection,
  StyledInput,
  AccessCodeInput,
  FlexDiv,
  GridDiv,
  Tests,
  Step,
  TestItem,
  TestLabel,
  RadioWrapper,
  StyledRadioButton,
  UsageLimitSection,
  Label,
  OccuranceOption,
  Occurances,
  FrequencySlider,
  CreateAccessCodeButton,
  UsageLimitCopy,
  BackLink,
  OccurrenceToggleWrapper,
  OccurrenceToggle,
  Select,
  TimezoneWrapper,
}
