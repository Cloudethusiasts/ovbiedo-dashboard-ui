
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignIn from "./signinpages/OviedoSignin";
import Password from './signinpages/Password';
import LinkPage from './signinpages/LinkPage';
import NewEmail from './signinpages/NewEmail';
import SucessfulPass from './signinpages/SucessfulPass';
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import DashboardOverview from "./pages/DashboardOverview";
import EventUploadPage from "./pages/EventUploadPage";
import EventDetail from "./pages/EventDetail";
import { Stack } from "@mui/material";
import SingleEvent from "./pages/SingleEvent";

// Layout with Navbar
const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <LayoutWithNavbar />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/dashboard/eventsupload",
    element: <LayoutWithNavbar />, // Include Navbar for this route
    children: [
      {
        index: true,
        element: <EventUploadPage />,
      },
    ],
  },
  {
    path: "/dashboard/events/:eventId",
    element: <LayoutWithNavbar />, // Include Navbar for this route
    children: [
      {
        index: true,
        element: <EventDetail  />,
      },
    ],
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/linkpage",
    element: <LinkPage />,
  },
  {
    path: "/newemail",
    element: <NewEmail />,
  },
  {
    path: "/SucessfulPass",
    element: <SucessfulPass />,
  },
]);

function App() {
  return (
    <Stack
    sx={{
      backgroundColor: "#FFFFFF",
      width: "1534px",
      height: "1435px",
      position: 'relative',
      zIndex: 100
    }}
  >
    <RouterProvider router={router} /> 
  </Stack>
  );
}

export default App;
