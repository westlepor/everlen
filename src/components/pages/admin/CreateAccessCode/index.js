import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { toast } from "react-toastify"

import { SessionContext } from "contexts/session"
import {
  useClients,
  usePartnerProducts,
  useCreateAccessCodeMutation,
  useHasuraClaims,
  useSuperAdmin,
  usePartnerConfig,
} from "hooks"

import { checkAccessCodeExistance } from "../../../../api"

import * as S from "./styles"

import {
  TOAST_MSG,
  TOAST_DESC,
  DELIVERY_OPTIONS,
  HASURA_ROLE,
} from "utils/constants"
import {
  formatTimezoneDate,
  getActiveTimezones,
  getDefaultTimezone,
  getTimezoneOffset,
} from "utils/datetime"

import Toast from "components/common/Toast"

import StyledCheckbox from "components/atoms/check"
import DeliveryOptionsSelector from "components/molecules/admin/DeliveryOptionsSelector"
import DatePicker from "components/atoms/common/DatePicker"
import TimezoneSelector from "components/molecules/admin/TimezoneSelector"

const codeFrequencyRadioButtons = [
  { name: "once", label: "Use only once" },
  { name: "multiple", label: "Use more than once" },
]

const testTakerPaidRadioButton = {
  name: "test_taker_paid",
  label: "Test Taker",
}
const enterpriseClientPaidRadioButton = {
  name: "enterprise_client_paid",
  label: "Enterprise Client",
}
const paymentOptionsRadioButtons = [
  enterpriseClientPaidRadioButton,
  testTakerPaidRadioButton,
]

const occurrenceChoices = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "Quarterly", value: "quarter" },
  { label: "Semi-Annual", value: "semiannual" },
  { label: "Annually", value: "year" },
]

const sliderMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 6,
    label: "6",
  },
]

const maxFrequencyAmount = 6

const CODE_VALIDATION_REGEX = /^[a-z0-9-]+$/i
const INVALID_CODE_ERROR_MESSAGE = "Please enter alphanumeric characters only."
const EXISTING_CODE_ERROR_MESSAGE = "is an access code that is already in use."

const CreateAccessCode = () => {
  const { user, targetUser } = useContext(SessionContext) || {}
  const [timezone, setTimezone] = useState(
    !!getActiveTimezones()[getTimezoneOffset()]
      ? getTimezoneOffset()
      : getDefaultTimezone()
  )

  const {
    isEnterprisePartnerClinicalAdmin,
    isEnterpriseClientClinicalAdmin,
    hasAccessToMultipleClients,
  } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    targetRole,
    hasTargetAccessToMultipleClients,
  } = useSuperAdmin(user, targetUser)

  const isClientAdmin =
    isEnterpriseClientClinicalAdmin ||
    (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.client)
  const isPartnerAdmin =
    isEnterprisePartnerClinicalAdmin ||
    (isEverlywellSuperAdmin && targetRole === HASURA_ROLE.partner)
  const hasMultipleClients =
    hasAccessToMultipleClients ||
    (isEverlywellSuperAdmin && hasTargetAccessToMultipleClients)
  const isShowClient = isClientAdmin && hasMultipleClients

  const [createAccessCode] = useCreateAccessCodeMutation({ user })

  const { data: products } = usePartnerProducts(user, targetUser)
  const enterprisePartnerProducts =
    products?.enterprise_partner_products?.map(product => ({
      ...product,
      name: product?.spree_product?.name,
    })) || []

  const { enterprise_partner_id } = targetUser
  const {
    data: enterprisePartnerConfig,
    loading: isEnterprisePartnerConfigLoading,
  } = usePartnerConfig(user, {
    partner_id: enterprise_partner_id,
  })

  const partnerConfigs =
    enterprisePartnerConfig?.enterprise_partner_configs || []
  const initiallyEnabled = partnerConfigs[0]?.paid_access_codes_enabled

  const [paidAccessCodesEnabled, setPaidAccessCodesEnabled] = useState(
    initiallyEnabled
  )

  const { data } = useClients(user, targetUser)

  const enterpriseClients =
    data?.enterprise_clients
      ?.map(client => ({ ...client, value: client.name }))
      ?.sort((a, b) => a.value.localeCompare(b.value)) || []

  const clients = [{ value: "Select Client" }, ...enterpriseClients]

  const [selectedTests, updateSelectedTests] = useState([])
  const [hasDefaultTest, setHasDefaultTest] = useState(false)
  const [selectedFrequency, updateSelectedFrequency] = useState(
    codeFrequencyRadioButtons[0].name
  )
  const [selectedPaymentOption, updateSelectedPaymentOption] = useState(
    enterpriseClientPaidRadioButton.name
  )
  const [selectedOccurrence, updateSelectedOccurrence] = useState("month")
  const [frequencyAmount, updateFrequencyAmount] = useState(
    maxFrequencyAmount / 2
  )
  const [startDate, updateStartDate] = useState(new Date())
  const [endDate, updateEndDate] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const deliveryOptions = DELIVERY_OPTIONS
  const [selectedDeliveryOptionIds, updateDeliveryOptionIds] = useState([
    DELIVERY_OPTIONS[0].id,
  ])

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    setError,
    clearErrors,
  } = useForm()

  const watchFields = watch()

  const handleTestSelection = (_event, checked, testId) => {
    let newSelectedTests = [...selectedTests]

    if (checked) {
      newSelectedTests.push(testId)
    } else {
      newSelectedTests.splice(newSelectedTests.indexOf(testId), 1)
    }

    updateSelectedTests(newSelectedTests)
    setHasDefaultTest(true)
  }

  const handleLimitChange = ({ target: { value } }) => {
    if (!value) {
      return value
    }

    const formattedValue = value
      .replace(/[^\d]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    setValue("usageLimit", formattedValue)
  }

  const handleDeliveryOption = ({ id, isChecked }) => {
    if (isChecked) {
      updateDeliveryOptionIds(prev => [...prev, id])
    } else {
      updateDeliveryOptionIds(prev =>
        prev.filter(selectedId => selectedId !== id)
      )
    }
  }

  const codeErrorMessage = () => {
    if (!errors.code) {
      return ""
    }

    if (!!errors?.code?.message) {
      return errors.code.message
    }

    if (errors?.code?.type === "validate") {
      return INVALID_CODE_ERROR_MESSAGE
    }

    if (errors?.code?.type === "existance") {
      return `${watchFields?.code?.toUpperCase()} ${EXISTING_CODE_ERROR_MESSAGE}`
    }
  }

  const handleCodeChange = event => {
    const value = event.target.value

    if (!!value) {
      if (!new RegExp(CODE_VALIDATION_REGEX).test(value)) {
        setError("code", {
          type: "validate",
          message: INVALID_CODE_ERROR_MESSAGE,
        })
      } else {
        setIsLoading(true)

        checkAccessCodeExistance(value?.toUpperCase(), status => {
          if (status === 200) {
            clearErrors()
          } else {
            setError("code", {
              type: "existance",
              message: `${value?.toUpperCase()} ${EXISTING_CODE_ERROR_MESSAGE}`,
            })
          }

          setIsLoading(false)
        })
      }
    } else {
      clearErrors("code")
    }
  }

  const onSubmit = data => {
    const { name, code, usageLimit, client } = data

    let optionalPayload = {}

    // Enterprise Client ID
    const enterpriseClient = hasMultipleClients
      ? enterpriseClients.find(c => c.value === client)
      : enterpriseClients[0]

    if (!!enterpriseClient?.id) {
      optionalPayload.enterprise_client_id = enterpriseClient.id
    }

    // Max Orders
    if (!!usageLimit) {
      const maxOrders = Number(usageLimit.replace(/[^\d]/g, ""))

      if (maxOrders > 0) {
        optionalPayload.max_orders = maxOrders
      }
    }

    // Closes At
    if (!!endDate) {
      optionalPayload.closes_at = formatTimezoneDate({
        date: endDate,
        timezone,
        isEnd: true,
      })
    }

    // Max Participant Orders Per Period AND/MAYBE Participant Order Period
    if (
      selectedFrequency === "multiple" &&
      !!frequencyAmount &&
      !!selectedOccurrence
    ) {
      optionalPayload.max_participant_orders_per_period = frequencyAmount
      optionalPayload.participant_order_period = selectedOccurrence
    } else {
      optionalPayload.max_participant_orders_per_period = 1
    }

    if (
      paidAccessCodesEnabled &&
      selectedPaymentOption === testTakerPaidRadioButton.name
    ) {
      optionalPayload.test_taker_paid = true
    }

    const payload = {
      name,
      code: code.toUpperCase(),
      opens_at: formatTimezoneDate({ date: startDate, timezone }),
      enterprise_partner_product_ids: selectedTests.join(","),
      shipping_method_ids: selectedDeliveryOptionIds,
      ...optionalPayload,
    }

    setIsLoading(true)

    createAccessCode({
      user,
      variables: {
        ...payload,
      },
    })
      .then(() => {
        navigate(`/app/access_codes`)

        toast(
          <Toast
            message={TOAST_MSG.CODE_CREATED}
            description={TOAST_DESC.CODE_CREATED}
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

  const registerClient = isShowClient
    ? {
      required: isShowClient,
      pattern: {
        value: /^(?!Select Client)/,
        message: "Please select client",
      },
    }
    : {}

  const testOptions = enterprisePartnerProducts.filter(product => {
    if (isClientAdmin && !hasMultipleClients) {
      return true
    }

    if (isShowClient) {
      return (
        product.enterprise_client_id ===
        clients.find(c => c.value === watchFields.client)?.id
      )
    }

    if (isPartnerAdmin) {
      if (!watchFields.client || watchFields.client === "Select Client") {
        return !product.enterprise_client_id
      } else {
        return (
          product.enterprise_client_id ===
          clients.find(c => c.value === watchFields.client)?.id
        )
      }
    }
    return false
  })

  const handleClientChange = event => {
    setHasDefaultTest(false)

    let updatedValue
    const selectedClient = enterpriseClients.find(
      client => client.value === event.target.value
    )

    if (selectedClient) {
      updatedValue =
        selectedClient.enterprise_partner_configs[0].paid_access_codes_enabled
    } else {
      updatedValue = initiallyEnabled
    }

    setPaidAccessCodesEnabled(updatedValue)

    if (selectedTests.length > 0) {
      updateSelectedTests([])
    }
  }

  useEffect(() => {
    if (testOptions.length === 1 && !hasDefaultTest) {
      handleTestSelection(null, true, testOptions[0].id)
    }

    if (!paidAccessCodesEnabled) {
      updateSelectedPaymentOption(enterpriseClientPaidRadioButton.name)
    }

    if (
      !isEnterprisePartnerConfigLoading &&
      paidAccessCodesEnabled === undefined
    ) {
      setPaidAccessCodesEnabled(initiallyEnabled)
    }

    // eslint-disable-next-line
  }, [
    testOptions,
    hasDefaultTest,
    initiallyEnabled,
    isEnterprisePartnerConfigLoading,
    paidAccessCodesEnabled,
  ])

  return (
    <S.OuterWrapper>
      <S.BackLink to="/app/access_codes">Back</S.BackLink>

      <S.InnerWrapper>
        <S.Title>Create Access Code</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormSection>
            <S.Step>1. Set Up</S.Step>
            <S.BodyCopy>
              Create an access code for participant to order tests
            </S.BodyCopy>
            {hasMultipleClients && (
              <S.Select
                items={clients}
                label="Client"
                name="client"
                id="client"
                onChange={handleClientChange}
                ref={register(registerClient)}
              />
            )}

            <S.StyledInput
              name="name"
              id="name"
              label="Name"
              ref={register({
                required: "Please enter a valid name",
              })}
              error={errors?.name?.message}
            />
            <S.AccessCodeInput
              name="code"
              id="code"
              label="Unique Access Code"
              placeholder="Alphanumerical code"
              ref={register({
                required: "Please enter a valid access code",
                validate: value =>
                  new RegExp(CODE_VALIDATION_REGEX).test(value),
              })}
              onChange={handleCodeChange}
              error={codeErrorMessage()}
              validated={watchFields.code}
            />
            <S.GridDiv>
              <DatePicker
                label="Start Date"
                name="startDate"
                value={startDate}
                onChange={date => {
                  updateStartDate(date)

                  if (!!endDate && date > endDate) {
                    updateEndDate(null)
                  }
                }}
                disablePast={true}
                ref={register}
              />
              <DatePicker
                name="endDate"
                label="End Date (Optional)"
                value={endDate}
                onChange={updateEndDate}
                ref={register}
                minDate={startDate}
              />
            </S.GridDiv>
            <S.TimezoneWrapper>
              <S.Label>Timezone</S.Label>
              <TimezoneSelector
                timezone={timezone}
                setTimezone={timezone => {
                  setTimezone(timezone)
                }}
              />
            </S.TimezoneWrapper>
            <DeliveryOptionsSelector
              options={deliveryOptions}
              selectedDeliveryOptionIds={selectedDeliveryOptionIds}
              onChange={handleDeliveryOption}
            />
          </S.FormSection>
          <S.FormSection>
            <S.Step>2. Select Tests</S.Step>
            <S.BodyCopy>
              Choose the tests you want to include in the access code
            </S.BodyCopy>
            <S.Tests data-cy="tests">
              {watchFields &&
                testOptions.map(test => (
                  <S.TestItem key={test.id}>
                    <S.TestLabel>{test.name}</S.TestLabel>
                    <StyledCheckbox
                      name={test.name}
                      checked={selectedTests.includes(test.id)}
                      onChange={(e, checked) =>
                        handleTestSelection(e, checked, test.id)
                      }
                      ref={register}
                    />
                  </S.TestItem>
                ))}
            </S.Tests>
          </S.FormSection>
          <S.CodeFrequencySection>
            <S.Step>3. Code Frequency & Utilization</S.Step>
            <S.BodyCopy>
              Determine the number of times a code can be used by a participant
            </S.BodyCopy>
            <S.Label>Code Usage</S.Label>
            <S.FlexDiv>
              {codeFrequencyRadioButtons.map(frequency => (
                <S.RadioWrapper key={frequency.name}>
                  <S.StyledRadioButton
                    id={frequency.name}
                    name={frequency.name}
                    label={frequency.label}
                    onChange={() => updateSelectedFrequency(frequency.name)}
                    checked={selectedFrequency === frequency.name}
                  />
                </S.RadioWrapper>
              ))}
            </S.FlexDiv>

            {selectedFrequency === codeFrequencyRadioButtons[1].name && (
              <>
                <S.Label data-cy="frequency-amount">Frequency Amount</S.Label>
                <S.FrequencySlider
                  valueLabelDisplay="on"
                  aria-label="pretto slider"
                  min={1}
                  max={6}
                  value={frequencyAmount}
                  onChange={(_, value) => updateFrequencyAmount(value)}
                  marks={sliderMarks.filter(
                    mark => mark.value !== frequencyAmount
                  )}
                />
                <S.Label>Occurrence</S.Label>
                <S.OccurrenceToggleWrapper data-cy="occurrence">
                  {occurrenceChoices.map(({ label, value }) => {
                    return (
                      <S.OccurrenceToggle
                        key={value}
                        type="button"
                        isActive={selectedOccurrence === value}
                        data-cy={selectedOccurrence === value}
                        onClick={_ => updateSelectedOccurrence(value)}
                      >
                        {label}
                      </S.OccurrenceToggle>
                    )
                  })}
                </S.OccurrenceToggleWrapper>
              </>
            )}

            <S.Label>Usage Limit (Optional)</S.Label>
            <S.UsageLimitCopy>
              The number of times this access code can be used in total. If you
              choose not to set a limit to your access code, it will be set to
              unlimited.
            </S.UsageLimitCopy>
            <S.StyledInput
              name="usageLimit"
              label=""
              id="usageLimit"
              ref={register({ required: false })}
              onChange={handleLimitChange}
            />
          </S.CodeFrequencySection>

          {paidAccessCodesEnabled && (
            <S.PaymentOptionsSection>
              <S.Step>4. Payment Options</S.Step>
              <S.BodyCopy>
                Determine how the test(s) will be paid for
              </S.BodyCopy>
              <S.Label>Responsible for Payment</S.Label>
              <S.FlexDiv>
                {paymentOptionsRadioButtons.map(paymentOption => (
                  <S.RadioWrapper key={paymentOption.name}>
                    <S.StyledRadioButton
                      id={paymentOption.name}
                      name={paymentOption.name}
                      label={paymentOption.label}
                      onChange={() =>
                        updateSelectedPaymentOption(paymentOption.name)
                      }
                      checked={selectedPaymentOption === paymentOption.name}
                    />
                  </S.RadioWrapper>
                ))}
              </S.FlexDiv>
            </S.PaymentOptionsSection>
          )}

          <S.CreateAccessCodeButton
            type="submit"
            data-cy="create-access-code"
            isLoading={isLoading}
            disabled={
              (isShowClient &&
                (!watchFields.client ||
                  watchFields.client === "Select Client")) ||
              !watchFields.name ||
              !watchFields.code ||
              (!!watchFields.code && !!errors.code) ||
              !startDate ||
              selectedTests.length === 0 ||
              selectedDeliveryOptionIds.length === 0 ||
              isEverlywellSuperAdmin
            }
          >
            {isLoading ? <div className="loader" /> : "Create"}
          </S.CreateAccessCodeButton>
        </form>
      </S.InnerWrapper>
    </S.OuterWrapper>
  )
}

export default CreateAccessCode
