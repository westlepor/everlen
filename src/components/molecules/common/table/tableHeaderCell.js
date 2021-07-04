import React, { useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colors } from "@everlywell/leaves"

import Skeleton from "components/atoms/common/skeleton"
import IconAsc from "components/atoms/icons/ascending"
import IconDesc from "components/atoms/icons/descending"
import IconFilter from "components/atoms/icons/filter"
import Trigger, {
  FilteredIcon,
} from "components/molecules/kitStatus/inlineFilter/styles/trigger"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import Field, { MENU_WIDTH_IN_PERCENTAGE, FAKE_CELL_W_PC } from "utils/fields"

const StyledDiv = styled.div`
  padding: 0 8px;
  box-sizing: border-box;
  position: relative;
  cursor: ${props => (props.sortable ? "pointer" : "default")};
  border-bottom: ${props =>
    props.isFake ? `2px solid ${colors.gray1}` : `2px solid ${colors.green2}`};
  background-color: ${props => (props.isFake ? colors.white : colors.green1)};
  flex-shrink: ${props => (props.isFake ? 0 : 1)};

  ${props =>
    props.sortable &&
    !props.popupOpen &&
    `
    &:hover {
      svg {
        visibility: visible;
      }
    }
  `}

  :first-child {
    background-color: ${props =>
      props.isFake ? colors.white : props.sorted ? "#e2f1e7" : colors.green1};
  }
`

const BackWrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.isFake ? colors.white : props.sorted ? "#e2f1e7" : colors.green1};
`

const SortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 2px;
`

const StyledSkeleton = styled(Skeleton)`
  border-radius: 12.5px;
  padding: 9px 0;
  width: 100%;
`

const Span = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.green5};
  display: block;
  line-height: 1.43;
  letter-spacing: 0.23px;
`

const IconAscWrapper = styled(IconAsc)`
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
`

const IconDescWrapper = styled(IconDesc)`
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
`

const ArrowWrapper = styled.div`
  position: relative;
  min-width: 14px;

  svg {
    position: absolute;
    min-width: 14px;
    height: 24px;
  }
`

const ArrowIcon = ({ cell, field, direction, sorted, popupOpen }) => {
  let isVisible =
    cell.value === field &&
    direction === "asc_nulls_last" &&
    (sorted || !popupOpen)

  if (isVisible) {
    return <IconAscWrapper isVisible={isVisible} />
  }

  return (
    <IconDescWrapper
      isVisible={
        cell.value === field &&
        direction === "desc_nulls_last" &&
        (sorted || !popupOpen)
      }
    />
  )
}

const FilterIcon = ({
  id,
  open,
  sorted,
  isFiltered,
  triggerStyles,
  onClick,
}) => (
  <Trigger
    style={
      open
        ? {
            backgroundImage:
              "linear-gradient(to bottom, rgb(204, 227, 213), rgb(204, 227, 213))",
            ...triggerStyles,
          }
        : triggerStyles
    }
    data-cy="inlinefilter-popup-trigger"
    id={id}
    popupOpen={open}
    sorted={sorted}
    onClick={onClick}
  >
    {!isFiltered && <IconFilter color={colors.green5} />}
    {isFiltered && (
      <>
        <IconFilter color={colors.green5} />
        <FilteredIcon />
      </>
    )}
  </Trigger>
)

const Cell = ({ cell, sortable, filterable }) => {
  const tableContext = useContext(TableContext)
  const { open, setPopup } = useContext(PopupContext)

  const {
    sort: { direction, field },
    columnCount,
    filterClient,
    filterStatus,
    filterOrdered,
    filterRegistered,
    filterCollected,
    filterReceived,
    filterSampleIssues,
    filterApproved,
    filterParticipantViewedAt,
    filterTestName,
    filterResult,
    filterResultsEntered,
    filterResultsEnteredAt,
  } = tableContext

  const popupOpen = open === cell.value

  let style = {
    width: `${(100 - MENU_WIDTH_IN_PERCENTAGE) / columnCount}%`,
  }
  if (cell.width && !cell.isFake) {
    style.width = `${cell.width}%`
  }
  if (cell.minWidth && !cell.isFake) {
    style.minWidth = `${cell.minWidth + 32}px`
  }

  const handleDirection = () => {
    if (cell.value === field && direction === "desc_nulls_last") {
      return "asc_nulls_last"
    }

    return "desc_nulls_last"
  }

  const handleSort = () => {
    if (popupOpen) {
      return
    }

    if (sortable) {
      tableContext.setTable({
        sort: {
          direction: handleDirection(),
          field: cell.value,
        },
        currentPage: 0,
      })
      setPopup({ open: "" })
    }
  }

  const openPopup = e => {
    e.preventDefault()
    e.stopPropagation()

    if (popupOpen) {
      setPopup({ open: "" })
    } else {
      const offsetX = e.currentTarget.offsetParent.offsetLeft + 8
      const offsetY = e.currentTarget.offsetParent.offsetTop + 2

      setPopup({
        open: cell.value,
        offsetX: offsetX,
        offsetY: offsetY,
      })
    }
  }

  if (cell.isFake) {
    style.width = `${FAKE_CELL_W_PC}%`
    return (
      <StyledDiv data-cy="table-header-cell" style={style} isFake={true}>
        <BackWrapper isFake={true}>
          <StyledSkeleton />
        </BackWrapper>
      </StyledDiv>
    )
  }

  const sorted = sortable && cell.value === field
  let isFiltered = false
  switch (cell.value) {
    case Field.client.name:
      isFiltered = filterClient.length > 0
      break
    case Field.status.name:
      isFiltered = filterStatus.length > 0
      break
    case Field.result.name:
      isFiltered = filterResult.length > 0
      break
    case Field.issue.name:
      isFiltered = filterSampleIssues.length > 0
      break
    case Field.test.name:
      isFiltered = filterTestName.length > 0
      break
    case Field.approveTime.name:
      isFiltered = !!filterApproved
      break
    case Field.ordered.name:
      isFiltered = !!filterOrdered
      break
    case Field.participantViewedAt.name:
      isFiltered = !!filterParticipantViewedAt
      break
    case Field.receiveTime.name:
      isFiltered = !!filterReceived
      break
    case Field.registerTime.name:
      isFiltered = !!filterRegistered
      break
    case Field.resultsEntered.name:
      isFiltered = filterResultsEntered.length > 0
      break
    case Field.collectTime.name:
      isFiltered = !!filterCollected?.from && !!filterCollected?.to
      break
    case Field.resultsEnteredAt.name:
      isFiltered =
        !!filterResultsEnteredAt?.from && !!filterResultsEnteredAt?.to
      break
    default:
      isFiltered = false
      break
  }

  return (
    <StyledDiv
      data-cy="table-header-cell"
      style={style}
      sortable={sortable}
      sorted={sorted}
      popupOpen={popupOpen}
      onClick={handleSort}
    >
      <BackWrapper sorted={sorted} popupOpen={sorted && popupOpen}>
        {cell.value && filterable && (
          <FilterIcon
            onClick={openPopup}
            sorted={sorted}
            open={popupOpen}
            isFiltered={isFiltered}
            id={cell.value.split(" ").join("")}
          />
        )}

        <SortWrapper>
          <Span
            direct={cell.value === field ? direction : "desc_nulls_last"}
            isSort={sortable && cell.value === field}
            data-cy="table-header-cell-value"
          >
            {cell.value}
          </Span>

          {sortable && (
            <ArrowWrapper>
              <ArrowIcon
                cell={cell}
                field={field}
                sorted={sorted}
                direction={direction}
                popupOpen={popupOpen}
              />
            </ArrowWrapper>
          )}
        </SortWrapper>
      </BackWrapper>
    </StyledDiv>
  )
}

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.number,
  }),
}

Cell.defaultProps = {}

export default Cell
