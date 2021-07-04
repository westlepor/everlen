import React, { forwardRef } from "react"
import { colors } from "@everlywell/leaves"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Checkbox from "@material-ui/core/Checkbox"

const useStyles = makeStyles({
  root: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 3,
    width: 27,
    height: 27,
    border: "1px solid rgba(113, 172, 133, 0.61)",
    boxShadow: "4px 0 6px -5px rgba(0, 0, 0, 0.1)",
    transition: "border 200ms ease-out",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      borderColor: colors.green4,
    },
    "input:disabled ~ &": {
      width: 29,
      height: 29,
      border: "none",
      boxShadow: "inset 0 0 5px 0 rgba(0, 0, 0, 0.08)",
      backgroundColor: "rgba(37, 34, 40, 0.05)",
      cursor: "not-allowed",
      pointerEvents: "all",
    },
  },
  checkedIcon: {
    borderColor: colors.green5,
    backgroundColor: colors.green5,
    boxShadow: "0 2px 15px -5px rgba(0, 0, 0, 0.15)",
    "&:before": {
      display: "block",
      width: 27,
      height: 27,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:disabled ~&": {
      boxShadow: "none",
      backgroundColor: colors.gray2,
    },
  },
})

// Inspired by blueprintjs
const StyledCheckbox = forwardRef(({ onChange, checked, disabled }, ref) => {
  const classes = useStyles()
  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      ref={ref}
    />
  )
})

export default StyledCheckbox
