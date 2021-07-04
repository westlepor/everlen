import React from "react"
import Select from "components/atoms/select"

export default ({ name, setValue, items, initValue }) => {
  return (
    <Select
      name={name}
      setValue={setValue}
      items={items}
      initValue={initValue}
      theme="theme1"
    />
  )
}
