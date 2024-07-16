import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Search from "../Pages/Search/Search";
import Scheduling from "../Pages/Scheduling/Scheduling";
import CurrentJob from "../Pages/CurrentJob/CurrentJob";
import Despatch from "../Pages/Despatch/Despatch";
import InvalidJob from "../Pages/InvalidJob/InvalidJob";
import JobOnHold from "../Pages/JobOnHold/JobOnHold";
import Login from "../Pages/Login/Login";
import SelectLocation from "../Pages/SelectLocation/SelectLocation";

export const router = createBrowserRouter([
  {
    path: "/Demo",
    element: <Login />,
  },
  {
    path: "/select_location",
    element: <SelectLocation />,
  },
  {
    path: "/job_manager",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "scheduling",
        element: <Scheduling />,
      },
      {
        path: "current_job",
        element: <CurrentJob />,
      },
      {
        path: "despatch",
        element: <Despatch />,
      },
      {
        path: "invalid_job",
        element: <InvalidJob />,
      },
      {
        path: "jobs_on_hold",
        element: <JobOnHold />,
      },
    ],
  },
]);
