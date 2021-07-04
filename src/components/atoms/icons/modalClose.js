import React from "react"

import { colors } from "@everlywell/leaves"

const ModalCloseIcon = ({ className, size, fillColor, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    onClick={onClick}
    data-cy="modal-close"
  >
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M3.293 3.484c.39-.39 1.024-.39 1.414 0l7.197 7.196 7.198-7.196c.39-.39 1.023-.39 1.414 0 .36.36.388.928.083 1.32l-.083.094-7.197 7.197 7.197 7.198.083.094c.305.392.277.96-.083 1.32-.39.39-1.024.39-1.414 0l-7.198-7.197-7.197 7.197c-.39.39-1.024.39-1.414 0-.36-.36-.388-.928-.083-1.32l.083-.094 7.196-7.198-7.196-7.197-.083-.094c-.305-.392-.278-.96.083-1.32z"
    />
  </svg>
)

ModalCloseIcon.defaultProps = {
  size: 24,
  fillColor: colors.gray3,
}

export default ModalCloseIcon
