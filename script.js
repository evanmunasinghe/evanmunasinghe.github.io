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

// Project filter.
const buttons = document.querySelectorAll(".filters button");
const projects = document.querySelectorAll(".project");
const count = document.getElementById("count");
function filter(cat) {
  let shown = 0;
  projects.forEach((p) => { p.hidden = cat !== "all" && p.dataset.cat !== cat; if (!p.hidden) shown++; });
  count.textContent = `Showing ${shown} project${shown === 1 ? "" : "s"}`;
}
buttons.forEach((b) => b.addEventListener("click", () => {
  buttons.forEach((x) => x.classList.toggle("active", x === b));
  filter(b.dataset.filter);
}));
filter("all");

// Contact form opens WhatsApp with the message filled in (static site, no server).
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Hi Evan, I'm ${f.get("name")}.\n\n${f.get("subject")}\n\n${f.get("message")}`;
  window.open(`https://wa.me/94714682032?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
