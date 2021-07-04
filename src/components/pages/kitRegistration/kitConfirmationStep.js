import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import dayjs from "dayjs"

import { KitRegistrationContext } from "contexts/kitRegistration"
import { SessionContext } from "contexts/session"
import { useCreateKitRegistrationMutation, useSuperAdmin } from "hooks"
import {
  TOAST_MSG,
  TOAST_DESC,
  SYMPTOMS_LABELS,
  EXPOSURE_LABELS,
} from "utils/constants"

import Toast from "components/common/Toast"

import * as S from "./styles"

/**
 * Kit Confirmation page
 */
const KitConfirmationStep = ({ goToPreviousStep, goToStep, reset }) => {
  const {
    birthday,
    collectionDate,
    collectionTime,
    congregateSetting,
    ethnicity,
    exposure,
    firstName,
    firstTest,
    kitId,
    kitName,
    lastName,
    email,
    pregnancyStatus,
    race,
    selectedEnterpriseClient,
    sex,
    symptoms,
    symptomsStartDate,
    thirdPartyMemberId,
    thirdPartyMemberIdLabel,
    underlyingConditions,
  } = useContext(KitRegistrationContext)
  const { user, targetUser } = useContext(SessionContext) || {}
  const { isEverlywellSuperAdmin } = useSuperAdmin(user, targetUser)

  const { handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      kitId,
      thirdPartyMemberId,
      firstName,
      lastName,
      email: email || "",
      birthday,
      race: race || "Select Race",
      ethnicity: ethnicity || "Select Ethnicity",
      client: selectedEnterpriseClient || "-",
    },
  })
  const [createKitRegistration] = useCreateKitRegistrationMutation({ user })
  const [isLoading, setIsLoading] = useState(false)

  const displayPregnancyStatus = () => {
    switch (pregnancyStatus) {
      case true:
        return "Pregnant"
      case false:
        return "Not Pregnant"
      default:
        return "Unknown"
    }
  }

  const collectedAt = () => {
    if (collectionDate && collectionTime) {
      const day = collectionDate.getDate(),
        month = collectionDate.getMonth(),
        year = collectionDate.getFullYear()

      return collectionTime
        .set("date", day)
        .set("month", month)
        .set("year", year)
        .set("seconds", 0)
        .utc()
        .format("YYYY-MM-DD HH:mm:ss")
    }
    return null
  }

  const onSubmit = () => {
    setIsLoading(true)

    const payload = {
      collected_at: collectedAt(),
      comorbidities: underlyingConditions === true ? "high risk" : "low risk",
      congregate_setting: congregateSetting === true ? "yes" : "no",
      current_ICU: "no",
      currently_hospitalized: "no",
      dob: dayjs(birthday).format("YYYY-MM-DD"),
      employed_healthcare_setting: "no",
      // Don"t like this but the leaves select doesn"t allow us to set value + label on options.
      ethnicity: ethnicity.split(" ").join("_").toLowerCase(),
      exposure,
      first_COVID_test: firstTest === true ? "yes" : "no",
      first_name: firstName,
      gender: sex,
      is_pregnant: sex === "M" ? null : pregnancyStatus,
      kit_id: kitId,
      last_name: lastName,
      email,
      phone: "555-555-5555",
      race: race.split(" ").join("_").toLowerCase(),
      symptoms_level: symptoms,
      symptoms_start_date: symptomsStartDate
        ? dayjs(symptomsStartDate).format("MM/DD/YYYY")
        : null,
      third_party_member_id: thirdPartyMemberId,
    }

    createKitRegistration({
      user,
      variables: {
        ...payload,
      },
    })
      .then(() => {
        reset()

        toast(
          <Toast
            message={TOAST_MSG.KIT_REGISTERED}
            description={TOAST_DESC.KIT_REGISTERED}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "success",
            autoClose: 4000,
          }
        )
      })
      .catch(_error => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <S.Title>Confirm Information</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FlexRow justifyContent="space-between">
          <S.Step>Kit Registration</S.Step>
          <S.EditLink onClick={() => goToStep(0)} label="Edit"></S.EditLink>
        </S.FlexRow>

        <S.SecondaryHeading>Kit Information</S.SecondaryHeading>

        <S.TertiaryHeading>Test Name</S.TertiaryHeading>
        <S.ReadOnlyValue>{kitName}</S.ReadOnlyValue>

        <S.TertiaryHeading>Unique Kit ID</S.TertiaryHeading>
        <S.ReadOnlyValue>{kitId}</S.ReadOnlyValue>

        <S.FlexRow justifyContent="space-between">
          <S.Step>Participant Information</S.Step>
          <S.EditLink onClick={() => goToStep(1)} label="Edit"></S.EditLink>
        </S.FlexRow>

        <S.FlexRow>
          <S.FlexCol>
            <S.TertiaryHeading>Client</S.TertiaryHeading>
            <S.ReadOnlyValue>{selectedEnterpriseClient}</S.ReadOnlyValue>
          </S.FlexCol>
          {thirdPartyMemberId && (
            <S.FlexCol>
              <S.TertiaryHeading>{thirdPartyMemberIdLabel}</S.TertiaryHeading>
              <S.ReadOnlyValue>{thirdPartyMemberId}</S.ReadOnlyValue>
            </S.FlexCol>
          )}
        </S.FlexRow>

        <S.FlexRow>
          <S.FlexCol>
            <S.TertiaryHeading>Child's First Name</S.TertiaryHeading>
            <S.ReadOnlyValue>{firstName}</S.ReadOnlyValue>
          </S.FlexCol>
          <S.FlexCol>
            <S.TertiaryHeading>Child's Last Name</S.TertiaryHeading>
            <S.ReadOnlyValue>{lastName}</S.ReadOnlyValue>
          </S.FlexCol>
        </S.FlexRow>

        <S.FlexRow>
          {email && (
            <S.FlexCol>
              <S.TertiaryHeading>Child's Email</S.TertiaryHeading>
              <S.ReadOnlyValue>{email}</S.ReadOnlyValue>
            </S.FlexCol>
          )}
          <S.FlexCol>
            <S.TertiaryHeading>Child's Birthday</S.TertiaryHeading>
            <S.ReadOnlyValue>{birthday}</S.ReadOnlyValue>
          </S.FlexCol>
        </S.FlexRow>

        <S.FlexRow>
          <S.FlexCol>
            <S.TertiaryHeading>Biological Sex</S.TertiaryHeading>
            <S.ReadOnlyValue>{sex === "M" ? "Male" : "Female"}</S.ReadOnlyValue>
          </S.FlexCol>
          {sex === "F" && (
            <S.FlexCol>
              <S.TertiaryHeading>Currently Pregnant</S.TertiaryHeading>
              <S.ReadOnlyValue>{displayPregnancyStatus()}</S.ReadOnlyValue>
            </S.FlexCol>
          )}
        </S.FlexRow>

        <S.FlexRow>
          <S.FlexCol>
            <S.TertiaryHeading>Race</S.TertiaryHeading>
            <S.ReadOnlyValue>{race}</S.ReadOnlyValue>
          </S.FlexCol>
          <S.FlexCol>
            <S.TertiaryHeading>Ethnicity</S.TertiaryHeading>
            <S.ReadOnlyValue>{ethnicity}</S.ReadOnlyValue>
          </S.FlexCol>
        </S.FlexRow>

        {collectionDate && collectionTime && (
          <div>
            <S.SecondaryHeading>
              Sample Collection Information
            </S.SecondaryHeading>

            <S.FlexRow>
              <S.FlexCol>
                <S.TertiaryHeading>Date</S.TertiaryHeading>
                <S.ReadOnlyValue>
                  {dayjs(collectionDate).format("MM/DD/YYYY")}
                </S.ReadOnlyValue>
              </S.FlexCol>
              <S.FlexCol>
                <S.TertiaryHeading>Time</S.TertiaryHeading>
                <S.ReadOnlyValue>
                  {collectionTime.format("h:mma")}
                </S.ReadOnlyValue>
              </S.FlexCol>
            </S.FlexRow>
          </div>
        )}

        <S.FlexRow justifyContent="space-between">
          <S.Step>Current Status</S.Step>
          <S.EditLink onClick={() => goToStep(2)} label="Edit"></S.EditLink>
        </S.FlexRow>

        <S.Label withMargin={true}>
          Select the option that best fits the child's symptoms
        </S.Label>
        <S.ReadOnlyValue>{SYMPTOMS_LABELS[symptoms]}</S.ReadOnlyValue>

        {symptoms !== "no symptoms" && (
          <>
            <S.Label withMargin={true}>
              What was the date when the child's symptoms started?
            </S.Label>
            <S.ReadOnlyValue>
              {dayjs(symptomsStartDate).format("MM/DD/YYYY")}
            </S.ReadOnlyValue>
          </>
        )}

        <S.Label withMargin={true}>
          Please describe the child's exposure to COVID-19
        </S.Label>
        <S.ReadOnlyValue>{EXPOSURE_LABELS[exposure]}</S.ReadOnlyValue>

        <S.Label withMargin={true}>
          Is this the child's first COVID-19 test?
        </S.Label>
        <S.ReadOnlyValue>{firstTest === true ? "Yes" : "No"}</S.ReadOnlyValue>

        <S.Label withMargin={true}>
          Does the child live in a congregate setting?
        </S.Label>
        <S.ReadOnlyValue>
          {congregateSetting === true ? "Yes" : "No"}
        </S.ReadOnlyValue>

        <S.Label withMargin={true}>
          Do any of the following apply to the child?
        </S.Label>
        <S.ReadOnlyValue>
          {underlyingConditions === true ? "Yes" : "No"}
        </S.ReadOnlyValue>

        <S.Footer>
          <S.FlexDiv>
            <S.KitRegistrationPrevButton
              appearance="secondary"
              data-cy="kit-info-previous"
              onClick={goToPreviousStep}
            >
              Back
            </S.KitRegistrationPrevButton>
            <S.KitRegistrationNextButton
              middleStep={true}
              type="submit"
              data-cy="kit-info-next"
              disabled={isLoading || isEverlywellSuperAdmin}
            >
              {isLoading ? <div className="loader" /> : "Register Kit"}
            </S.KitRegistrationNextButton>
          </S.FlexDiv>
        </S.Footer>
      </form>
    </div>
  )
}

export default KitConfirmationStep
