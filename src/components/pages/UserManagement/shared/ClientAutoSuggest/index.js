import React, { useRef, useEffect } from "react"

import { usePrevious, useEnterprisePartnerClients } from "hooks"

import AutoSuggestSelector from "../AutoSuggestSelector"

const ClientAutoSuggest = ({
  id,
  label,
  hideLabel,
  selectedID,
  excludeIDs,
  setSelectedID,
  enterprisePartnerID,
}) => {
  const { data } = useEnterprisePartnerClients({ enterprisePartnerID })
  let items = data?.enterprise_clients || []
  if (!selectedID) {
    items = items.filter(e => !excludeIDs.includes(e.id))
  }

  const inputRef = useRef()

  const wasSelected = usePrevious(!!selectedID)
  const previousPartnerId = usePrevious(enterprisePartnerID)

  useEffect(() => {
    if (
      wasSelected &&
      !selectedID &&
      enterprisePartnerID === previousPartnerId
    ) {
      inputRef.current.focus()
    } else if (inputRef.current) {
      inputRef.current.blur()
    }
    // eslint-disable-next-line
  }, [selectedID, enterprisePartnerID, previousPartnerId])

  const displayName =
    selectedID && items.find(item => item.id === selectedID)?.name

  return (
    <AutoSuggestSelector
      type="Client"
      items={items}
      inputID={id}
      label={hideLabel ? undefined : label}
      inputRef={inputRef}
      placeholder="Enter client name or ID"
      selectedID={selectedID}
      setSelectedID={setSelectedID}
      displayName={displayName}
    />
  )
}

ClientAutoSuggest.defaultProps = {
  id: "client-selector",
  label: "Client Name & ID (optional)",
  excludeIDs: [],
}

export default ClientAutoSuggest
