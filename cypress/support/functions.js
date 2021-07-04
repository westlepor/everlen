cy.accessCode = {
  getToday: () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    const yyyy = today.getFullYear()
    if (dd < 10) {
      dd = `0${dd}`
    }
    if (mm < 10) {
      mm = `0${mm}`
    }
    today = `${mm}/${dd}/${yyyy}`
    return today
  },
}

cy.makeUniqueEmail = function () {
  return "test" + Date.now() + "@everlywell.com";
}

cy.removeNullValuesInObject = function (obj) {
  Object.keys(obj).forEach((k) => obj[k] == null && delete obj[k]);
  return obj
}