import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import Home from "./components/Home.jsx";
import AddUser from "./components/AddUser.jsx";
import AllUser from "./components/AllUser";
import AddEmployees from "./components/AddEmployees.jsx";
import AllEmployees from "./components/AllEmployees";
import AddDepartment from "./components/AddDepartment";
import AllDepartment from "./components/AllDepartment";

import MasterDetailsTwo from "./components/MasterDetailsTwo";

import Profile from "./components/Profile";
import Login from "./components/auth/Login";
import DNDContainer from "./components/DND/DNDContainer";
import MailContainer from "./components/mail/MailContainer";
import {AuthProvider} from "./context/AuthContext";
import InboxPage from "./pages/InboxPage";
import SentPage from "./pages/SentPage";
import DraftPage from "./pages/DraftPage";
import DetailsPage from "./pages/DetailsPage";

const api = "http://localhost:3000/api/employees";

const loadEmployees = async () => {
  try {
    const response = await fetch(api);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
const loadDepartments = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/departments");
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

// const loadUsers = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/users");
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//   }
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/addUser",
        element: <AddUser></AddUser>,
      },
      {
        path: "/allUser",
        element: <AllUser></AllUser>,
      },
      {
        path: "/addEmployee",
        element: <AddEmployees></AddEmployees>,
      },
      {
        path: "/employees",
        element: <AllEmployees></AllEmployees>,
        loader: loadEmployees,
      },
      {
        path: "/addDepartment",
        element: <AddDepartment></AddDepartment>,
      },
      {
        path: "/allDepartment",
        element: <AllDepartment></AllDepartment>,
      },

      {
        path: "/master_details",
        element: <MasterDetailsTwo></MasterDetailsTwo>,
        loader: loadDepartments,
      },

      {
        path: "/users",
        element: <DNDContainer />,
        // loader: loadUsers,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/notification",
        element: <MailContainer />,
        children: [
          {
            path: "",
            element: <Navigate to="inbox" />, // Redirect to inbox by default
          },
          {
            path: "inbox",
            element: <InboxPage />,
          },
          {
            path: "inbox/:id",
            element: <DetailsPage />,
          },
          {
            path: "sent",
            element: <SentPage />,
          },
          {
            path: "sent/:id",
            element: <DetailsPage />,
          },
          {
            path: "draft",
            element: <DraftPage />,
          },
          {
            path: "draft/:id",
            element: <DetailsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
