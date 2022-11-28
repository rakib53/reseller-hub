import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FiLock } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import "../styles/Login.css";

const Login = () => {
  const { loginWithEmailPass, LoginWithGoogle } = useContext(myContext);

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const name = event.target.email.value;
    const password = event.target.password.value;
    loginWithEmailPass(name, password)
      .then((user) => {
        if (user.user.uid) {
          navigate(from, { replace: true });
          notifySuccess("Login succcess");
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  const loginWithGoogle = () => {
    LoginWithGoogle()
      .then((user) => {
        fetch("https://resellerhub.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            accountType: "buyer",
          }),
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
        navigate(from, { replace: true });
        notifySuccess("Successfully Logged in with Google!");
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  useEffect(() => {
    document.title = "Login || Reseller Hub";
  }, []);

  return (
    <div className="loginWrapper">
      <div className="login">
        <h1 className="title">Login</h1>
        <p className="lognDesc">Login to manage your account!</p>{" "}
        <div className="loginWithGoogle">
          <FcGoogle className="google" onClick={loginWithGoogle} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputField">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              placeholder="enter username or email"
              id="email"
              name="email"
            />
            <AiOutlineUserDelete className="icon" />
          </div>
          <div className="inputField">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="enter username or email"
              id="password"
              name="password"
            />
            <FiLock className="icon" />
          </div>
          <button className="loginBtn">Login</button>
        </form>
        <div className="signUpIn">
          <p>Have not account yet?</p>
          <Link className="signUpLink" to={"/registration"}>
            Sign Up
          </Link>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Login;
