import styled from "styled-components"

import { colors, size, mediaQueries } from "@everlywell/leaves"

const ToastLink = styled.a`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: 0.23px;
  color: ${colors.green6};
`

const ViewContainer = styled.div`
  position: fixed;
  overflow-y: scroll;
  height: 100vh;
  top: 0;
  right: ${props => (props.open ? "0" : "calc(-595px - 4rem)")};
  padding: 0 33px ${size.lg}px;
  background: white;

  z-index: 10;
  opacity: ${props => (props.open ? "1" : "0")};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;

  ${mediaQueries.forTabletVerticalUp} {
    width: 515px;
  }
`

const StandaloneContainer = styled.div`
  max-width: 644px;
  background: white;
  margin: 0 auto;
  margin: ${size.lg}px auto 0;
`

export { ViewContainer, StandaloneContainer, ToastLink }
