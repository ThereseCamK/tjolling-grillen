import { initRouter } from "./router.js";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { initMobileNav } from "../components/header.js";

document.getElementById("header").innerHTML = Header();
document.getElementById("footer").innerHTML = Footer();

initRouter();
initMobileNav();