import styled from "styled-components"
import { Link as BaseLink } from "gatsby"

import { colors, size } from "@everlywell/leaves"

const TableOuterWrapper = styled.div`
  margin-bottom: ${props => (!!props.hidePagination ? size.lg : "100")}px;
`

const TableInnerWrapper = styled.div`
  overflow-x: auto;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  border: solid 1px ${colors.green1};
  border-radius: 4px;

  table {
    padding: 0;
    margin: 0;
    width: 100%;
    border-spacing: 0;

    th,
    td {
      padding: 0 12px;
      margin: 0;
      margin: 0;
      overflow-wrap: anywhere;
      word-break: break-word;

      :first-child {
        padding-left: 24px;
      }

      :last-child {
        padding-right: 24px;
      }
    }

    thead {
      tr {
        th {
          height: 64px;
          color: #2a6b48;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.71;
          letter-spacing: 0.23px;
          background-color: ${colors.green1};
          border-bottom: 2px solid ${colors.green2};
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        vertical-align: baseline;

        & > td {
          height: auto;
          font-size: 0.889rem;
          text-align: left;
          letter-spacing: 0.2px;
          color: ${colors.gray4};
          border-top: 4px solid ${colors.teal1};
          padding: 20px 12px;
        }

        :first-child {
          & > td {
            border-top: none;
          }
        }
      }
    }
  }
`

const TH = styled.th`
  ${props => `
    min-width: ${props.minWidth}px;
    text-align: ${props.textAlign}  !important;
  `}
`

const TD = styled.td`
  ${props => `
    text-align: ${props.textAlign} !important;
  `}
`

const Pagination = styled.div`
  width: 100%;
  margin-top: ${size.lg}px;
  display: flex;
  justify-content: space-between;
`
const ItemCount = styled.div`
  color: ${colors.gray4};
  font-size: 14px;
  line-height: 1.57;
`
const PageNumbers = styled.div``

const Link = styled(BaseLink)`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.green6};
`

const CloseButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: white;
  border: none;
  height: 28px;
`

export {
  CloseButtonWrapper,
  CloseButton,
  TableInnerWrapper,
  TableOuterWrapper,
  TH,
  TD,
  Pagination,
  ItemCount,
  PageNumbers,
  Link,
}
