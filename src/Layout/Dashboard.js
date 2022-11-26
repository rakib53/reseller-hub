import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
// import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64">
        <SideNav></SideNav>
      </div>
      <div className="flex-1 my-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
