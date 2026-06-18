export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error(data?.message || "Request failed");
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "beforeend",
  clear = false
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }
  return response.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../../partials/header.html");
  const footerTemplate = await loadTemplate("../../partials/footer.html");

  renderWithTemplate(headerTemplate, qs("#header"));
  renderWithTemplate(footerTemplate, qs("#footer"));
  initializeNavigation();
}

export function initializeNavigation() {
  const menuButton = qs(".menu-toggle");
  const nav = qs(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.classList.toggle("active");
    });
  }

  const currentPath = window.location.pathname;
  qsAll(".main-nav a").forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });
}

export function updateUrlParam(key, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPokemonName(name) {
  return name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}
