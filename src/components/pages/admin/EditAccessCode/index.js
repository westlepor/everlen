import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useParams } from "@reach/router"

import { toast } from "react-toastify"
import dayjs from "dayjs"

import { SessionContext } from "contexts/session"

import {
  useClients,
  useAccessCode,
  useUpdateAccessCodeMutation,
  useHasuraClaims,
  useSuperAdmin,
} from "hooks"

import * as S from "./styles"

import {
  TOAST_MSG,
  TOAST_DESC,
  DELIVERY_OPTIONS,
  HASURA_ROLE,
} from "utils/constants"
import {
  formatTimezoneDate,
  getTimezoneFromCodeDate,
  getDefaultTimezone,
  formatDateByTimezone,
} from "utils/datetime"

import Toast from "components/common/Toast"
import StyledCheckbox from "components/atoms/check"
import Dropdown from "components/atoms/icons/dropdown"
import DeliveryOptionsSelector from "components/molecules/admin/DeliveryOptionsSelector"
import DatePicker from "components/atoms/common/DatePicker"
import TimezoneSelector from "components/molecules/admin/TimezoneSelector"

import Switch from "./Switch"
import { colors } from "@everlywell/leaves"

const codeFrequencyRadioButtons = [
  { name: "once", label: "Use only once" },
  { name: "multiple", label: "Use more than once" },
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

const EditAccessCode = () => {
  const { user, targetUser } = useContext(SessionContext)

  const {
    isEnterpriseClientClinicalAdmin,
    isEnterprisePartnerClinicalAdmin,
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

  const [updateAccessCode] = useUpdateAccessCodeMutation({ user })

  const { code } = useParams()

  const { data: codeData, loading } = useAccessCode({ user, code })

  const [existingCode] = codeData?.access_codes || []

  const isMultipleCodeUsageSelected = !!existingCode?.participant_order_period
  const selectedTests =
    existingCode?.access_code_products?.map(product => ({
      id: product?.enterprise_partner_product?.id,
      name: product?.enterprise_partner_product?.spree_product?.name,
    })) || []

  const { data } = useClients(user, targetUser)
  const enterpriseClients =
    data?.enterprise_clients
      ?.map(client => ({ ...client, value: client.name }))
      ?.sort((a, b) => a.value.localeCompare(b.value)) || []

  const selectedClientName = enterpriseClients?.find(
    c => c.id === existingCode?.enterprise_client_id
  )?.name

  const [startDate, updateStartDate] = useState()
  const [endDate, updateEndDate] = useState()
  const [timezone, setTimezone] = useState(getDefaultTimezone())

  const [active, updateActive] = useState()

  const deliveryOptions = DELIVERY_OPTIONS
  const currentShippingMethodIds =
    existingCode?.access_code_shipping_methods?.map(
      method => method?.spree_shipping_method?.id
    ) || []

  const [selectedDeliveryOptionIds, updateDeliveryOptionIds] = useState(
    currentShippingMethodIds
  )

  useEffect(() => {
    if (!loading && !!existingCode?.id) {
      updateStartDate(formatDateByTimezone({ date: existingCode?.opens_at }))
      updateEndDate(
        !!existingCode?.closes_at
          ? formatDateByTimezone({ date: existingCode?.closes_at })
          : null
      )
      updateActive(existingCode?.active)
      updateDeliveryOptionIds(
        existingCode?.access_code_shipping_methods?.map(
          method => method?.spree_shipping_method?.id
        ) || []
      )
      setTimezone(getTimezoneFromCodeDate(existingCode?.opens_at))
    }
  }, [loading, existingCode])

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const { register, handleSubmit, watch, errors, setValue } = useForm()

  const watchFields = watch()

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

  const onSubmit = data => {
    let { name, usageLimit } = data

    let optionalPayload = {}

    // Max Orders
    const maxOrders = Number(usageLimit?.replace(/[^\d]/g, ""))

    // Closes At
    if (!endDate) {
      optionalPayload.closes_at = null
    }

    // Shipping Method IDs
    if (currentShippingMethodIds !== selectedDeliveryOptionIds) {
      optionalPayload.shipping_method_ids = selectedDeliveryOptionIds
    }

    const payload = {
      id: existingCode.id,
      name,
      active,
      opens_at: formatTimezoneDate({
        date: startDate,
        timezone,
      }),
      closes_at: formatTimezoneDate({
        date: endDate,
        timezone,
        isEnd: true,
      }),
      max_orders:
        !isNaN(maxOrders) && maxOrders > 0
          ? Number(usageLimit?.replace(/[^\d]/g, ""))
          : null,
      ...optionalPayload,
    }

    setIsFormSubmitted(true)

    updateAccessCode({
      user,
      variables: {
        ...payload,
      },
    })
      .then(() => {
        navigate(`/app/access_codes`)

        toast(
          <Toast
            message={TOAST_MSG.CODE_SAVED}
            description={TOAST_DESC.CODE_SAVED}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "success",
            autoClose: 4000,
          }
        )
      })
      .catch(_error => {
        setIsFormSubmitted(false)
      })
  }

  const minDate = dayjs(startDate).isAfter(dayjs()) ? startDate : dayjs()
  const disabledStartDate = dayjs(startDate).isBefore(dayjs())

  return (
    <S.OuterWrapper>
      <S.BackLink to="/app/access_codes">Back</S.BackLink>

      <S.InnerWrapper>
        <S.Title>Edit Access Code</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormSection>
            <S.Step>1. Set Up</S.Step>
            <S.BodyCopy>Access code for participant to order tests</S.BodyCopy>
            {(isShowClient || isPartnerAdmin) && !!selectedClientName && (
              <>
                <S.Label disabled>Client</S.Label>
                <S.DisabledDropdown data-cy="client-disabled-dropdown">
                  <S.Span>{selectedClientName}</S.Span>
                  <Dropdown width="16" height="16" color={colors.gray3} />
                </S.DisabledDropdown>
              </>
            )}

            {!loading && (
              <S.StyledInput
                name="name"
                id="name"
                label="Name"
                ref={register({
                  required: "Please enter a valid name",
                })}
                error={errors?.name?.message}
                defaultValue={existingCode?.name}
              />
            )}

            {!loading && (
              <S.AccessCodeInput
                name="code"
                id="code"
                label="Unique Access Code"
                disabled
                defaultValue={existingCode?.code}
              />
            )}

            {!!existingCode?.id && (
              <>
                <S.GridDiv>
                  <DatePicker
                    label="Start Date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    disabled={disabledStartDate}
                    ref={register({ required: false })}
                    onChange={updateStartDate}
                  />

                  <DatePicker
                    name="endDate"
                    id="endDate"
                    label="End Date (Optional)"
                    value={endDate}
                    onChange={updateEndDate}
                    ref={register({ required: false })}
                    minDate={minDate}
                    minDateMessage="Please enter correct End Date."
                    hideErrorMessage={!!existingCode?.closes_at}
                  />
                </S.GridDiv>
                <S.TimezoneWrapper>
                  <S.Label disabled={disabledStartDate}>Timezone</S.Label>
                  <TimezoneSelector
                    timezone={timezone}
                    setTimezone={timezone => {
                      setTimezone(timezone)
                    }}
                    disabled={disabledStartDate}
                  />
                </S.TimezoneWrapper>
              </>
            )}

            {!loading && (
              <DeliveryOptionsSelector
                options={deliveryOptions}
                selectedDeliveryOptionIds={selectedDeliveryOptionIds}
                onChange={handleDeliveryOption}
              />
            )}
          </S.FormSection>

          <S.FormSection>
            <S.Step>2. Select Tests</S.Step>
            <S.BodyCopy>
              These are the tests included with this access code
            </S.BodyCopy>
            <S.Tests data-cy="tests">
              {!loading &&
                selectedTests.map(test => (
                  <S.TestItem key={test.id}>
                    <S.TestLabel>{test.name}</S.TestLabel>
                    <StyledCheckbox
                      id={test.id}
                      name={test.name}
                      checked
                      disabled
                    />
                  </S.TestItem>
                ))}
            </S.Tests>
          </S.FormSection>

          <S.FrequencySection>
            <S.Step>3. Code Frequency & Utilization</S.Step>
            <S.BodyCopy>
              Determine the number of times a code can be used by a participant
            </S.BodyCopy>
            <S.Label disabled>Code Usage</S.Label>
            <S.FlexDiv>
              {!loading &&
                codeFrequencyRadioButtons.map(frequency => (
                  <S.RadioWrapper key={frequency.name}>
                    <S.StyledRadioButton
                      id={frequency.name}
                      name={frequency.name}
                      label={frequency.label}
                      checked={
                        (isMultipleCodeUsageSelected &&
                          frequency.name === "multiple") ||
                        (!isMultipleCodeUsageSelected &&
                          frequency.name === "once")
                      }
                      disabled
                    />
                  </S.RadioWrapper>
                ))}
            </S.FlexDiv>

            {!loading && isMultipleCodeUsageSelected && (
              <>
                <S.Label disabled data-cy="frequency-amount">
                  Frequency Amount
                </S.Label>
                <S.FrequencySlider
                  valueLabelDisplay="on"
                  aria-label="pretto slider"
                  min={1}
                  max={6}
                  value={existingCode?.max_participant_orders_per_period}
                  marks={sliderMarks.filter(
                    mark =>
                      mark.value !==
                      existingCode?.max_participant_orders_per_period
                  )}
                  disabled
                />
                <S.Label>Occurrence</S.Label>
                <S.OccurrenceToggleWrapper disabled>
                  {occurrenceChoices.map(({ label, value }) => {
                    return (
                      <S.OccurrenceToggle
                        key={value}
                        type="button"
                        isActive={
                          existingCode?.participant_order_period === value
                        }
                        disabled
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
            {!loading && (
              <S.StyledInput
                name="usageLimit"
                label=""
                id="usageLimit"
                ref={register({ required: false })}
                onChange={handleLimitChange}
                defaultValue={existingCode?.max_orders
                  ?.toString()
                  .replace(/[^\d]/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            )}
          </S.FrequencySection>
          <S.ActiveSection>
            <S.BodyCopyNormal>
              Access code is active for participants to order test kits
            </S.BodyCopyNormal>
            {!loading && (
              <Switch
                color={colors.green5}
                checked={!!active}
                onChange={() => updateActive(prev => !prev)}
              />
            )}
          </S.ActiveSection>
          <S.SaveAccessCodeButton
            type="submit"
            isLoading={isFormSubmitted}
            disabled={
              !watchFields.name ||
              selectedDeliveryOptionIds.length === 0 ||
              isEverlywellSuperAdmin
            }
          >
            {isFormSubmitted ? <div className="loader" /> : "Save"}
          </S.SaveAccessCodeButton>
        </form>
      </S.InnerWrapper>
    </S.OuterWrapper>
  )
}

export default EditAccessCode
