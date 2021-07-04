import React from "react"

import Popup from "reactjs-popup"

import Toggle from "components/atoms/common/toggle"
import Label from "components/atoms/common/Label"

import * as S from "./style"

import { getLabelFromColumn } from "utils/helper"

const RAPID_TEST_COLUMNS = [
  "collected",
  "results_entered",
  "results_entered_at",
]

const Trigger = open => (
  <S.ManageButton open={open}>Manage Columns</S.ManageButton>
)

const ManageColumnsSelector = ({
  canViewClientColumn,
  canViewRapidTests,
  disabledColumns,
  columns,
  onChange,
  isDisabled,
}) => {
  delete columns?.__typename

  return (
    <Popup
      trigger={Trigger}
      position="bottom right"
      on={["click"]}
      contentStyle={{
        padding: "0px 0px 0px 0px",
        border: "none",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        width: "340px",
        cursor: "default",
      }}
      offsetX={0}
      offsetY={0}
      arrow={false}
    >
      <S.PopupContent>
        {Object.keys(columns).map(column => {
          if (!canViewClientColumn && column === "client") {
            return null
          }

          if (!canViewRapidTests && RAPID_TEST_COLUMNS.includes(column)) {
            return null
          }

          const isDisabledColumn =
            disabledColumns?.includes(column) || isDisabled

          return (
            <S.Row key={column}>
              <Label htmlFor={column} isDisabled={isDisabledColumn}>
                {getLabelFromColumn(column)}
              </Label>

              <Toggle
                id={column}
                isChecked={columns[column]}
                isDisabled={isDisabledColumn}
                onChange={isChecked => onChange({ column, isChecked })}
              />
            </S.Row>
          )
        })}
      </S.PopupContent>
    </Popup>
  )
}

export default ManageColumnsSelector
