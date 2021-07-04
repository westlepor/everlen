import React, { useContext, useEffect } from "react"
import Modal from "reactjs-popup"
import ReactTooltip from "react-tooltip"

import { useForm } from "react-hook-form"

import { colors } from "@everlywell/leaves"

import { CliaWaiverContext } from "contexts/cliaWaiver"

import { US_STATES } from "utils/constants"

import * as S from "./style"

const isValidZipcode = zip5 => {
  const reg = new RegExp(/^[0-9]{5}$/)
  return reg.test(zip5)
}

const isValidCLIAWaiverNumber = number => {
  const reg = new RegExp(/^[a-zA-Z0-9]{10}$/)
  return reg.test(number)
}

const CollectingSampleTodayModal = () => {
  const {
    cliaWaiverData,
    isModalOpen,
    isProcessing,
    isMasqueradeMode,
    closeModal,
    onCliaWaiverFormSubmission: onSubmit,
  } = useContext(CliaWaiverContext)

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  })

  useEffect(() => {
    if (!!cliaWaiverData) {
      reset(cliaWaiverData)
    }
  }, [reset, cliaWaiverData])

  const StateSelectHTML = errors?.state ? S.StateSelectError : S.StateSelect

  const onSubmitError = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const getZipcodeError = () => {
    if (errors.zip5) {
      if (errors.zip5.message) {
        return errors.zip5.message
      }

      if (errors.zip5.type === "validate") {
        return "Please enter a valid ZIP Code"
      }
    }

    return ""
  }

  const getCLIAWaiverNumberError = () => {
    if (errors.clia) {
      if (errors.clia.message) {
        return errors.clia.message
      }

      if (errors.clia.type === "validate") {
        return "Please enter a valid number"
      }
    }

    return ""
  }

  return (
    <Modal
      open={isModalOpen}
      overlayStyle={{
        zIndex: 100,
        WebkitBackdropFilter: "blur(3px)",
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      }}
      contentStyle={{
        width: "648px",
        height: "80%",
        top: "100px",
        margin: "0 auto",
        outline: "none",
        overflow: "unset",
        padding: "0",
        borderRadius: "1px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        border: `solid 1px ${colors.green1}`,
      }}
      onClose={closeModal}
      closeOnDocumentClick={false}
    >
      <>
        <S.CloseButtonWrapper>
          <S.CloseIcon onClick={closeModal}>X</S.CloseIcon>
        </S.CloseButtonWrapper>

        <S.Form
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
          data-cy="clia-waiver-form"
        >
          <S.Content>
            <S.PageTitle>Collecting Samples Today?</S.PageTitle>
            <S.Subtitle>
              Enter the CLIA Waiver number and address you'll be using for your
              testing event today.
            </S.Subtitle>

            <S.FormWrapper>
              <S.InputIconWrapper>
                <S.InputField
                  name="clia"
                  id="clia"
                  label="CLIA Waiver Number"
                  ref={register({
                    required: "Please enter a valid number",
                    validate: value => isValidCLIAWaiverNumber(value),
                  })}
                  error={getCLIAWaiverNumberError()}
                  data-lpignore="true"
                />

                <ReactTooltip
                  id="cliaWaiverInfo"
                  effect="solid"
                  aria-haspopup="true"
                >
                  <S.TooltipContentWrapper>
                    The CLIA waiver number is a ten-character alpha-numeric code
                    that is issued by CMS upon application review and approval.
                    Sites that perform waived testing must have this certificate
                    and should follow the manufacturer’s instructions for
                    collection.
                  </S.TooltipContentWrapper>
                </ReactTooltip>

                <S.InfoIconWrapper data-tip data-for="cliaWaiverInfo">
                  <S.StyledInfoIcon id="id-info" />
                </S.InfoIconWrapper>
              </S.InputIconWrapper>

              <S.InputField
                name="address1"
                id="address1"
                label="CLIA Waiver Address Line 1"
                ref={register({
                  required: "Please enter a valid address",
                })}
                error={errors?.address1?.message}
                data-lpignore="true"
              />

              <S.InputField
                name="address2"
                label="CLIA Waiver Address Line 2 (optional)"
                id="address2"
                ref={register}
                data-lpignore="true"
              />

              <S.InputField
                name="city"
                id="city"
                label="City"
                ref={register({
                  required: "Please enter a valid city",
                })}
                data-lpignore="true"
                error={errors?.city?.message}
              />

              <StateSelectHTML
                items={US_STATES}
                name="state"
                id="state"
                label="State"
                ref={register({
                  required: "Please select a state",
                  pattern: {
                    value: /^(?!Select State)/,
                    message: "Please select a state",
                  },
                })}
              />

              <S.CustomErrorMessage>
                {errors?.state?.message}
              </S.CustomErrorMessage>

              <S.InputField
                name="zip5"
                id="zip5"
                label="ZIP Code"
                ref={register({
                  required: "Please enter a valid ZIP Code",
                  validate: value => isValidZipcode(value),
                })}
                error={getZipcodeError()}
                data-lpignore="true"
              />
            </S.FormWrapper>
          </S.Content>

          <S.SubmitButtonWrapper>
            <S.Button
              disabled={isMasqueradeMode || isProcessing}
              type="submit"
              data-cy="clia-waiver-submit"
            >
              Enter CLIA Waiver
            </S.Button>
          </S.SubmitButtonWrapper>
        </S.Form>
      </>
    </Modal>
  )
}

export default CollectingSampleTodayModal
