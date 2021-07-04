import styled from "styled-components"

import { size } from "@everlywell/leaves"

import Skeleton from "components/atoms/common/skeleton"
import Selector from "components/molecules/kitStatus/header/PageSelector"

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
`

const SearchSkeleton = styled(Skeleton)`
  width: 442px;
  height: 40px;
  border-radius: 12px;
`

const RightButtons = styled.div`
  display: flex;
`

const PageSkeleton = styled(Skeleton)`
  width: 148px;
  height: 34px;
  border-radius: 12px;
`

const PageSelector = styled(Selector)``

const ManageColumnSkeleton = styled(Skeleton)`
  width: 160px;
  height: 34px;
  border-radius: 12px;

  margin-left: ${size.md}px;
`

export {
  Root,
  SearchSkeleton,
  RightButtons,
  PageSkeleton,
  PageSelector,
  ManageColumnSkeleton,
}
