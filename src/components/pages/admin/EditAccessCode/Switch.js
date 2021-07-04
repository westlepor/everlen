import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import { colors } from "@everlywell/leaves"

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 64,
    height: 32,
    padding: 0,
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(32px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: colors.green5,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: colors.green5,
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 28,
    height: 28,
    boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.2)",
    background: "white",
  },
  track: {
    borderRadius: 32 / 2,
    backgroundColor: colors.gray2,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
    boxSizing: "border-box",
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

const Toggle = ({ className, checked, style, onChange }) => {
  return (
    <IOSSwitch
      className={className}
      style={style}
      onChange={onChange}
      checked={checked}
    />
  )
}

export default Toggle
