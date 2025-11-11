const CLASSES = [
  { name: "5 және 6 сыныптар", file: "data/AmjiltGrade56.csv" },
  { name: "7 және 8 сыныптар", file: "data/AmjiltGrade78.csv" },
  { name: "9 және 10 сыныптар", file: "data/AmjiltGrade910.csv" }
];
const ROTATE_MS = 15000;

const podium = document.getElementById("podium");
const others = document.getElementById("others");
const classNameEl = document.getElementById("className");

const parseCsv = url => new Promise((res, rej)=>{
  Papa.parse(url,{download:true,header:true,skipEmptyLines:true,complete:r=>res(r.data),error:rej});
});
const esc = s => String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

(async function(){
  const datasets=[];
  for(const c of CLASSES){
    try{datasets.push({name:c.name,data:await parseCsv(c.file)});}
    catch(e){datasets.push({name:c.name,data:[]});}
  }
  let i=0;
  showClass(datasets[i]);
  setInterval(()=>{
    i=(i+1)%datasets.length;
    showClass(datasets[i]);
  },ROTATE_MS);
})();

function showClass(cls) {
  classNameEl.textContent = cls.name;

  const rows = cls.data
    .filter(r => r["Full name"] || r["Full Name"])
    .map(r => ({
      name: r["Full name"] || r["Full Name"],
      xp: parseInt(r["Total XP"] || r["XP"] || 0, 10) || 0
    }))
    .sort((a, b) => b.xp - a.xp);

  if (rows.length === 0) return;

  const maxXp = Math.max(...rows.map(r => r.xp), 1);
  let top3 = rows.slice(0, 3);
  const newTop3 = [top3[1], top3[0], top3[2]];
  top3 = newTop3;
  console.log(top3)
  const top10 = rows.slice(3, 10);

  podium.innerHTML = "";
  others.innerHTML = "";

  const medalEmojis = ["🥈","🥇", "🥉"];
  const positions = [
     { rank: 1, cls: "silver" },
    { rank: 2, cls: "gold" },
    { rank: 3, cls: "bronze" }
  ];

  // Correct medal placement
  positions.forEach((pos) => {
    const r = top3.find((_r, i) => i + 1 === pos.rank);
    if (!r) return;

    const div = document.createElement("div");
    div.className = `pillar ${pos.cls}`;
    div.innerHTML = `
      <div class="medal">${medalEmojis[pos.rank - 1]}</div>
      <h3>${esc(r.name)}</h3>
      <div class="xp">${r.xp.toLocaleString()} XP</div>
      <div class="xpbar"><div class="xpfill"></div></div>
    `;
    podium.appendChild(div);
  });

  top10.forEach((r, idx) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h4>${idx + 4}. ${esc(r.name)}</h4>
      <div class="xp">${r.xp.toLocaleString()} XP</div>
      <div class="xpbar"><div class="xpfill"></div></div>
    `;
    others.appendChild(div);
  });

  // Animate podium
  gsap.fromTo(
    ".pillar",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "back.out(1.7)" }
  );

  setTimeout(
    () =>
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#58cc02", "#bff78a", "#fff"],
      }),
    700
  );

  // Animate XP bars accurately
  const allBars = [];
  podium.querySelectorAll(".pillar").forEach((pillar, idx) => {
    const xpValue = top3[idx] ? top3[idx].xp : 0;
    const pct = Math.min(Math.round((xpValue / maxXp) * 100), 100);
    const bar = pillar.querySelector(".xpfill");
    allBars.push({ bar, pct });
  });

  others.querySelectorAll(".card").forEach((card, idx) => {
    const xpValue = top10[idx] ? top10[idx].xp : 0;
    const pct = Math.min(Math.round((xpValue / maxXp) * 100), 100);
    const bar = card.querySelector(".xpfill");
    allBars.push({ bar, pct });
  });

  gsap.set(allBars.map(b => b.bar), { width: "0%" });
  allBars.forEach((b, idx) => {
    gsap.to(b.bar, {
      width: b.pct + "%",
      duration: 1.2,
      ease: "power2.out",
      delay: 1 + idx * 0.1,
    });
  });

  // Fade-in for other cards
  const cards = document.querySelectorAll(".card");
  gsap.fromTo(cards, { opacity: 0, y: 30 }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.15,
    delay: 1.3
  });
}


