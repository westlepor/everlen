import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"

import { SessionContext } from "contexts/session"
import { KitRegistrationContext } from "contexts/kitRegistration"

import Footer from "./footer"

import * as S from "./styles"

import { useBarcode } from "hooks"

const ERRORS = {
  kit_id_registered: "Kit ID is already registered",
  kit_id_wrong_org: (
    <S.ErrorMessage>
      Kit ID cannot be registered. Please contact{" "}
      <a href="mailto:enterprisehelp@everlywell.com">
        enterprisehelp@everlywell.com
      </a>{" "}
      for support.
    </S.ErrorMessage>
  ),
}

/**
 * Barcode page
 */
const BarcodeStep = ({ moveForward, resetForm }) => {
  const session = useContext(SessionContext)
  const { user, targetUser } = session
  const { kitId, setKitRegData } = useContext(KitRegistrationContext)

  const defaultValues = { kitId: resetForm ? "" : kitId }

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    watch,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  })

  const [kitIdInput, setKitIdInput] = useState(kitId)
  const [kitIdCache, setKitIdCache] = useState(kitId)

  const [getBarcode, { data: barcodeData, loading }] = useBarcode(
    user,
    targetUser,
    kitIdCache
  )

  useEffect(() => {
    if (barcodeData) {
      if (validBarcode(barcodeData)) {
        const barcode = barcodeData.barcodes[0]
        clearErrors("kitId")
        const clientName = barcode.spree_order?.enterprise_client?.name || "-"
        const partnerConfig =
          barcode.spree_order?.enterprise_client
            ?.enterprise_partner_configs?.[0] ||
          barcode.spree_order?.enterprise_partner
            ?.enterprise_partner_configs?.[0]

        setKitRegData({
          kitId: kitIdInput,
          selectedEnterpriseClient: clientName,
          isRapidTest: /rapid/.test(barcode.spree_variant?.sku),
          kitName: barcode.spree_variant?.spree_product?.name || "",
          partnerConfig,
        })

        moveForward()
      } else {
        setError("kitId", {
          type: "validate",
          message: kitErrorMsg(barcodeData),
        })
      }
    }
    // eslint-disable-next-line
  }, [barcodeData])

  const validBarcodeState = barcode => barcode.state === "active"

  const validBarcodeOrg = data => data?.barcodes?.length > 0

  const validBarcode = data => {
    return validBarcodeOrg(data) && validBarcodeState(data.barcodes[0])
  }

  const validateKitId = value => {
    if (barcodeData) {
      return (value && validBarcode(barcodeData)) || kitErrorMsg(barcodeData)
    }
    return true
  }

  const kitErrorMsg = data => {
    if (!validBarcodeOrg(data)) {
      return ERRORS.kit_id_wrong_org
    } else if (data.barcodes[0].state === "registered") {
      return ERRORS.kit_id_registered
    }
    return ERRORS.kit_id_default
  }

  const handleKitIdInput = e => {
    const value = e.target.value.toUpperCase()
    setValue("kitId", value)
    setKitIdInput(value)
  }

  const handleBarcodeEnter = () => {
    setKitIdCache(kitIdInput)
    getBarcode()
  }

  const watchFields = watch()

  const onSubmit = data => {
    const contextData = {
      kitId: data.kitId,
      selectedEnterpriseClient: data.client,
      thirdPartyMemberId:
        data.thirdPartyMemberId || defaultValues.thirdPartyMemberId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || defaultValues.email,
      birthday: data.birthday,
      race: data.race,
      ethnicity: data.ethnicity,
    }

    setKitRegData(contextData)
    moveForward()
  }

  return (
    <div>
      <S.Title>Register Kit</S.Title>
      <S.Subtitle center>
        Register a kit on behalf of a participant during sample collection
      </S.Subtitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormSection>
          <S.Step>1. Kit Information</S.Step>
          <S.BodyCopy>
            Unique Kit ID can be found on a sticker located on the registration
            slip within your kit.
          </S.BodyCopy>
          <S.FlexRow>
            <S.FlexCol flex="2">
              <S.StyledInput
                name="kitId"
                id="kitId"
                label="Unique Kit ID"
                placeholder="8-11 digit alphanumeric code"
                ref={register({
                  validate: validateKitId,
                  required: "Please enter a valid ID",
                  minLength: { value: 8, message: "Please enter a valid ID" },
                })}
                error={errors?.kitId?.message}
                onChange={handleKitIdInput}
              />
            </S.FlexCol>
            <S.FlexCol>
              <S.BarcodeEnterButton
                middleStep
                type="button"
                data-cy="barcode-enter"
                onClick={handleBarcodeEnter}
                disabled={watchFields.kitId.length < 8 || loading}
                isLoading={loading}
              >
                {loading ? <div className="loader" /> : "Enter"}
              </S.BarcodeEnterButton>
            </S.FlexCol>
          </S.FlexRow>
        </S.FormSection>
      </form>
      <Footer />
    </div>
  )
}

export default BarcodeStep
