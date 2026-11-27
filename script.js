// Typing effect under the name.
const roles = ["Full-Stack Developer", "Founder of Aureus Technologies", "Laravel Developer", "Problem Solver"];
const typed = document.getElementById("typed");
let r = 0, i = roles[0].length, deleting = true;
function tick() {
  const word = roles[r];
  i += deleting ? -1 : 1;
  typed.textContent = word.slice(0, i);
  let delay = deleting ? 45 : 90;
  if (!deleting && i === word.length) { deleting = true; delay = 1800; }
  else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
  setTimeout(tick, delay);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setTimeout(tick, 1800);

// Mobile menu.
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); });

// Highlight the nav link for the section on screen.
const links = [...nav.querySelectorAll("a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.hash === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

// Project filter: by category button, or by clicking a skill chip.
const buttons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");
const count = document.getElementById("count");
function filter(test, label = "") {
  let shown = 0;
  projects.forEach((p) => { p.hidden = !test(p); if (!p.hidden) shown++; });
  count.textContent = `Showing ${shown} project${shown === 1 ? "" : "s"}${label ? ` using ${label} · ` : ""}`;
  if (label) {
    const all = document.createElement("button");
    all.type = "button"; all.className = "copy-btn"; all.textContent = "Show all";
    all.onclick = () => buttons[0].click();
    count.append(all);
  }
}
const byCat = (cat) => (p) => cat === "all" || p.dataset.cat === cat;
buttons.forEach((b) => b.addEventListener("click", () => {
  buttons.forEach((x) => x.classList.toggle("active", x === b));
  filter(byCat(b.dataset.filter));
}));
filter(byCat("all"));

// Skill chips that match a project become buttons that filter to those projects.
const keyOf = (s) => ({ "rest apis": "rest-apis", "oauth 2.0": "oauth" })[s] || s.replace(/ /g, "-");
document.querySelectorAll(".chips.tech li").forEach((li) => {
  const name = li.textContent.trim(), key = keyOf(name.toLowerCase());
  const match = (p) => (p.dataset.tech || "").split(" ").includes(key);
  if (![...projects].some(match)) return;
  const b = document.createElement("button");
  b.type = "button"; b.className = "chip-link"; b.title = `Show projects using ${name}`;
  b.append(...li.childNodes); li.append(b);
  b.onclick = () => {
    buttons.forEach((x) => x.classList.remove("active"));
    filter(match, name);
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  };
});

// Contact form opens WhatsApp with a short brief filled in (static site, no server).
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const lines = [`Hi Evan, I'm ${f.get("name")}.`, `Project: ${f.get("type")}`];
  if (f.get("budget").trim()) lines.push(`Budget: ${f.get("budget").trim()}`);
  if (f.get("timeline")) lines.push(`Timeline: ${f.get("timeline")}`);
  const text = `${lines.join("\n")}\n\n${f.get("message")}`;
  window.open(`https://wa.me/94714682032?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// Copy buttons (e.g. the email address).
document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
  await navigator.clipboard.writeText(b.dataset.copy);
  b.textContent = "Copied";
  setTimeout(() => (b.textContent = "Copy"), 2000);
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Background music toggle.
const bgm = document.getElementById("bgm"), musicBtn = document.querySelector(".music-btn");
bgm.volume = .4;
musicBtn.addEventListener("click", () => {
  const on = bgm.paused;
  on ? bgm.play() : bgm.pause();
  musicBtn.setAttribute("aria-pressed", on);
  musicBtn.textContent = on ? "❚❚ Pause music" : "♪ Play music";
});
