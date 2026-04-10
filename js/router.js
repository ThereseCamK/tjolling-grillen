import routes from "./routes.js";
import { setActiveNav } from "./src/utils.js";
import { BASE } from "./src/config.js";

const NotFound = () => `
<div> 
    <h1>404 - Page not Found</h1> 
    <a href="/" data-link>Hjem</a>
</div>`;

function router() {
  let path = location.pathname;

  if (BASE !== "/" && path.startsWith(BASE)) {
    path = path.slice(BASE.length) || "/";
  }

  if (path.endsWith("index.html")) {
    path = "/";
  }

  const route = routes.find(r => r.path === path);

  const view = route ? route.view : NotFound;
  document.querySelector("#app").innerHTML = view();

  if (route && route.init) {
    route.init();
  }
}

function navigateTo(url) {
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = BASE === "/" ? cleanUrl : `${BASE}${cleanUrl}`;

  history.pushState({}, "", fullUrl);
  router();
  setActiveNav();
}

export function initRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute("href"));
    }
  });

  window.addEventListener("popstate", router);
  window.addEventListener("DOMContentLoaded", router);
}