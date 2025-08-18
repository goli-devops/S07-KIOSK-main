setInterval(() => {
  const holidayDates = [
    "2025-06-06", // Eid’l Adha (estimated)
    "2025-06-12", // Independence Day
    "2025-08-21", // Ninoy Aquino Day
    "2025-08-25", // National Heroes Day
    "2025-11-01", // All Saints' Day
    "2025-11-30", // Bonifacio Day
    "2025-12-08", // Feast of the Immaculate Conception
    "2025-12-24", // Christmas Eve
    "2025-12-25", // Christmas Day
    "2025-12-30", // Rizal Day
    "2025-12-31", // New Year's Eve
    "2025-06-03",
  ]

  const now = new Date()

function isHolidayNow() {
  for (let dateStr of holidayDates) {
    // Holiday starts at 12:00 AM of the date
    const holidayStart = new Date(`${dateStr}T00:00:00`);

    // Holiday ends at 11:59:59 PM of the same day
    const holidayEnd = new Date(`${dateStr}T23:59:59`);

    if (date >= holidayStart && date <= holidayEnd) {
      return true;
    }
  }
  return false;
}


  let isHoliday = isHolidayNow(now)

  let weekdayRateElement = document.getElementById("weekday")
  let weekendRateElement = document.getElementById("weekend")
  let holidayElement = document.getElementById("holiday")
  let onp = document.getElementById("onp")
  let regularTen = document.getElementById("regular-ten")

  // Format and display current date/time
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
  document.getElementById("date-el").textContent = now.toLocaleString(
    "en-US",
    options
  )

  if (isHoliday) {
    holidayElement.style.display = "block"
    weekdayRateElement.style.display = "none"
    weekendRateElement.style.display = "none"
    document.body.classList.add("holiday-mode")
  } else {
    holidayElement.style.display = "none"
    document.body.classList.remove("holiday-mode")

    // Check if yesterday was a holiday and it's before 6am today
    let yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    let resumingAfterHoliday = isHolidayNow(yesterday) && now.getHours() < 6

    if (resumingAfterHoliday) {
      // Still under holiday window
      holidayElement.style.display = "block"
      weekdayRateElement.style.display = "none"
      weekendRateElement.style.display = "none"
    } else {
      // Show Weekday or Weekend Rate
      const currentDay = now.getDay()
      const currentHour = now.getHours()

      if (
        (currentDay === 5 && currentHour >= 6) || // Friday after 6am
        currentDay === 6 || // Saturday
        (currentDay === 0 && currentHour < 18) // Sunday before 6pm
      ) {
        weekendRateElement.style.display = "block"
        weekdayRateElement.style.display = "none"
      } else {
        weekdayRateElement.style.display = "block"
        weekendRateElement.style.display = "none"
      }
    }
  }

  // Show Overnight Promo: 8:00pm–5:59am Sunday to Friday
  const day = now.getDay()
  const hour = now.getHours()

  const showONP =
    (day === 0 && hour >= 20) || // Sunday 8pm+
    (day >= 1 && day <= 4 && hour >= 20) || // Mon–Thurs 8pm+
    (day >= 1 && day <= 5 && hour < 6) // Mon–Fri before 6am

  if (showONP) {
    onp.style.display = "table-row"
    regularTen.style.display = "none"
  } else {
    onp.style.display = "none"
    regularTen.style.display = "table-row"
  }
}, 1000)

// Fullscreen on click
document.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error: ${err.message}`)
    })
  }
})


