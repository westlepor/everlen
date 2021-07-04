import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"

import { KitRegistrationContext } from "contexts/kitRegistration"
import { SYMPTOMS_LABELS, EXPOSURE_LABELS } from "utils/constants"

import DatePicker from "../../atoms/common/DatePicker"
import Footer from "./footer"

import * as S from "./styles"

const MIN_SYMPTOMS_DATE = new Date(2020, 1, 1) // What date should this be? Covid acknowledgment?

/**
 * (Participant's) Current Status page
 */
const CurrentStatusStep = ({ moveForward, moveBackward }) => {
  const {
    symptoms,
    symptomsStartDate,
    exposure,
    firstTest,
    congregateSetting,
    underlyingConditions,
    setKitRegData,
  } = useContext(KitRegistrationContext)

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      symptoms: symptoms,
      exposure: exposure,
      symptomsStartDate: symptomsStartDate,
      firstTest: firstTest,
      congregateSetting: congregateSetting,
      underlyingConditions: underlyingConditions,
    },
  })

  const [selectedSymptoms, setSelectedSymptoms] = useState(symptoms)
  const [selectedDate, updateSelectedDate] = useState(symptomsStartDate)
  const [prevSelectedDate, updatePrevSelectedDate] = useState(null)
  const [datePickerHidden, updateDateHidden] = useState(symptoms)
  const [selectedExposure, setSelectedExposure] = useState(exposure)
  const [selectedIsFirstTest, updateIsFirstTest] = useState(firstTest)
  const [selectedCongregateSetting, updateCongregateSetting] = useState(
    congregateSetting
  )
  const [selectedUnderlyingConditions, updateUnderlyingConditions] = useState(
    underlyingConditions
  )

  useEffect(() => {
    if (selectedSymptoms === "no symptoms" || !selectedSymptoms) {
      updateDateHidden(true)
      updatePrevSelectedDate(selectedDate)
      updateSelectedDate(null)
    } else {
      updateDateHidden(false)
      updateSelectedDate(selectedDate || prevSelectedDate || new Date())
    }
    // eslint-disable-next-line
  }, [selectedSymptoms])

  const symptoms_options = [
    {
      name: "no_symptoms",
      label: SYMPTOMS_LABELS["no symptoms"],
      value: "no symptoms",
    },
    {
      name: "mild_symptoms",
      label: SYMPTOMS_LABELS["mild"],
      value: "mild",
    },
    {
      name: "severe_symptoms",
      label: SYMPTOMS_LABELS["severe"],
      value: "severe",
    },
  ]

  const exposure_options = [
    {
      name: "not exposed",
      label: EXPOSURE_LABELS["not exposed"],
    },
    {
      name: "area community spread",
      label: EXPOSURE_LABELS["area community spread"],
    },
    {
      name: "sick contact",
      label: EXPOSURE_LABELS["sick contact"],
    },
    {
      name: "known exposure",
      label: EXPOSURE_LABELS["known exposure"],
    },
  ]

  const getContextData = () => {
    return {
      symptoms: selectedSymptoms,
      symptomsStartDate: selectedDate,
      exposure: selectedExposure,
      firstTest: selectedIsFirstTest === "" ? "" : !!selectedIsFirstTest,
      congregateSetting:
        selectedCongregateSetting === "" ? "" : !!selectedCongregateSetting,
      underlyingConditions:
        selectedUnderlyingConditions === ""
          ? ""
          : !!selectedUnderlyingConditions,
    }
  }
  const stepBack = () => {
    const contextData = getContextData()

    setKitRegData(contextData)
    moveBackward()
  }

  const onSubmit = () => {
    const contextData = getContextData()

    setKitRegData(contextData)
    moveForward()
  }

  return (
    <div>
      <S.Title>Participant's Current Status</S.Title>
      <S.Subtitle center>Please answer the following questions</S.Subtitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormSection hideBorder={true} smallPadding={true}>
          <S.Prompt>
            Select the option that best fits the child's symptons:
          </S.Prompt>
          {symptoms_options.map(opt => {
            return (
              <S.RadioWrapper key={opt.name}>
                <S.WideStyledRadioButton
                  id={opt.name}
                  name={opt.name}
                  label={opt.label}
                  onChange={() => setSelectedSymptoms(opt.value)}
                  checked={selectedSymptoms === opt.value}
                />
              </S.RadioWrapper>
            )
          })}
        </S.FormSection>
        <S.FormSection
          hideBorder={true}
          smallPadding={true}
          hideSection={datePickerHidden}
        >
          <S.Prompt>
            What was the date when the child's symptoms started?
          </S.Prompt>
          <S.FlexDiv>
            <DatePicker
              label="Date"
              boldLabel={false}
              name="symptomsStartDate"
              id="symptomsDate"
              value={selectedDate}
              disablePast={false}
              disableFuture={true}
              minDate={MIN_SYMPTOMS_DATE}
              onChange={date => updateSelectedDate(date)}
              ref={register}
            />
          </S.FlexDiv>
        </S.FormSection>
        <S.FormSection hideBorder={true} smallPadding={true}>
          <S.Prompt>
            Please describe the child's exposure to Coronavirus.
          </S.Prompt>
          {exposure_options.map(opt => {
            return (
              <S.RadioWrapper key={opt.name}>
                <S.WideStyledRadioButton
                  id={opt.name}
                  name={opt.name}
                  label={opt.label}
                  onChange={() => setSelectedExposure(opt.name)}
                  checked={selectedExposure === opt.name}
                />
              </S.RadioWrapper>
            )
          })}
        </S.FormSection>
        <S.FormSection hideBorder={true} smallPadding={true}>
          <S.Prompt>Is this the child's first COVID-19 test?</S.Prompt>
          <S.FlexDiv>
            <S.RadioWrapper key="first_test">
              <S.StyledRadioButton
                id="first_test"
                name="first_test"
                label="Yes"
                onChange={() => updateIsFirstTest(true)}
                checked={selectedIsFirstTest === true}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="not_first_test">
              <S.StyledRadioButton
                id="not_first_test"
                name="not_first_test"
                label="No"
                onChange={() => updateIsFirstTest(false)}
                checked={selectedIsFirstTest === false}
              />
            </S.RadioWrapper>
          </S.FlexDiv>
        </S.FormSection>
        <S.FormSection hideBorder={true} smallPadding={true}>
          <S.Prompt noMargin={true}>
            Does the child live in a congregate setting?
          </S.Prompt>
          <S.BodyCopy>
            (e.g. nursing homes, residential care, psychiatric treatment
            facilities, group homes, board and care homes, homeless shelter,
            foster care or other setting)
          </S.BodyCopy>
          <S.FlexDiv>
            <S.RadioWrapper key="congregate">
              <S.StyledRadioButton
                id="congregate"
                name="congregate"
                label="Yes"
                onChange={() => updateCongregateSetting(true)}
                checked={selectedCongregateSetting === true}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="not_congregate">
              <S.StyledRadioButton
                id="not_congregate"
                name="not_congregate"
                label="No"
                onChange={() => updateCongregateSetting(false)}
                checked={selectedCongregateSetting === false}
              />
            </S.RadioWrapper>
          </S.FlexDiv>
        </S.FormSection>
        <S.FormSection hideBorder={true} smallPadding={true}>
          <S.Prompt>
            Do any of the following apply to the child? (Yes/No)
          </S.Prompt>
          <S.BodyUL>
            <S.BodyLI>
              Chronic conditions (diabetes, high blood pressure, lung disease
              etc.)
            </S.BodyLI>
            <S.BodyLI>
              Weakened immune system (AIDS, rheumatoid arthritis, chemotherapy,
              steroids, organ or bone marrow transplant, etc.)
            </S.BodyLI>
            <S.BodyLI>Heart condition (heart attacks, stroke, etc.)</S.BodyLI>
            <S.BodyLI>Neurologic condition or had a stroke</S.BodyLI>
            <S.BodyLI>Pregnancy</S.BodyLI>
            <S.BodyLI>Regular smoking or vaping</S.BodyLI>
            <S.BodyLI>Overweight or Obese</S.BodyLI>
          </S.BodyUL>
          <S.FlexDiv>
            <S.RadioWrapper key="additional_vars">
              <S.StyledRadioButton
                id="additional_vars"
                name="additional_vars"
                label="Yes"
                onChange={() => updateUnderlyingConditions(true)}
                checked={selectedUnderlyingConditions === true}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="no_additional_vars">
              <S.StyledRadioButton
                id="no_additional_vars"
                name="no_additional_vars"
                label="No"
                onChange={() => updateUnderlyingConditions(false)}
                checked={selectedUnderlyingConditions === false}
              />
            </S.RadioWrapper>
          </S.FlexDiv>
        </S.FormSection>
        <S.Prompt>
          Note: The COVID-19 PCR test result may be shared with state and
          federal officials.
        </S.Prompt>
        <S.FlexDiv>
          <S.KitRegistrationPrevButton
            appearance="secondary"
            data-cy="kit-info-previous"
            onClick={stepBack}
          >
            Back
          </S.KitRegistrationPrevButton>
          <S.KitRegistrationNextButton
            middleStep={true}
            type="submit"
            data-cy="kit-info-next"
            disabled={
              !selectedSymptoms ||
              (selectedSymptoms !== "no symptoms" && !selectedDate) ||
              !selectedExposure ||
              selectedIsFirstTest === "" ||
              selectedCongregateSetting === "" ||
              selectedUnderlyingConditions === ""
            }
          >
            Next
          </S.KitRegistrationNextButton>
        </S.FlexDiv>
      </form>
      <Footer />
    </div>
  )
}

export default CurrentStatusStep
