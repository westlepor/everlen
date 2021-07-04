import React, { useState } from "react"

export const PopupContext = React.createContext({
  open: "",
  offsetX: 0,
  offsetY: 0,
  setPopup: () => {},
})

export const PopupProvider = ({ children }) => {
  const [popupState, setPopupState] = useState({
    open: "",
    offsetX: 0,
    offsetY: 0,
  })

  const setPopup = data => {
    setPopupState({ ...popupState, ...data })
  }

  return (
    <PopupContext.Provider
      value={{
        ...popupState,
        setPopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}
