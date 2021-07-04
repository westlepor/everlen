import React, { useState, useContext, useRef } from "react"
import { useLazyQuery } from "react-apollo"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import {
  MenuItem,
  MenuLabel,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"
import Checkbox from "components/atoms/check"
import GradientScrollable from "components/atoms/common/GradientScrollable"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { SessionContext } from "contexts/session"

import Field from "utils/fields"
import { queryOptions } from "utils/helper"

import GET_COUNT from "queries/client/getCountByIDs"
import { useHasuraClaims, useSuperAdmin } from "hooks"

const PopupClient = ({ handleOpen }) => {
  const session = useContext(SessionContext)
  const { user, targetUser, isLoading, clients } = session
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)
  const { filterClient } = tableContext
  const popupOpen = open === Field.client.name

  const {
    isEnterprisePartnerClinicalAdmin,
    enterprisePartnerId,
    isHCPAdmin,
    rapidTestId,
  } = useHasuraClaims(user)

  const {
    isEverlywellSuperAdmin,
    targetPartnerId,
    isTargetUserHCPAdmin,
  } = useSuperAdmin(user, targetUser)

  const selectedFilterClient = filterClient.map(e => {
    return {
      id: e.id,
      name: e.name,
      value: true,
    }
  })
  selectedFilterClient.push({
    id: "none",
    name: "None",
    value: false,
  })
  const [filters, setFilters] = useState(selectedFilterClient)

  const doFilter = () => {
    const selectedFiltersOption = filters.reduce((acc, next) => {
      if (next.value) {
        acc.push(next)
      }
      return acc
    }, [])
    tableContext.setTable({
      filterClient: selectedFiltersOption,
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterClient: [],
    })
  }

  const doSelectFilter = (id, checked) => {
    const isExist = filters.findIndex(e => e.id === id) > -1

    let changedFilters = [...filters]
    if (!isExist) {
      const client = clients.find(c => c.id === id)
      changedFilters.push({
        id,
        label: client.name,
        value: checked,
      })
    } else {
      changedFilters = filters.reduce((acc, next) => {
        if (next.id === id) {
          acc.push({
            id: next.id,
            label: next.label,
            value: checked,
          })
        } else {
          acc.push(next)
        }
        return acc
      }, [])
    }
    setFilters(changedFilters)
  }

  const makeVariables = ({
    clients,
    isEnterprisePartnerClinicalAdmin,
    isEverlywellSuperAdmin,
    enterprisePartnerId,
    targetPartnerId,
  }) => {
    if (clients && clients.length > 0) {
      let variables = {}
      clients.forEach(c => {
        variables[`client${c.id}`] = c.id
      })

      if (isEnterprisePartnerClinicalAdmin && enterprisePartnerId) {
        variables["partner_id"] = enterprisePartnerId
      } else if (isEverlywellSuperAdmin && targetPartnerId) {
        variables["partner_id"] = targetPartnerId
      }

      return variables
    }

    return {}
  }

  const [getCount, { data, loading }] = useLazyQuery(
    GET_COUNT({
      clients,
      isEnterprisePartnerClinicalAdmin,
      isEverlywellSuperAdmin,
      enterprisePartnerId,
      targetPartnerId,
      isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
      rapidTestId,
    }),
    {
      ...queryOptions(user),
      variables: makeVariables({
        clients,
        isEnterprisePartnerClinicalAdmin,
        isEverlywellSuperAdmin,
        enterprisePartnerId,
        isHCPAdmin: isHCPAdmin || isTargetUserHCPAdmin,
        rapidTestId,
        targetPartnerId,
      }),
    }
  )

  const doOpen = () => {
    if (clients && clients.length > 0) {
      getCount()
    }
    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  let list = clients.map(e => {
    return {
      label: e.name,
      count: data ? data[`client${e.id}`]?.aggregate?.count : 0,
      id: e.id,
    }
  })

  list.push({
    id: "none",
    label: "None",
    count: data ? data?.none?.aggregate?.count : 0,
  })

  const lastMenuRef = useRef()

  const menus = list.map((e, i) => {
    const filterState = filters.find(elem => elem.id === e.id)
    const checked = filterState ? filterState.value : false
    const disabled = e.count > 0 ? false : true
    const menu = (
      <>
        <MenuLabel>{`${e.label} (${e.count ? e.count : 0})`}</MenuLabel>
        <Checkbox
          checked={checked}
          onChange={(_event, checked) => doSelectFilter(e.id, checked)}
          disabled={disabled}
        />
      </>
    )

    if (i === list.length - 1) {
      return (
        <MenuItem key={i} ref={lastMenuRef}>
          {menu}
        </MenuItem>
      )
    }
    return <MenuItem key={i}>{menu}</MenuItem>
  })

  if (!clients || !data) {
    return (
      <Popup
        open={popupOpen}
        menus={
          <MenuLabel>
            {isLoading || loading ? "Loading..." : "No Data"}
          </MenuLabel>
        }
        onOpen={doOpen}
        onClose={doClose}
        width={282}
      />
    )
  }

  return (
    <Popup
      open={popupOpen}
      menus={<GradientScrollable menus={menus} />}
      onOpen={doOpen}
      onClose={doClose}
      onApply={doFilter}
      onReset={doReset}
      width={282}
      isScrollable={true}
    />
  )
}

export default PopupClient
