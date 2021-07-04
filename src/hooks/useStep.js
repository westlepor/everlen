import { useState } from "react"

const useStep = ({ initialStep = 0, steps }) => {
  const [index, setStep] = useState(initialStep)

  const currentStep = index
  const step = steps[index]

  const totalSteps = steps.length

  const deltaSetStep = (delta = 1) => {
    const newStep = (index + totalSteps + delta) % totalSteps

    setStep(newStep)
  }

  // Build navigation callback functions.
  const navigation = {
    goToNextStep: () => {
      deltaSetStep(1)
    },

    goToPreviousStep: () => {
      deltaSetStep(-1)
    },

    goToStep: newStep => {
      setStep(newStep)
    },
  }

  return {
    currentStep,
    step,
    navigation,

    isFirstStep: index === 0,
    isLastStep: index === totalSteps - 1,

    hasNextStep: index < totalSteps - 1,
    hasPrevStep: index > 0,
  }
}

export default useStep
