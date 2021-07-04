import { getStringifiedRows } from "../../utils/csv"

describe("Has quated csv rows", () => {
  const data = [["client, a", "status , 1"]]

  it("wrap with quate", async () => {
    const p = await getStringifiedRows(data)
    expect(p).toBe('"client, a","status , 1"\n')
  })
})
