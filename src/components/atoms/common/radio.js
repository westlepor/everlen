import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { FormControlLabel, Radio } from "@material-ui/core"

import { colors } from "@everlywell/leaves"

import { fonts } from "utils/styles"

const GreenRadio = withStyles({
  root: {
    width: "27px",
    "&$checked": {
      color: colors.green5,
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)

const Container = withStyles({
  label: {
    fontFamily: fonts.normal,
  },
  checked: {},
})(props => <FormControlLabel {...props} />)

const RadioBox = ({ value, label }) => {
  return <Container value={value} control={<GreenRadio />} label={label} />
}

export default RadioBox
