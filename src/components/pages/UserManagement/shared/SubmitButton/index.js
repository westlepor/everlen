import React from "react"

import * as S from "./style"

const SubmitButton = ({ children, isPadding, disabled, loading, onClick }) => {
  return (
    <S.SubmitButton
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      isPadding={isPadding}
    >
      {loading ? <div className="loader" /> : children}
    </S.SubmitButton>
  )
}

export default SubmitButton
