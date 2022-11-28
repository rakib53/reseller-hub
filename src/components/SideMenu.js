import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../Ccontext/Context";

const SideMenu = () => {
  const [users, setUsers] = useState([]);

  const { user } = useContext(myContext);

  useEffect(() => {
    fetch("https://resellerhub.vercel.app/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const checkUser = data.filter((chkUser) => {
          return chkUser.email === user?.email;
        });
        setUsers(checkUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  return (
    <div className="p-3">
      <div className="flex flex-col justify-between flex-1 mt-6">
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

            {user && users[0]?.accountType === "admin" && (
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
              </>
            )}

            {user && users[0]?.accountType === "seller" && (
              <>
                <li>
                  <Link
                    to="/dashboard/addproduct"
                    className="flex items-center text-lg font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Add Products
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/myproduct"
                    className="flex items-center text-lg py-2 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    My Products
                  </Link>
                </li>
              </>
            )}

            {user && users[0]?.accountType === "buyer" && (
              <>
                <li>
                  <Link
                    to="/dashboard/myorder"
                    className="flex items-center text-lg font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    My Orders
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
