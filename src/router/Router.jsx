import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import AcceptedTasks from "../pages/AcceptedTasks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRouter";
import Profile from "../pages/Profile";
import JobDetail from "../pages/JobDetail";
import UpdateJob from "../pages/updateJob";
import MyAddedJobs from "../pages/MyAddedJobs";
import Error from "../pages/Error";
import Loading from "../components/Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-jobs",
        Component: AllJobs,
        loader: () => fetch("https://taskverse-server.vercel.app/allJobs"),
        hydrateFallbackElement: <Loading></Loading>,
        errorElement: <Error></Error>,
      },
      {
        path: "job-detail/:id",
        element: (
          <PrivateRoute>
            <JobDetail></JobDetail>
          </PrivateRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "add-job",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "Update-job/:id",
        element: (
          <PrivateRoute>
            <UpdateJob></UpdateJob>
          </PrivateRoute>
        ),
        errorElement: <Error></Error>,
      },
      {
        path: "added-jobs",
        element: (
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "accepted-tasks",
        element: (
          <PrivateRoute>
            <AcceptedTasks></AcceptedTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth/login",
    element: <Login></Login>,
  },
  {
    path: "auth/register",
    element: <Register></Register>,
  },
]);
