import styled from "styled-components"

import { size, colors, typography } from "@everlywell/leaves"

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${typography.type.nexa};

  .MuiFormControl-root {
    height: 3rem;

    ${props =>
      props.disabled
        ? `
      border: solid 1px ${colors.gray2};
      box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.08);
      background-color: rgba(37, 34, 40, 0.05);

      `
        : `
      border: solid 1px ${colors.green2};
      box-shadow: 4px 4px 15px -5px rgba(0, 0, 0, 0.1);
      `}

    p.MuiFormHelperText-root {
      margin: ${size.xs3}px 0 0;
      color: ${colors.red3};
      font-family: ${typography.type.nexa};
      font-size: 1rem;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
    }

    .MuiInputBase-root {
      height: 3rem;
      border-radius: 1px;
      justify-content: center;
      color: ${colors.gray4};
      font-size: 1.125rem;
      padding-right: 0;

      .MuiInputBase-input {
        height: 3rem;
        font-size: 1.125rem;
        padding: 0;
        padding-left: ${size.md}px;
        background: ${props => (props.disabled ? "rgba(0, 0, 0, 0)" : "white")};
        color: ${props => (props.disabled ? colors.gray3 : colors.gray4)};
      }

      .MuiInputAdornment-root {
        visibility: ${props => (props.disabled ? "hidden" : "visible")};
      }

      &:before {
        display: none;
      }

      svg {
        color: ${colors.green2};
      }

      fieldset {
        display: none;
      }
    }
  }
`

const StyledLabel = styled.label`
  ${typography.bodyTextSmall};
  color: ${props => (props.disabled ? colors.gray3 : colors.gray4)};
  margin-bottom: ${size.sm};
  font-weight: ${props =>
    props.boldLabel ? typography.weight.bold : typography.weight.regular};
`

export { StyledDiv, StyledLabel }
