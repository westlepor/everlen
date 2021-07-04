import React from "react"
import Select from "components/atoms/select"
// const { listTimeZones } = require("timezone-support")

export default ({ name, label, setValue, error, className, style }) => {
  const timeZones = [{ value: 1, label: "(UTC-7:00) Pacific Time" }]
  return (
    <Select
      name={name}
      label={label}
      className={className}
      style={style}
      items={timeZones}
      error={error}
      setValue={setValue}
    />
  )
}
