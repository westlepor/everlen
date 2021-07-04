import React, { useState } from "react"

import * as S from "./style"

const results = [
  { label: "Negative", value: "negative" },
  { label: "Positive", value: "positive" },
  { label: "Invalid", value: "invalid" },
]

const ResultSelector = ({ defaultValue, onChange }) => {
  const [selectedResult, updateSelectedResult] = useState()

  const onClick = value => {
    updateSelectedResult(value)

    onChange(value)
  }

  return (
    <S.Container>
      {results.map(result => (
        <S.Button
          data-cy="result-selector"
          key={result.value}
          isActive={
            result.value === selectedResult ||
            (!selectedResult && defaultValue === result.value)
          }
          type={result.value}
          onClick={() => onClick(result.value)}
        >
          {result.label}
        </S.Button>
      ))}
    </S.Container>
  )
}

export default ResultSelector
