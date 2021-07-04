import React, { useState } from "react";

export const KitRegistrationContext = React.createContext();

const initialState = {
  // Personal Information step
  kitId: "",
  kitName: "",
  enterpriseClients: [],
  selectedEnterpriseClient: "",
  thirdPartyMemberId: "",
  partnerConfig: {},
  isRapidTest: false,
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  sex: "",
  pregnancyStatus: "",
  race: "",
  ethnicity: "",
  collectionDate: "",
  collectionTime: "",

  // Current status step
  symptoms: "",
  symptomsStartDate: "",
  exposure: "",
  firstTest: "",
  congregateSetting: "",
  underlyingConditions: ""
};

export const KitRegistrationProvider = ({ children }) => {
  const [registrationState, setRegistrationState] = useState(initialState)

  const setKitRegData = kitRegData => {
    setRegistrationState({ ...registrationState, ...kitRegData });
  };

  const resetKitRegData = () => {
    setRegistrationState({ ...initialState });
  }

  return (
    <KitRegistrationContext.Provider
      value={{
        ...registrationState,
        setKitRegData,
        resetKitRegData
      }}
    >
      {children}
    </KitRegistrationContext.Provider>
  );
};
