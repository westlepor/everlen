import React, { useContext } from "react"

import PopupClient from "components/molecules/kitStatus/inlineFilter/popup/client"
import PopupKitStatus from "components/molecules/kitStatus/inlineFilter/popup/kitStatus"
import PopupOrdered from "components/molecules/kitStatus/inlineFilter/popup/ordered"
import PopupRegistered from "components/molecules/kitStatus/inlineFilter/popup/registered"
import PopupCollected from "components/molecules/kitStatus/inlineFilter/popup/collected"
import PopupResultsEntered from "components/molecules/kitStatus/inlineFilter/popup/resultsEntered"
import PopupResultsEnteredAt from "components/molecules/kitStatus/inlineFilter/popup/resultsEnteredAt"
import PopupReceived from "components/molecules/kitStatus/inlineFilter/popup/received"
import PopupSampleIssue from "components/molecules/kitStatus/inlineFilter/popup/sampleIssues"
import PopupApproved from "components/molecules/kitStatus/inlineFilter/popup/approved"
import PopupParticipantViewedAt from "components/molecules/kitStatus/inlineFilter/popup/participantViewedAt"
import PopupTestName from "components/molecules/kitStatus/inlineFilter/popup/testName"
import PopupResult from "components/molecules/kitStatus/inlineFilter/popup/result"

import { PopupContext } from "contexts/popup"
import Field from "utils/fields"

const PopupWrapper = () => {
  const { open: curPopup, setPopup } = useContext(PopupContext)

  const setPopupOpen = (isOpen, oldPopup) => {
    if (!isOpen && oldPopup === curPopup) {
      setPopup({ open: "" })
    }
  }

  return (
    <>
      <PopupClient
        handleOpen={isOpen => setPopupOpen(isOpen, Field.client.name)}
      />
      <PopupKitStatus
        handleOpen={isOpen => setPopupOpen(isOpen, Field.status.name)}
      />
      <PopupOrdered
        handleOpen={isOpen => setPopupOpen(isOpen, Field.ordered.name)}
      />
      <PopupRegistered
        handleOpen={isOpen => setPopupOpen(isOpen, Field.registerTime.name)}
      />
      <PopupCollected
        handleOpen={isOpen => setPopupOpen(isOpen, Field.collectTime.name)}
      />
      <PopupResultsEntered
        handleOpen={isOpen => setPopupOpen(isOpen, Field.resultsEntered.name)}
      />
      <PopupResultsEnteredAt
        handleOpen={isOpen => setPopupOpen(isOpen, Field.resultsEnteredAt.name)}
      />
      <PopupReceived
        handleOpen={isOpen => setPopupOpen(isOpen, Field.receiveTime.name)}
      />
      <PopupSampleIssue
        handleOpen={isOpen => setPopupOpen(isOpen, Field.issue.name)}
      />
      <PopupApproved
        handleOpen={isOpen => setPopupOpen(isOpen, Field.approveTime.name)}
      />
      <PopupParticipantViewedAt
        handleOpen={isOpen =>
          setPopupOpen(isOpen, Field.participantViewedAt.name)
        }
      />
      <PopupTestName
        handleOpen={isOpen => setPopupOpen(isOpen, Field.test.name)}
      />
      <PopupResult
        handleOpen={isOpen => setPopupOpen(isOpen, Field.result.name)}
      />
    </>
  )
}

export default PopupWrapper
