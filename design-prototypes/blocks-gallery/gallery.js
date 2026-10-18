/* Local, illustrative data. No registry items or routes are created by this prototype. */
const blocks = [
  {
    id: "hero-01",
    category: "Hero",
    name: "Cloud, with confidence",
    layout: "Split layout · Product preview",
    style: "hero-1",
    headline: "Deploy to the cloud with confidence",
    copy: "The tools to build, launch, and scale your next big idea.",
    logo: "◈ cloud",
    tag: "What’s new  →  Just shipped v1.0",
  },
  {
    id: "hero-02",
    category: "Hero",
    name: "A clearer way to work",
    layout: "Centered · Dashboard",
    style: "hero-2",
    headline: "Less busywork. More possibility.",
    copy: "Bring your people, projects, and ideas into one beautifully simple place.",
    logo: "Layers",
    tag: "Introducing a better way to work",
  },
  {
    id: "hero-03",
    category: "Hero",
    name: "Room for your next idea",
    layout: "Statement · Dark surface",
    style: "hero-3",
    headline: "Good things start with a little space.",
    copy: "A home for ambitious ideas and the people who bring them to life.",
    logo: "forma®",
    tag: "Built for what comes next",
  },
  {
    id: "hero-04",
    category: "Hero",
    name: "Designed for everyday",
    layout: "Split layout · Sculptural",
    style: "hero-4",
    headline: "Objects for a slower everyday.",
    copy: "Considered essentials. Thoughtfully made. Yours for years to come.",
    logo: "studio / objects",
    tag: "The everyday collection",
  },
  {
    id: "hero-05",
    category: "Hero",
    name: "Make something matter",
    layout: "Centered · Social proof",
    style: "hero-5",
    headline: "Small team. Big things.",
    copy: "Everything you need to turn your next spark into something real.",
    logo: "gather",
    tag: "For the independently minded",
  },
  {
    id: "hero-06",
    category: "Hero",
    name: "Build beyond the ordinary",
    layout: "Editorial · High contrast",
    style: "hero-6",
    headline: "The next chapter is yours to build.",
    copy: "A flexible foundation for people who see things a little differently.",
    logo: "OFFSET®",
    tag: "Your ideas. No limits.",
  },
  {
    id: "navigation-01",
    category: "Navigation",
    name: "Simple navigation",
    layout: "Horizontal · Light surface",
    style: "navigation navigation-1",
    headline: "A place for your next big idea.",
    logo: "Layers",
  },
  {
    id: "navigation-02",
    category: "Navigation",
    name: "Floating navigation",
    layout: "Pill · Dark surface",
    style: "navigation navigation-2",
    headline: "Everything, in its right place.",
    logo: "forma®",
  },
  {
    id: "announcement-01",
    category: "Announcement",
    name: "A little good news",
    layout: "Full width · Announcement",
    style: "announcement",
    headline: "Something good is on the way.",
    logo: "gather",
  },
];
const $ = (selector) => document.querySelector(selector);
const gallery = $("#gallery");
const search = $("#search");
const dialog = $("#detail-dialog");
let category = "all";
let heroPage = false;
let opener;
function artboard(block) {
  const dashboard =
    '<div class="mini-dashboard"><div class="dashboard-top">Overview　 /　 Your workspace</div><div class="dashboard-stats"><span>24,862</span><span>+18.6%</span><span>1,204</span></div><div class="mini-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
  const nav = `<div class="mini-nav"><span class="mini-logo">${block.logo}</span><span class="mini-links">Product　 Resources　 Company</span>${block.category === "Navigation" ? '<span class="mini-primary">Get started ↗</span>' : ""}</div>`;
  const body =
    block.category === "Hero"
      ? `${nav}<span class="mini-tag">${block.tag}</span><p class="mini-heading">${block.headline}</p><p class="mini-copy">${block.copy}</p><div class="mini-actions"><span class="mini-primary">Get started ↗</span><span class="mini-secondary">Learn more</span></div>${["hero-1", "hero-2"].includes(block.style) ? dashboard : ""}${block.style === "hero-3" ? '<span class="orbit"></span>' : ""}${block.style === "hero-4" ? '<span class="sculpture"></span>' : ""}${block.style === "hero-5" ? '<div class="mini-logos"><span>Catalog</span><span>Quotient</span><span>circooles</span><span>Sisyphus</span></div>' : ""}${block.style === "hero-6" ? '<span class="mini-number">01—06</span>' : ""}`
      : `${block.category === "Announcement" ? '<div class="announcement-strip">Meet the new collection. Made for what’s next.　 Explore now →</div>' : ""}${nav}<p class="mini-heading">${block.headline}</p>`;
  return `<div class="preview ${block.style}" aria-hidden="true"><div class="artboard">${body}</div></div>`;
}
function blockTitle(block) {
  return `${block.category} ${block.id.split("-").at(-1)}`;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const visible = blocks.filter(
    (block) =>
      (category === "all" || block.category === category) &&
      `${blockTitle(block)} ${block.id} ${block.category} ${block.name} ${block.layout}`
        .toLowerCase()
        .includes(query),
  );
  gallery.innerHTML = visible
    .map(
      (block) =>
        `<li><button class="block-card" data-block="${block.id}" aria-label="Preview ${blockTitle(block)}">${artboard(block)}<div class="card-caption"><div><h2>${blockTitle(block)}</h2><span class="block-badge">${block.category}</span></div><span class="card-arrow" aria-hidden="true"><span class="preview-action">Preview block</span>↗</span></div></button></li>`,
    )
    .join("");
  $("#empty-state").hidden = visible.length > 0;
  $("#result-count").textContent =
    `${visible.length} ${visible.length === 1 ? "block" : "blocks"}${category !== "all" ? ` in ${category}` : ""}`;
}
function route() {
  const [path, query = ""] = location.hash.slice(1).split("?");
  heroPage = path === "/blocks/hero";
  const requested = new URLSearchParams(query).get("category");
  category = heroPage
    ? "Hero"
    : ["Hero", "Navigation", "Announcement"].includes(requested)
      ? requested
      : "all";
  search.value = "";
  $("#page-title").textContent = heroPage ? "Hero blocks" : "Blocks";
  $("#page-description").textContent = heroPage
    ? "Make a memorable first impression. Explore hero layouts for your next landing page."
    : "Thoughtful starting points for your next interface. Find a layout, make it yours.";
  $("#total-count").textContent = heroPage ? "6" : "9";
  $("#hero-crumb").hidden = !heroPage;
  $("#categories").hidden = heroPage;
  document.title = `${heroPage ? "Hero blocks" : "Blocks"} · design-system-ui`;
  document.querySelectorAll("[data-category], [data-nav]").forEach((link) => {
    const active = (link.dataset.category || link.dataset.nav) === category;
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.body.classList.remove("mobile-menu-open");
  syncMenu();
  render();
}
function setView(list) {
  $("#main").classList.toggle("list", list);
  $("#grid-view").setAttribute("aria-pressed", String(!list));
  $("#list-view").setAttribute("aria-pressed", String(list));
}
function syncMenu() {
  const mobile = matchMedia("(max-width:760px)").matches;
  $("#menu-toggle").setAttribute(
    "aria-expanded",
    String(
      mobile
        ? document.body.classList.contains("mobile-menu-open")
        : !document.body.classList.contains("sidebar-collapsed"),
    ),
  );
}
search.addEventListener("input", render);
window.addEventListener("hashchange", route);
$("#grid-view").addEventListener("click", () => setView(false));
$("#list-view").addEventListener("click", () => setView(true));
$("#reset").addEventListener("click", () => {
  search.value = "";
  if (!heroPage && category !== "all") location.hash = "/blocks";
  else render();
  search.focus();
});
gallery.addEventListener("click", (event) => {
  const button = event.target.closest("[data-block]");
  if (!button) return;
  const block = blocks.find((item) => item.id === button.dataset.block);
  opener = button;
  $("#detail-title").textContent = `${blockTitle(block)} · ${block.name}`;
  $("#detail-preview").innerHTML = artboard(block);
  dialog.showModal();
});
dialog.addEventListener("close", () => opener?.focus());
$("#menu-toggle").addEventListener("click", () => {
  document.body.classList.toggle(
    matchMedia("(max-width:760px)").matches ? "mobile-menu-open" : "sidebar-collapsed",
  );
  syncMenu();
});
window.addEventListener("resize", syncMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("mobile-menu-open")) {
    document.body.classList.remove("mobile-menu-open");
    syncMenu();
    $("#menu-toggle").focus();
  }
});
$("#theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark");
  $("#theme-toggle").setAttribute("aria-pressed", String(dark));
  $("#theme-toggle").setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
});
route();
