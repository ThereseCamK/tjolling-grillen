import { initRouter } from "./router.js";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { initMobileNav } from "../components/header.js";

const redirect = sessionStorage.getItem("redirect");

if (redirect) {
  sessionStorage.removeItem("redirect");
  history.replaceState(null, null, redirect);
}

document.getElementById("header").innerHTML = Header();
document.getElementById("footer").innerHTML = Footer();

initRouter();
initMobileNav();