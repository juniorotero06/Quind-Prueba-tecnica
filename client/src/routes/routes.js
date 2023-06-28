import Home from "../pages/home";
import Punto1 from "../pages/punto-1";
import Punto2 from "../pages/punto-2";
import CameraPage from "../pages/punto-3/camera";
import ClientPage from "../pages/punto-3/client";
import FilmPage from "../pages/punto-3/film";
import StorePage from "../pages/punto-3/store";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/punto-1",
    exact: true,
    component: Punto1,
  },
  {
    path: "/punto-2",
    exact: true,
    component: Punto2,
  },
  {
    path: "/cameras",
    exact: true,
    component: CameraPage,
  },
  {
    path: "/clients",
    exact: true,
    component: ClientPage,
  },
  {
    path: "/films",
    exact: true,
    component: FilmPage,
  },
  {
    path: "/stores",
    exact: true,
    component: StorePage,
  },
];

export default routes;
