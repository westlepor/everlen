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
    padding: 1,
    "&$checked": {
      transform: "translateX(32px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: colors.teal5,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: colors.teal5,
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 30,
    height: 30,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
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
export default ({ className, checked, style, onChange }) => {
  return (
    <IOSSwitch
      className={className}
      style={style}
      onChange={onChange}
      checked={checked}
    />
  )
}
