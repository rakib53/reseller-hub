import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginRegistration from "../Layout/LoginRegistration";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Registration from "../pages/Registration";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home></Home> }],
  },
  {
    path: "/login",
    element: <LoginRegistration></LoginRegistration>,
    children: [{ path: "/login", element: <Login></Login> }],
  },
  {
    path: "registration",
    element: <LoginRegistration />,
    children: [
      { path: "/registration", element: <Registration></Registration> },
    ],
  },
  {
    path: "/products/:categoryCode",
    element: <LoginRegistration></LoginRegistration>,
    children: [
      {
        path: "/products/:categoryCode",
        element: <Products />,
      },
    ],
  },
]);

export default Router;
