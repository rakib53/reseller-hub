import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, signOutUser } = useContext(myContext);

  const handleSignOut = () => {
    signOutUser()
      .then((signOut) => {
        notifySuccess("Logout Success");
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  return (
    <div className="navbarWrapper">
      <div className="navbar">
        <div className="brand">
          <h2 className="logo">
            <Link to={"/"}>Reseller Hub</Link>
          </h2>
        </div>

        <ul className="menu">
          <li className="navItem">
            <Link to={"/"} className="navLink">
              Home
            </Link>
          </li>
          <li className="navItem">
            <Link href="" className="navLink">
              Add Product
            </Link>
          </li>
          <li className="navItem">
            <Link href="" className="navLink">
              My Products
            </Link>
          </li>
          <li className="navItem">
            <Link href="" className="navLink">
              My Order
            </Link>
          </li>
          <li className="navItem">
            <Link href="" className="navLink">
              Blog
            </Link>
          </li>
        </ul>

        <div className="profile">
          {user && user.uid ? (
            <Link to={"/login"} onClick={handleSignOut} className="navLink">
              Logout
            </Link>
          ) : (
            <Link to={"/login"} className="navLink">
              Login
            </Link>
          )}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Navbar;
