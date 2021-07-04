export const generatePdf = (xml, fileName) => {
  const parseString = require("xml2js").parseString
  parseString(xml, function (err, result) {
    let base64str = result.customer.reconciled_results[0]["results-pdf"][0]
    base64str = base64str.toString().trim().replace(/\s/g, "")
    const binary = atob(base64str)
    const len = binary.length
    const buffer = new ArrayBuffer(len)
    const view = new Uint8Array(buffer)
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i)
    }
    // create the blob object with content-type "application/pdf"
    const blob = new Blob([view], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style = "display: none"
    a.href = url
    a.setAttribute("download", fileName)
    a.click()
    window.URL.revokeObjectURL(url)
  })
}
