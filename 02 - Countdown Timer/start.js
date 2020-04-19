IIFE(() => {
  startCountDown()

  function startCountDown() {
    requestAnimationFrame(countDown)
  }

  const newYearUnix = new Date('2021 00:00').getTime()
  let previousRenderedUnix
  function countDown() {
    const now = Date.now()
    const nowRoundedToSecond = Math.floor(now / 1000) * 1000
    if (nowRoundedToSecond != previousRenderedUnix) {
      renderPage(nowRoundedToSecond)
      previousRenderedUnix = nowRoundedToSecond
    }

    requestAnimationFrame(countDown)
  }

  const daysElement = document.getElementById('days')
  const hoursElement = document.getElementById('hours')
  const minutesElement = document.getElementById('minutes')
  const secondsElement = document.getElementById('seconds')
  const daysInMs = 24 * 60 * 60 * 1000
  const hoursInMs = 60 * 60 * 1000
  const minutesInMs = 60 * 1000
  const secondsInMs = 1000
  function renderPage(now) {
    const msUntilNewYear = newYearUnix - now
    daysElement.innerText = Math.floor(msUntilNewYear / daysInMs)
    hoursElement.innerText = Math.floor((msUntilNewYear % daysInMs) / hoursInMs)
    minutesElement.innerText = Math.floor((msUntilNewYear % hoursInMs) / minutesInMs)
    secondsElement.innerText = Math.floor((msUntilNewYear % minutesInMs) / secondsInMs)
  }
})

function IIFE(callback) {
  callback()
}
