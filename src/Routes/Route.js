import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import LoginRegistration from "../Layout/LoginRegistration";
import Main from "../Layout/Main";
import AddProduct from "../pages/AddProduct";
import AllBuyer from "../pages/AllBuyer";
import AllUser from "../pages/AllUser";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyOrder from "../pages/MyOrder";
import Myproducts from "../pages/Myproducts";
import PageNotFound from "../pages/PageNotFound";
import Products from "../pages/Products";
import Registration from "../pages/Registration";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "*",
        element: <PageNotFound></PageNotFound>,
      },
    ],
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
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/alluser",
        element: <AllUser></AllUser>,
      },
      {
        path: "/dashboard/allbuyer",
        element: <AllBuyer></AllBuyer>,
      },
      {
        path: "/dashboard/myproduct",
        element: <Myproducts></Myproducts>,
      },
      {
        path: "/dashboard/myorder",
        element: <MyOrder></MyOrder>,
      },
    ],
  },
]);

export default Router;
