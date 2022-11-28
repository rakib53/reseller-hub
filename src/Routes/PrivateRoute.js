import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../../Context/CreateContext";
import spinner from "../../images/spinner.svg";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(Context);
  const location = useLocation();

  if (loader) {
    return (
      <div className="spinner">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }

  if (user && user.uid) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
