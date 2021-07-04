import React from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import IconAsc from "components/atoms/icons/ascending"
import IconDesc from "components/atoms/icons/descending"

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 100px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  border: solid 1px ${colors.green1};
  border-radius: 4px;

  table {
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: left;
    border-spacing: 0;

    th,
    td {
      padding: 0 12px;
      margin: 0;
      margin: 0;
      overflow-wrap: anywhere;

      :last-child {
        width: 20px;
      }
    }

    thead {
      tr {
        th {
          color: #2a6b48;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.71;
          letter-spacing: 0.23px;
          text-transform: capitalize;
          background-color: ${colors.green1};
          border-bottom: 2px solid ${colors.green2};

          &:hover {
            & svg {
              visibility: visible;
            }
          }

          & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 44px;
          }
        }
      }
    }

    tbody {
      tr {
        & > td {
          border-top: 4px solid ${colors.teal1};
          height: 3.5rem;
          color: ${colors.gray4};
          font-size: 0.889rem;
          letter-spacing: 0.2px;
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
    cursor: ${props.canSort ? "pointer" : "default"};
    background-color: ${props.isSorted ? "#e2f1e7 !important" : colors.green1};
  `}
`

const HeaderDiv = styled.div`
  ${props => props.canSort && `cursor: pointer;`}
`

const SortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 44px;
`

const IconAscWrapper = styled(IconAsc)`
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
`

const IconDescWrapper = styled(IconDesc)`
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
`

const ArrowIcon = ({ isSorted, isSortedDesc }) => {
  let isVisible = isSorted && !isSortedDesc

  if (isVisible) {
    return <IconAscWrapper isVisible={isVisible} />
  }

  return <IconDescWrapper isVisible={isSorted && isSortedDesc} />
}

export { TableWrapper, TH, HeaderDiv, SortWrapper, ArrowIcon }
