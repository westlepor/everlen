import React from "react"

import Checkbox from "components/atoms/check"

import * as S from "./styles.js"

const DeliveryOptionsSelector = ({
  selectedDeliveryOptionIds = [],
  options,
  onChange,
}) => {
  return (
    <>
      <S.Title>Delivery Options</S.Title>
      <S.Description>
        Select all that apply. Participants will be able to choose delivery
        options if both are selected.
      </S.Description>

      {options.map(option => {
        const isChecked = selectedDeliveryOptionIds.includes(option.id)

        return (
          <S.OptionWrapper key={option.id} data-cy="delivery-option">
            <Checkbox
              checked={isChecked}
              onChange={event =>
                onChange({ id: option.id, isChecked: event.target.checked })
              }
              disabled={false}
            />

            <S.OptionLabels
              key={option.value}
              onClick={() => onChange({ id: option.id, isChecked: !isChecked })}
            >
              <S.OptionTitle>{option.title}</S.OptionTitle>
              <S.OptionDescription>{option.description}</S.OptionDescription>
            </S.OptionLabels>
          </S.OptionWrapper>
        )
      })}
    </>
  )
}

export default DeliveryOptionsSelector
