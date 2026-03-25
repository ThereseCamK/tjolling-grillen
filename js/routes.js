import Home, {initHome} from "../pages/home.js";
import Menu, {initMenu} from "../pages/menu.js";
import Contact from "../pages/contact.js";

const routes = [
  { path: "/", view: Home, init: initHome},
  { path: "/menu", view: Menu, init: initMenu},
  { path: "/contact", view: Contact}
]

export default routes;