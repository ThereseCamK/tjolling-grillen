import routes from "./routes.js";
import { setActiveNav } from "./src/utils.js"

const NotFound = () => `
<div> 
    <h1>404 - Page not Found</h1> 
    <a href="/" data-link>Hjem </a>
</div>`;

function router() {
    let path = location.pathname;

    try {
        const url = new URL(window.location.href);
        path = url.pathname;
    } catch (e){}
    if(path.endsWith("index.html") || path === "/templates/") path = "/";

        const route = routes.find(r => r.path === path);

        const view = route ? route.view : NotFound;
        document.querySelector("#app").innerHTML = view();

        if(route && route.init){
            route.init();
        }
}

function navigateTo(url){
    history.pushState(null, null, url);
    router();
    setActiveNav();
}

export function initRouter(){
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a[data-link]");
        if(link){
            e.preventDefault();
            navigateTo(link.href);
        }
    });

    window.addEventListener("popstate", router);
    window.addEventListener("DOMContentLoaded", router);
}