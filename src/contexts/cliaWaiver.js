import React, { useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"

import { dayjs } from "utils/datetime"

import Toast from "components/common/Toast"

import { SessionContext } from "contexts/session"

import {
  useHasuraClaims,
  useSuperAdmin,
  useLastUsedLabFacility,
  useCreateOrUpdateLabFacilityMutation,
} from "hooks"

import { TOAST_MSG, TOAST_DESC } from "utils/constants"

export const CliaWaiverContext = React.createContext({})

export const CliaWaiverProvider = ({ children }) => {
  const [cliaWaiverData, updateCliaWaiverData] = useState()

  const [isProcessing, setIsProcessing] = useState(false)

  const [isModalOpen, toggleModal] = useState(false)

  const openModal = () => toggleModal(true)
  const closeModal = () => toggleModal(false)

  const { user, targetUser } = useContext(SessionContext)
  const { isHCPAdmin, currentUserId } = useHasuraClaims(user)
  const { isMasqueradeMode } = useSuperAdmin(user, targetUser)

  const [createOrUpdateLabFacility] = useCreateOrUpdateLabFacilityMutation()

  const cliaWaiverNumber = cliaWaiverData?.clia
  const cliaWaiverLabFacilityId = cliaWaiverData?.id

  const hasHCPEnteredCLIAWaiverNumber =
    !!cliaWaiverNumber && !!cliaWaiverLabFacilityId

  // auto-generates previously used lab facility details in the form
  useLastUsedLabFacility({
    onCompleted: response => {
      let [previousLabFacility] = response?.labFacilities?.nodes || []

      if (!!previousLabFacility?.active || hasHCPEnteredCLIAWaiverNumber) {
        updateCliaWaiverData(previousLabFacility)
      } else {
        updateCliaWaiverData({ ...previousLabFacility, id: null })

        if (!!isHCPAdmin) {
          openModal()
        }
      }
    },
  })

  // prevents scrolling main page when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  const onCliaWaiverFormSubmission = formData => {
    setIsProcessing(true)

    const variables = {
      ...formData,
      okta_user_id: currentUserId,
      last_used_at: dayjs.utc(),
    }

    createOrUpdateLabFacility({ variables })
      .then(({ data }) => {
        const { id: labFacilityId, errors } =
          data?.createOrUpdateLabFacility || {}

        if (!!errors?.value) {
          throw new Error(errors?.value)
        }

        updateCliaWaiverData({ id: labFacilityId, ...formData })

        closeModal()

        toast(
          <Toast
            message={TOAST_MSG.CLIA_WAIVER_ENTERED}
            description={TOAST_DESC.CLIA_WAIVER_ENTERED}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            type: "success",
            autoClose: 4000,
          }
        )
      })
      .catch(error => console.log({ error }))
      .finally(() => setIsProcessing(false))
  }

  return (
    <CliaWaiverContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,

        cliaWaiverData,
        isProcessing,
        isMasqueradeMode,
        onCliaWaiverFormSubmission,

        hasHCPEnteredCLIAWaiverNumber,
        cliaWaiverNumber,
        cliaWaiverLabFacilityId,
      }}
    >
      {children}
    </CliaWaiverContext.Provider>
  )
}
