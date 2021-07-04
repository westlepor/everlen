import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;

  > div {
    margin: 4px 0;
  }

  > div:first-child {
    margin-top: 0px;
  }

  > div:last-child {
    margin-bottom: 0px;
  }
`

export { Wrapper }
