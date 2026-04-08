import Home, {initHome} from "../pages/home.js";
import Menu, {initMenu} from "../pages/menu.js";


const routes = [
  { path: "/", view: Home, init: initHome},
  { path: "/menu", view: Menu, init: initMenu},
 
]

export default routes;