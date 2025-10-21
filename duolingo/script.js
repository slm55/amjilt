// === Helper: render leaderboard table ===
function renderTable(gradeLabel, data, limit = null) {
  const sorted = data.sort((a, b) => Number(b["Total XP"]) - Number(a["Total XP"]));
  const visible = limit ? sorted.slice(0, limit) : sorted;

  return `
    <div class="${limit ? 'slide' : 'class-block'}">
      <h2 class="class-title">Amjilt - ${gradeLabel}</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>XP</th>
            <th>Streak 🔥</th>
          </tr>
        </thead>
        <tbody>
          ${visible.map((r, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${r["Full name"]}</td>
              <td>${r["Total XP"] || 0}</td>
              <td>${r["Streak"] || 0}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// === Load a CSV ===
function loadCSV(file) {
  return new Promise(resolve => {
    Papa.parse(`data/${file}`, {
      download: true,
      header: true,
      complete: results => resolve(results.data.filter(r => r["Full name"]))
    });
  });
}

// === FULL LEADERBOARD PAGE ===
async function initFullLeaderboard(classList) {
  const tabs = document.getElementById("tabs");
  const content = document.getElementById("leaderboard-content");

  // Create tabs
  classList.forEach((cls, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === 0 ? " active" : "");
    btn.textContent = cls.name;
    btn.onclick = async () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      const data = await loadCSV(cls.file);
      content.innerHTML = renderTable(cls.name, data);
    };
    tabs.appendChild(btn);
  });

  // Load first class by default
  const first = classList[0];
  const data = await loadCSV(first.file);
  content.innerHTML = renderTable(first.name, data);
}

// === TOP LEADERBOARD PAGE ===
// === TOP LEADERBOARD PAGE (LED Display) ===
async function initTopLeaderboard(classList) {
  const slides = document.getElementById("slides");
  const status = document.getElementById("rotation-status");

  for (const cls of classList) {
    const data = await loadCSV(cls.file);
    slides.innerHTML += renderTable(cls.name, data, 10);
  }

  const slideEls = slides.querySelectorAll(".slide");
  let current = 0;
  slideEls[current].classList.add("active");

  // Helper to update bottom status bar
  function updateStatus() {
    const now = classList[current].name;
    const next = classList[(current + 1) % classList.length].name;
    status.classList.add("fade");
    setTimeout(() => {
      status.textContent = `Қазір: ${now} • Келесі: ${next}`;
      status.classList.remove("fade");
    }, 400);
  }

  updateStatus();

  // Switch slides every 8 seconds
  setInterval(() => {
    slideEls[current].classList.remove("active");
    current = (current + 1) % slideEls.length;
    slideEls[current].classList.add("active");
    updateStatus();
  }, 8000);
}

