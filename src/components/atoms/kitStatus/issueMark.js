import React from "react"
import styled from "styled-components"

import IssueIcon from "components/atoms/icons/issue"

const Wrapper = styled.span`
  display: flex;
  align-items: baseline;
  line-height: 1.57;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: initial;
  text-align: left;
  letter-spacing: 0.41px;
`

const Label = styled.span`
  display: inline-block;
  margin-left: 4px;
`

const IssueMark = ({ value, size }) => {
  return (
    <Wrapper>
      <span>
        <IssueIcon size={size} />
      </span>
      <Label>{value}</Label>
    </Wrapper>
  )
}

export default IssueMark
