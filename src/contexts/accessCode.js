import React, { useState } from "react"

export const AccessCodeContext = React.createContext({
  filterStartDate: "",
  filterStartDateOption: 0,
  filterEndDate: "",
  filterEndDateOption: 0,
  setAccessCode: () => {},
})

export const AccessCodeProvider = ({ children }) => {
  const [accessCodeState, setAccessCodeState] = useState({
    filterStartDate: "",
    filterStartDateOption: 0,
    filterEndDate: "",
    filterEndDateOption: 0,
  })

  const setAccessCode = data => {
    setAccessCodeState({ ...accessCodeState, ...data })
  }

  return (
    <AccessCodeContext.Provider
      value={{
        ...accessCodeState,
        setAccessCode,
      }}
    >
      {children}
    </AccessCodeContext.Provider>
  )
}
