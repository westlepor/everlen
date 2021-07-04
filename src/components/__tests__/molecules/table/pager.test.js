import React from "react"
import { mount } from "enzyme"

import Pager from "components/molecules/common/table/tablePager"

import { TableProvider } from "contexts/table"

describe("Pager component", () => {
  it("should display the page buttons correctly", () => {
    jest.isolateModules(() => {
      // the total page is 7, one pager has 5 page buttons
      const wrapper = mount(
        <TableProvider>
          <Pager count={7} fetchedPages={7} />
        </TableProvider>
      )
      // 5 page buttons should exist at first
      expect(wrapper.find(`#tablePageButton_0`).length).toBeGreaterThan(1)
      expect(wrapper.find(`#tablePageButton_4`).length).toBeGreaterThan(1)
      // the last page button is clicked
      wrapper.find(`#tablePageButton_4`).at(0).simulate("click")
      // the next page button is clicked
      wrapper.find(`#tablePageButton_next`).at(0).simulate("click")
      // 1st ~ 5th page buttons should be disappeared
      expect(wrapper.find(`#tablePageButton_0`).length).toBeLessThan(1)
      expect(wrapper.find(`#tablePageButton_4`).length).toBeLessThan(1)
      // 6, 7th page buttons exist and 8th page button should not exist
      expect(wrapper.find(`#tablePageButton_5`).length).toBeGreaterThan(1)
      expect(wrapper.find(`#tablePageButton_6`).length).toBeGreaterThan(1)
      expect(wrapper.find(`#tablePageButton_7`).length).toBeLessThan(1)
      // 7th page button is clicked
      wrapper.find(`#tablePageButton_6`).at(0).simulate("click")
      // the next page button is clicked
      wrapper.find(`#tablePageButton_next`).at(0).simulate("click")
      // the next button is supposed not to act
      // so the 6, 7th page buttons still exist and 8th page button should not exist
      expect(wrapper.find(`#tablePageButton_5`).length).toBeGreaterThan(1)
      expect(wrapper.find(`#tablePageButton_6`).length).toBeGreaterThan(1)
      expect(wrapper.find(`#tablePageButton_7`).length).toBeLessThan(1)
    })
  })
})
