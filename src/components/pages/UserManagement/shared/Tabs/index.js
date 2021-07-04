import React from "react"

import * as S from "./style"

const Tabs = ({ tabs }) => {
  return (
    <S.Wrapper>
      {tabs.map(({ to, title, isActive }) => (
        <S.Link key={title} to={to} isActive={isActive}>
          {title}
        </S.Link>
      ))}
    </S.Wrapper>
  )
}

export default Tabs
