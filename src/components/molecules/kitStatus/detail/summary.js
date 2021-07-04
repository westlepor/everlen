import React from "react"

import PatientIcon from "components/atoms/icons/patient"

import { useTestKitDetails } from "hooks"

import * as S from "./style"

const DetailSummary = ({ detail }) => {
  const {
    name,
    dateOfBirth,
    email,
    phone,
    thirdPartyID,
    thirdPartyIDLabel,
    isThirdPartyIDEnabled,
  } = useTestKitDetails(detail?.data)

  return (
    <S.Container>
      <S.StyledTitleRow>
        <PatientIcon />
        <S.Title>Participant</S.Title>
      </S.StyledTitleRow>

      <S.RowWrapper>
        <S.StyledRow>
          <S.LabelColumn>
            <S.Label>Name</S.Label>
          </S.LabelColumn>

          <S.ValueColumn>
            <S.Text>{name}</S.Text>
          </S.ValueColumn>
        </S.StyledRow>

        <S.StyledRow>
          <S.LabelColumn>
            <S.Label>Date of Birth</S.Label>
          </S.LabelColumn>

          <S.ValueColumn>
            <S.Text>{dateOfBirth}</S.Text>
          </S.ValueColumn>
        </S.StyledRow>

        <S.StyledRow>
          <S.LabelColumn>
            <S.Label>Email</S.Label>
          </S.LabelColumn>

          <S.ValueColumn>
            <S.Text>{email}</S.Text>
          </S.ValueColumn>
        </S.StyledRow>

        {isThirdPartyIDEnabled && (
          <S.StyledRow>
            <S.LabelColumn>
              <S.Label>{thirdPartyIDLabel}</S.Label>
            </S.LabelColumn>

            <S.ValueColumn>
              <S.Text>{thirdPartyID}</S.Text>
            </S.ValueColumn>
          </S.StyledRow>
        )}

        <S.StyledRow>
          <S.LabelColumn>
            <S.Label>Phone</S.Label>
          </S.LabelColumn>

          <S.ValueColumn>
            <S.Text>{phone}</S.Text>
          </S.ValueColumn>
        </S.StyledRow>
      </S.RowWrapper>
    </S.Container>
  )
}

export default DetailSummary
