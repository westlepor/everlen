const normalizeTime = (oldTime, e) => {
  if (
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Home" ||
    e.key === "End" ||
    e.key === "Tab"
  ) {
    return null
  }

  e.persist()
  e.preventDefault()

  let curPos = e.target.selectionStart

  if (curPos < 5 || (curPos === 5 && e.key === "Backspace")) {
    let newChar = "0"

    if (e.key === "Delete") {
      if (curPos === 2) {
        curPos = 3
      }
    } else if (e.key === "Backspace") {
      if (curPos === 3) {
        curPos -= 2
      } else {
        curPos--
      }
    } else if (e.key >= "0" && e.key <= "9") {
      newChar = e.key
      if (curPos === 2) {
        curPos = 3
      }
    } else {
      return null
    }
    if (curPos >= 0) {
      let newTime = oldTime.slice(0, curPos) + newChar
      if (curPos + 1 < oldTime.length) {
        newTime += oldTime.slice(curPos + 1)
      }
      const arr = newTime.split(":")
      if (arr[0] <= 12 && arr[1] < 60) {
        return newTime
      }
    }
  }

  return null
}

const moveCursor = e => {
  let cursorStart = e.target.selectionStart
  let cursorEnd = e.target.selectionEnd

  if (e.key === "Delete") {
    // do nothing
  } else if (e.key === "Backspace") {
    if (cursorStart === 3) {
      cursorStart = 1
      cursorEnd = 1
    } else {
      cursorStart--
      cursorEnd--
    }
  } else {
    cursorStart++
    cursorEnd++

    if (cursorStart === 3) {
      cursorStart = 4
      cursorEnd = 4
    }
  }

  return [cursorStart, cursorEnd]
}

const getUpdatedTime = (ampm, hourMin) => {
  let updatedTime = new Date()
  const arr = hourMin.split(":")
  if (arr.length >= 2 && arr[0] && arr[1]) {
    let hour = parseInt(arr[0])
    const min = parseInt(arr[1])
    if (ampm === "PM") {
      hour += 12
    } else if (hour === 12) {
      hour = 0
    }
    updatedTime.setHours(hour)
    updatedTime.setMinutes(min)
  } else {
    updatedTime = "Invalid Date"
  }

  return updatedTime
}

export { normalizeTime, moveCursor, getUpdatedTime }
