import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import AcceptedTasks from "../pages/AcceptedTasks";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-jobs",
        Component: AllJobs,
      },
      {
        path: "add-job",
        element: <AddJob></AddJob>,
      },
      {
        path: "accepted-tasks",
        element: <AcceptedTasks></AcceptedTasks>,
      },
      {
        path: "auth/login",
        element: <Login></Login>,
      },
      {
        path: "auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
