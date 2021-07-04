import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import RandExp from "randexp"

import { KitRegistrationContext } from "contexts/kitRegistration"

import { getThirdPartyIdConfig, isValidId, isValidEmail } from "utils/helper"

import {
  anyTimeOfDayTimeOptionsWithIncrement,
  currentTimeWithIncrement,
  age,
} from "utils/datetime"

import { RACES, ETHNICITIES } from "utils/constants"

import DatePicker from "../../atoms/common/DatePicker"
import TimePicker from "components/atoms/common/TimePicker/WithIncrement"
import Footer from "./footer"

import * as S from "./styles"

const TIME_INCREMENT = 15
const MIN_AGE = 4
const MAX_AGE = 21
const AGE_FORMAT = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
const EMAIL_SAMPLE = "johndoe@email.com"
const ERRORS = {
  min_age: `Minimum age is ${MIN_AGE} years old`,
  max_age: `Maximum age is ${MAX_AGE} years old`,
  age_format: "Must be in MM/DD/YYYY format",
}

const generateSample = (label, regex_format) => {
  if (label?.toLowerCase()?.includes("email")) {
    return EMAIL_SAMPLE
  }

  const length = regex_format ? new RandExp(regex_format).gen().length : 8
  return "X".repeat(length)
}

/**
 * Kit Information page
 */
const KitInfoStep = ({ moveForward, moveBackward }) => {
  const {
    kitId,
    selectedEnterpriseClient,
    thirdPartyMemberId,
    partnerConfig,
    isRapidTest,
    firstName,
    lastName,
    email,
    birthday,
    sex,
    pregnancyStatus,
    race,
    ethnicity,
    collectionDate,
    collectionTime,
    setKitRegData,
  } = useContext(KitRegistrationContext)

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
    defaultValues: {
      kitId,
      thirdPartyMemberId,
      firstName,
      lastName,
      email,
      birthday,
      sex,
      pregnancyStatus,
      collectionDate,
      collectionTime,
      race: race || "Select Race",
      ethnicity: ethnicity || "Select Ethnicity",
      client: selectedEnterpriseClient || "-",
    },
  })

  const races = [{ value: "Select Race" }, ...RACES]
  const ethnicities = [{ value: "Select Ethnicity" }, ...ETHNICITIES]

  const [selectedSex, setSelectedSex] = useState(sex)
  const [selectedPregnant, setSelectedPregnant] = useState(
    pregnancyStatus || "Select Pregnancy Status"
  )
  const [selectedDate, setSelectedDate] = useState(
    isRapidTest ? null : collectionDate || new Date()
  )
  const [selectedTime, setSelectedTime] = useState(
    isRapidTest
      ? null
      : collectionTime || currentTimeWithIncrement(TIME_INCREMENT)
  )
  const [thirdPartyConfig, setThirdPartyConfig] = useState({
    label: "",
    regex_format: "",
    sample: "",
    third_party_id_registration_enabled: false,
    user_email_required: false,
  })
  const [useThirdPartyId, setUseThirdPartyId] = useState(false)
  const [useEmail, setUseEmail] = useState(false)
  const [useIdAndEmail, setUseIdAndEmail] = useState(false)

  useEffect(() => {
    const {
      label,
      regex_format,
      third_party_id_registration_enabled,
      user_email_required,
    } = getThirdPartyIdConfig(partnerConfig)
    const sample = generateSample(label, regex_format)
    setThirdPartyConfig({
      label,
      regex_format,
      sample,
      third_party_id_registration_enabled,
      user_email_required,
    })
    setUseThirdPartyId(
      third_party_id_registration_enabled || !user_email_required
    )
    setUseEmail(user_email_required)
    setUseIdAndEmail(user_email_required && third_party_id_registration_enabled)
  }, [partnerConfig])

  useEffect(() => {
    if (selectedSex === "M") {
      setSelectedPregnant("Select Pregnancy Status")
    }
  }, [selectedSex])

  const validateThirdPartyIdInput = value => {
    return (
      isValidId(value, thirdPartyConfig.regex_format) ||
      (!value && useIdAndEmail) || // input is empty and not required
      `Please enter a valid ${thirdPartyConfig.label}`
    )
  }

  const watchFields = watch()

  const onSubmit = data => {
    const contextData = {
      selectedEnterpriseClient: data.client,
      thirdPartyMemberId: data.thirdPartyMemberId || thirdPartyMemberId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || email,
      birthday: data.birthday,
      race: data.race,
      ethnicity: data.ethnicity,
      sex: selectedSex,
      pregnancyStatus: selectedPregnant,
      collectionDate: selectedDate,
      collectionTime: selectedTime,
    }

    setKitRegData(contextData)
    moveForward()
  }

  // Get a date object for the current time
  const minDate = new Date()
  // Set it to one month ago
  minDate.setMonth(minDate.getMonth() - 1)
  // Zero the time component
  minDate.setHours(0, 0, 0, 0)

  // Get a date object for the current time
  const maxDate = new Date()
  // Set it to 3 months later
  maxDate.setMonth(maxDate.getMonth() + 3)
  // Zero the time component
  maxDate.setHours(0, 0, 0, 0)

  return (
    <div>
      <S.Title>Participant Information</S.Title>
      <S.Subtitle center>
        Please enter some information about the participant
      </S.Subtitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormSection>
          <S.FlexRow>
            <S.InputContainer noMargin={!useIdAndEmail}>
              <S.StyledInput
                name="client"
                id="client"
                label="Client"
                disabled={true}
                ref={register}
              />
            </S.InputContainer>
          </S.FlexRow>
          {useEmail && (
            <S.FlexRow>
              <S.StyledInput
                name="email"
                id="email"
                label="User's Email"
                placeholder={EMAIL_SAMPLE}
                ref={register({
                  required: `Please enter a valid email`,
                  validate: value =>
                    isValidEmail(value) || `Please enter a valid email`,
                })}
                error={errors?.email?.message}
              />
            </S.FlexRow>
          )}
          {useThirdPartyId && (
            <S.FlexRow>
              <S.StyledInput
                name="thirdPartyMemberId"
                id="thirdPartyMemberId"
                label={thirdPartyConfig.label}
                placeholder={thirdPartyConfig.sample}
                ref={register({
                  required:
                    !useIdAndEmail &&
                    `Please enter a valid ${thirdPartyConfig.label}`,
                  validate: value => validateThirdPartyIdInput(value),
                })}
                error={errors?.thirdPartyMemberId?.message}
              />
            </S.FlexRow>
          )}
          <S.FlexRow>
            <S.InputContainer>
              <S.StyledInput
                name="firstName"
                id="firstName"
                label="Child's First Name *"
                placeholder="John"
                ref={register({
                  required: "Please enter a valid name",
                })}
                error={errors?.firstName?.message}
              />
            </S.InputContainer>
            <S.InputContainer noMargin>
              <S.StyledInput
                name="lastName"
                id="lastName"
                label="Child's Last Name *"
                placeholder="Doe"
                ref={register({
                  required: "Please enter a valid name",
                })}
                error={errors?.lastName?.message}
              />
            </S.InputContainer>
          </S.FlexRow>
          <S.BodyCopySmall>
            * Make sure the name matches what is written on the collection
            label.
          </S.BodyCopySmall>
          <S.StyledInput
            label="Child's Birthday"
            placeholder="MM/DD/YYYY"
            name="birthday"
            ref={register({
              validate: {
                minAge: value => age(value) >= MIN_AGE || ERRORS.min_age,
                maxAge: value => age(value) <= MAX_AGE || ERRORS.max_age,
              },
              pattern: {
                value: AGE_FORMAT,
                message: ERRORS.age_format,
              },
              required: "Please enter vaild date",
            })}
            error={errors?.birthday?.message}
          />
          <S.Label>Biological Sex</S.Label>
          <S.FlexDiv>
            <S.RadioWrapper key="female">
              <S.StyledRadioButton
                id="female"
                name="female"
                label="Female"
                onChange={() => setSelectedSex("F")}
                checked={selectedSex === "F"}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="male">
              <S.StyledRadioButton
                id="male"
                name="male"
                label="Male"
                onChange={() => setSelectedSex("M")}
                checked={selectedSex === "M"}
              />
            </S.RadioWrapper>
          </S.FlexDiv>
          <S.Label disabled={selectedSex !== "F"}>Currently Pregnant</S.Label>
          <S.FlexDiv>
            <S.RadioWrapper key="not_pregnant">
              <S.StyledRadioButton
                id="not_pregnant"
                name="not_pregnant"
                label="Not Pregnant"
                onChange={() => setSelectedPregnant(false)}
                checked={selectedPregnant === false}
                disabled={selectedSex !== "F"}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="pregnant">
              <S.StyledRadioButton
                id="pregnant"
                name="pregnant"
                label="Pregnant"
                onChange={() => setSelectedPregnant(true)}
                checked={selectedPregnant === true}
                disabled={selectedSex !== "F"}
              />
            </S.RadioWrapper>
            <S.RadioWrapper key="unknown_pregnant">
              <S.StyledRadioButton
                id="unknown_pregnant"
                name="unknown_pregnant"
                label="Unknown"
                onChange={() => setSelectedPregnant(null)}
                checked={selectedPregnant === null}
                disabled={selectedSex !== "F"}
              />
            </S.RadioWrapper>
          </S.FlexDiv>
          <S.FlexRow>
            <S.InputContainer>
              <S.Select
                items={races}
                label="Race"
                name="race"
                id="race"
                ref={register}
              />
            </S.InputContainer>
            <S.InputContainer noMargin>
              <S.Select
                items={ethnicities}
                label="Ethnicity"
                name="ethnicity"
                id="ethnicity"
                ref={register}
              />
            </S.InputContainer>
          </S.FlexRow>
        </S.FormSection>
        {!isRapidTest && (
          <S.FormSection hideBorder={true}>
            <S.Step>Sample Collection Information</S.Step>
            <S.BodyCopy>
              Enter the time when you intend to collect the sample
            </S.BodyCopy>
            <S.FlexRow>
              <S.InputContainer>
                <DatePicker
                  label="Date"
                  boldLabel={false}
                  name="collectionDate"
                  id="collectionDate"
                  value={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  minDate={minDate}
                  maxDate={maxDate}
                  minDateMessage={"Minimum date is 1 month ago"}
                  maxDateMessage={"Maximum date is 3 months from now"}
                  ref={register}
                />
              </S.InputContainer>
              <S.InputContainer noMargin>
                <S.Label>Time</S.Label>
                <TimePicker
                  style={{ height: "3rem" }}
                  time={selectedTime}
                  setTime={setSelectedTime}
                  timeOptions={anyTimeOfDayTimeOptionsWithIncrement(
                    TIME_INCREMENT
                  )}
                />
              </S.InputContainer>
            </S.FlexRow>
          </S.FormSection>
        )}
        <S.FlexDiv>
          <S.KitRegistrationPrevButton
            appearance="secondary"
            data-cy="kit-info-previous"
            onClick={moveBackward}
          >
            Back
          </S.KitRegistrationPrevButton>
          <S.KitRegistrationNextButton
            type="submit"
            middleStep
            data-cy="kit-info-next"
            disabled={
              watchFields.race === "Select Race" ||
              watchFields.ethnicity === "Select Ethnicity" ||
              Object.keys(errors).length > 0 ||
              !selectedSex ||
              (selectedSex === "F" &&
                selectedPregnant === "Select Pregnancy Status") ||
              !watchFields.kitId ||
              !watchFields.firstName ||
              !watchFields.lastName ||
              !watchFields.birthday ||
              (useEmail && !watchFields.email) ||
              (!useEmail && !watchFields.thirdPartyMemberId)
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

export default KitInfoStep
