import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import spinner from "../images/spinner.svg";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(myContext);
  const location = useLocation();

  if (loader) {
    return (
      <div className="priVatespinner">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }

  if (user && user.uid) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
