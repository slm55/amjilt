// time.js - simple clock module
export function startClock({ timeId = 'time', dateId = 'date', locale = 'en-GB', timezone = 'Asia/Almaty' } = {}) {
  const timeEl = document.getElementById(timeId);
  const dateEl = document.getElementById(dateId);

  if (!timeEl || !dateEl) return;

  function pad(n){ return n.toString().padStart(2,'0'); }

  function update() {
    const now = new Date();
    // Use Intl.DateTimeFormat with timezone for display
    const timeFormatter = new Intl.DateTimeFormat(locale, {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: timezone
    });
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone
    });

    timeEl.textContent = timeFormatter.format(now);
    dateEl.textContent = dateFormatter.format(now);
  }

  update();
  // update every 15 seconds in case of timezone transitions; keep in sync
  setInterval(update, 15000);
}
