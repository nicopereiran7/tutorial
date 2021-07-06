// LAYOUT
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// ADMIN PAGES
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import Products from "../pages/Admin/Products";
import Error404 from "../pages/Error404";

// BASIC PAGES
import Home from "../pages/Home";
import Contact from "../pages/Contact";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/products",
        component: Products,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
    ],
  },
];

export default routes;
