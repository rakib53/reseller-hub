import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="p-3">
      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center font-medium py-2 text-2xl tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Home
              </Link>
            </li>

            <>
              <li>
                <Link
                  to="/dashboard/alluser"
                  className="flex items-center  text-lg font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  All Seller
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/allbuyer"
                  className="flex items-center  text-lg py-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  All Buyer
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/addproduct"
                  className="flex items-center text-lg font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Add Products
                </Link>
              </li>
            </>

            <li>
              <Link
                to="/dashboard/myproduct"
                className="flex items-center text-lg py-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                My Products
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/myorder"
                className="flex items-center text-lg font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                My Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
