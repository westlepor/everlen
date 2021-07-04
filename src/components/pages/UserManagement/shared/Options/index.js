import React, { useState, useEffect } from "react"

import * as S from "./style"

const Options = ({ label, id, options, defaultSelectedOption, onChange }) => {
  const [selectedOption, setSelectedOption] = useState()

  useEffect(() => {
    if (defaultSelectedOption) {
      setSelectedOption(id + defaultSelectedOption)
    }
  }, [id, defaultSelectedOption])

  const handleChange = option => {
    setSelectedOption(id + option)
    onChange(option)
  }

  return (
    <S.Wrapper>
      <S.Label>{label}</S.Label>
      <S.FlexDiv>
        {options.map(option => (
          <S.RadioWrapper key={option.name}>
            <S.RadioButton
              id={id + option.name}
              name={id}
              label={option.label}
              value={id + option.name}
              onChange={_ => handleChange(option.name)}
              checked={selectedOption === id + option.name}
            />
          </S.RadioWrapper>
        ))}
      </S.FlexDiv>
    </S.Wrapper>
  )
}

export default Options
