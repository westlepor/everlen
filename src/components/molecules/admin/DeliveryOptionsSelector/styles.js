import styled from "styled-components"

import { colors, size, mediaQueries } from "@everlywell/leaves"

const Title = styled.label`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  color: ${colors.gray4};
`

const Description = styled.div`
  font-size: 14px;
  line-height: 1.57;
  color: ${colors.gray4};
  margin-bottom: ${size.sm}px;
`

const OptionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${size.lg}px;

  :last-child {
    margin-bottom: 0;
  }
`

const OptionTitle = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.gray5};
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0.27px;
  margin-top: 2px;
`

const OptionDescription = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.75;
  color: ${colors.gray4};
  margin-top: 2px;

  ${mediaQueries.forTabletVerticalUp} {
    margin-left: ${size.xs1}px;
  }
`

const OptionLabels = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${size.xs1}px;
  cursor: pointer;

  ${mediaQueries.forTabletVerticalUp} {
    flex-direction: row;
  }
`

export {
  Title,
  Description,
  OptionWrapper,
  OptionTitle,
  OptionDescription,
  OptionLabels,
}
