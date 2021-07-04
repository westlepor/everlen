import React, { useState } from "react"

import Badge from "../Badge"

import * as S from "./style"

const LIMIT = 3
const MAX_WIDTH = 211

const Badges = ({ id, items = [], maxWidth = MAX_WIDTH, showDash = true }) => {
  const count = items.length || 0

  const [extra, updateExtra] = useState(count - LIMIT)

  const onClick = () => updateExtra(0)

  if (items.length === 0) {
    return showDash ? "–" : ""
  }

  return extra > 0 ? (
    <S.Wrapper>
      {items.slice(0, LIMIT).map(item => (
        <Badge id={id} key={item.id} maxWidth={maxWidth}>
          {item.name}
        </Badge>
      ))}

      <Badge onClick={onClick}>{`+${extra} more`}</Badge>
    </S.Wrapper>
  ) : (
    <S.Wrapper>
      {items.map(item => (
        <Badge id={id} key={item.id} maxWidth={maxWidth}>
          {item.name}
        </Badge>
      ))}
    </S.Wrapper>
  )
}

export default Badges
