import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import Button from "components/atoms/button"
import Icon from "components/atoms/icons/export"
import Skeleton from "components/atoms/common/skeleton"

const CsvButton = styled(Button)`
  align-self: flex-end;
  width: 188px;
  height: 48px;
  text-align: center;
  padding: ${size.sm}px 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.3px;
  color: white;
  background-color: ${colors.green5};
  justify-content: center;
  :hover {
    background-color: ${colors.green4};
  }
`

const CsvSkeleton = styled(Skeleton)`
  align-self: flex-end;
  width: 188px;
  height: 26px;
  padding: ${size.sm}px 0;
  border-radius: 12px;
`

const ExportIcon = styled(Icon)`
  margin-right: ${size.sm}px;
`

export { CsvButton, CsvSkeleton, ExportIcon }
