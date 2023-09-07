import { Home } from "./components/Home";
import { Testas } from "./components/Testas";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/pages/Profile";
const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    index: true,
    element: <Testas />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default AppRoutes;
