import React, { useContext } from "react";
import { myContext } from "../Ccontext/Context";
import SideMenu from "./SideMenu";

const SideNav = () => {
  const { user } = useContext(myContext);

  return (
    <div className="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-gray-800 underline">
        Reseller hub
      </h2>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={user?.photoURL}
          alt=""
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
          {user?.displayName}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
          {user?.email}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <SideMenu></SideMenu>
      </div>
    </div>
  );
};

export default SideNav;
