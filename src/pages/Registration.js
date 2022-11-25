import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FiLock } from "react-icons/fi";
import {
  MdOutlineMailOutline,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import "../styles/Login.css";
import "../styles/Registration.css";

const Registration = () => {
  const { regWithEmailPass, LoginWithGoogle, updateUserinfo, signOutUser } =
    useContext(myContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoURL = event.target.photo.value;
    const accountType = event.target.accounttype.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    regWithEmailPass(email, password)
      .then((user) => {
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            displayName: name,
            email,
            photoURL,
            accountType,
          }),
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        navigate("/login");
        updateUserinfo(name, photoURL, accountType);
        signOutUser()
          .then((signOut) => {})
          .catch((err) => {});
        notifySuccess("Successfully Registred!!");
        console.log(user.user);
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  const loginWithGoogle = () => {
    LoginWithGoogle()
      .then((user) => {
        navigate("/");
        notifySuccess("Successfully Logged in with Google!");
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  useEffect(() => {
    document.title = "Registration || Reseller Hub";
  }, []);

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  return (
    <div className="loginWrapper">
      <div className="login">
        <h1 className="title">Registration</h1>
        <div className="loginWithGoogle">
          <FcGoogle className="google" onClick={loginWithGoogle} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              placeholder="enter username"
              id="name"
              name="name"
              required
            />
            <AiOutlineUserDelete className="icon" />
          </div>

          <div className="inputField">
            <label htmlFor="email">Photo URL</label>
            <input
              type="text"
              placeholder="enter Photo URL"
              id="photo"
              name="photo"
              required
            />
            <MdOutlinePhotoSizeSelectActual className="icon" />
          </div>

          <div className="inputField">
            <label htmlFor="email">Account Type</label>
            <div className="accountRole">
              <div className="acc">
                <input
                  type="radio"
                  id="seller"
                  name="accounttype"
                  value="seller"
                  defaultChecked
                />
                <label htmlFor="seller">Seller</label>
              </div>
              <div className="acc">
                <input
                  type="radio"
                  id="buyer"
                  name="accounttype"
                  value="buyer"
                />
                <label htmlFor="buyer">Buyer</label>
              </div>
            </div>
          </div>

          <div className="inputField">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="enter email"
              id="email"
              name="email"
              required
            />
            <MdOutlineMailOutline className="icon" />
          </div>
          <div className="inputField">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="enter password"
              id="password"
              name="password"
              required
            />
            <FiLock className="icon" />
          </div>
          <button type="submit" className="loginBtn">
            Registration
          </button>
        </form>
        <div className="signUpIn">
          <p>Already Have an account?</p>
          <Link className="signUpLink" to={"/login"}>
            Sign In
          </Link>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Registration;
