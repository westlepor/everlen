import React from "react"
import styled from "styled-components"

import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { withStyles } from "@material-ui/core/styles"
import { colors } from "@everlywell/leaves"

import ArrowDown from "components/atoms/icons/arrowDown"

import { fonts } from "utils/styles"

const themes = {
  theme1: {
    height: "32px",
    arrowWidth: "16",
    arrowColor: colors.green5,
    borderColor: colors.green2,
    color: colors.green5,
    fontWeight: "bold",
    fontSize: "16px",
  },
}
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  &:focus-within {
    .label {
      color: ${colors.teal4};
    }
  }
`
const StyledLabel = styled.label`
  font-family: ${fonts.normal};
  font-weight: 600;
  color: ${colors.gray4};
`
const StyledFormControl = withStyles({
  root: {
    margin: "5px 0 0 0",
  },
})(FormControl)
const StyledSelect = styled(Select)`
  font-weight: ${props => (props.theme ? props.theme.fontWeight : "normal")};
  font-size: ${props => (props.theme ? props.theme.fontSize : "14px")};
  color: ${props => (props.theme ? props.theme.color : colors.gray3)};
  height: ${props => (props.theme ? props.theme.height : "56px")};
  border-radius: 0px;
  .MuiSvgIcon-root {
    width: 16px;
    height: 16px;
  }
  .MuiSelect-root {
    background-color: white;
  }
  .MuiSelect-icon {
    fill: ${props =>
      props.theme
        ? props.theme.arrowColor
        : props.errormsg
        ? colors.red3
        : colors.teal5};
    top: calc(50% - 7px);
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props =>
      props.theme
        ? props.theme.borderColor
        : props.errormsg
        ? colors.red3
        : colors.gray3};
    border-bottom-width: ${props => (props.errormsg ? "3px" : "1px")};
  }
  .PrivateNotchedOutline-legendLabelled-5 {
    display: none;
  }
  &:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.gray3};
    }
  }
  &.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.teal5};
      border-bottom-width: 3px;
    }
    .MuiSelect-icon {
      fill: ${colors.teal5} !important;
    }
  }
  &.Mui-disabled {
    color: ${colors.gray3} !important;
    background-color: ${colors.gray1};
    .MuiSelect-root {
      background-color: ${colors.gray1};
    }
    .MuiSelect-icon {
      fill: ${colors.gray3};
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.gray1};
    }
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${colors.gray1};
      }
    }
  }
`
const Error = styled.label`
  color: ${colors.red3};
  font-family: ${fonts.normal};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  height: 24px;
`
export default ({
  name,
  setValue,
  label,
  initValue,
  error,
  onChange,
  items,
  disabled,
  className,
  theme,
  hasErrorLabel,
}) => {
  const classes = useStyles()
  const [value, setInnerValue] = React.useState(initValue)

  const handleChange = event => {
    setInnerValue(event.target.value)
    setValue(event.target.value)
    if (onChange) {
      onChange(event.target.value)
    }
  }
  const itemElems = items.map(e => (
    <MenuItem key={e.value} value={e.value}>
      {e.label}
    </MenuItem>
  ))
  let labelStyle = {}
  if (error) {
    labelStyle = { color: colors.red3 }
  }
  return (
    <StyledDiv className={className}>
      <StyledLabel className="label" style={labelStyle}>
        {label}
      </StyledLabel>
      <StyledFormControl variant="outlined" className={classes.formControl}>
        <StyledSelect
          value={value || ""}
          displayEmpty
          renderValue={value => {
            const item = items.find(e => e.value === value)
            return item ? item.label : label
          }}
          onChange={handleChange}
          disabled={disabled}
          IconComponent={() => (
            <ArrowDown
              width={themes[theme] ? themes[theme].arrowWidth : "46"}
              height="16"
              className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
            />
          )}
          errormsg={error}
          theme={themes[theme]}
        >
          {itemElems}
        </StyledSelect>
      </StyledFormControl>
      {hasErrorLabel && <Error className="error">{error}</Error>}
    </StyledDiv>
  )
}
