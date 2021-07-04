import styled from "styled-components"
import { Link as BaseLink } from "gatsby"

import { colors } from "@everlywell/leaves"

const TableOuterWrapper = styled.div`
  background: white;
`

const TableInnerWrapper = styled.div`
  overflow-x: auto;
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
        vertical-align: top;

        & > td {
          height: auto;
          font-size: 0.889rem;
          text-align: left;
          letter-spacing: 0.2px;
          color: ${colors.gray4};
          border-top: 4px solid ${colors.teal1};
          padding: 20px 12px;
          vertical-align: middle;
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

const TD = styled.td`
  text-align: ${props => props.textAlign || "left"} !important;
  min-width: ${props => `${props.minWidth}px` || "30%"} !important;
`

const Link = styled(BaseLink)`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.green6};
  display: block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export { TableInnerWrapper, TableOuterWrapper, TD, Link }
