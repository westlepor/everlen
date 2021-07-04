import React from "react"
import styled from "styled-components"
import { colors, typography } from "@everlywell/leaves"

const Button = styled.button`
  font-family: ${typography.type.nexa};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 24px;
  line-height: 24px;
  border: 1px solid;
  border-radius: 2px;
  padding: 5px 11px;
  
  cursor: ${props =>
    props.disabled || props.loading ? "not-allowed" : "pointer"};

  ${props =>
    props.disabled &&
    `
    color: ${colors.gray3} !important;
    background-color: rgba(37, 34, 40, 0.05) !important;
    border: unset !important;
    box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.08);
  `}

  ${props =>
    !props.disabled &&
    `
    :hover {
      background-color: rgba(214, 235, 221, 0.2);
    }

    :active {
      background-color: rgba(214, 235, 221, 0.2);
    }
  `}

  ${props =>
    props.loading &&
    `
    .loader {
      margin: auto;
      border: 2px solid rgba(37, 34, 40, 0.05);
      border-radius: 50%;
      border-top: 2px solid ${props.spinnerColor};
      width: 20px;
      height: 20px;
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

export default ({
  Icon,
  label,
  color,
  borderColor,
  onClick,
  className,
  disabled,
  loading,
  ...props
}) => {
  const style = { color, borderColor }

  if (!loading)
    return (
      <Button
        className={className}
        style={style}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {!!Icon && <Icon isDisabled={disabled} />}
        <div>{label}</div>
      </Button>
    )
  else
    return (
      <Button
        className={className}
        style={style}
        loading={loading}
        spinnerColor={color}
      >
        <div className="loader"></div>
      </Button>
    )
}
