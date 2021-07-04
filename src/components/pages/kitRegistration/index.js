import React, { useContext, useState } from "react"

import { useStep } from "hooks"

import { KitRegistrationContext } from "contexts/kitRegistration"

import BarcodeStep from "./barcodeStep"
import KitInfoStep from "./kitInfoStep"
import CurrentStatusStep from "./currentStatusStep"
import KitConfirmationStep from "./kitConfirmationStep"

import * as S from "./styles";

const steps = ["barcode", "info", "status", "confirmation"];

const KitRegistration = () => {
  const {
    currentStep,
    navigation: { goToNextStep, goToPreviousStep, goToStep },
    hasNextStep,
    hasPrevStep,
  } = useStep({ steps });
  const { resetKitRegData } = useContext(KitRegistrationContext)
  const [resetForm, setResetForm] = useState(false)

  const moveForward = _event => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (hasNextStep) {
      goToNextStep();
    }
  };

  const moveBackward = _event => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (hasPrevStep) {
      goToPreviousStep();
    }
  };

  const reset = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Need to indicate to component to reset, since first page is rendered before state is reset
    setResetForm(true);
    goToStep(0);
    resetKitRegData();
    setResetForm(false);
  }

  return (
    <S.OuterWrapper>
      <S.BackLink to="/app/kit_status">Back to Test Kits</S.BackLink>

      <S.InnerWrapper>
        {
          {
            0: <BarcodeStep moveForward={moveForward} resetForm={resetForm} />,
            1: <KitInfoStep moveForward={moveForward} moveBackward={moveBackward} />,
            2: <CurrentStatusStep moveForward={moveForward} moveBackward={moveBackward} />,
            3: <KitConfirmationStep goToPreviousStep={goToPreviousStep} goToStep={goToStep} reset={reset} />,
          }[currentStep]
        }
      </S.InnerWrapper>
    </S.OuterWrapper>
  )
}

export default KitRegistration
