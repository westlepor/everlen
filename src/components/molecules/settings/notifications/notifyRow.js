import React from "react"
import styled from "styled-components"
import { colors } from "@everlywell/leaves"

/**
 * Styled Components
 */
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  color: ${colors.gray4};
  font-size: 18px;
`
const Labels = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`
const Label = styled.div``
const Desc = styled.div`
  font-size: 14.2px;
`
const Controls = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`
const SwitchWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`
/**
 * Main Component
 */
const NotifyRow = ({ label, desc, switchComponent, className, style }) => {
  return (
    <Container className={className} style={style}>
      <Labels>
        <Label>{label}</Label>
        {desc && <Desc>{desc}</Desc>}
      </Labels>
      <Controls>
        <SwitchWrapper>{switchComponent}</SwitchWrapper>
      </Controls>
    </Container>
  )
}

export default NotifyRow
