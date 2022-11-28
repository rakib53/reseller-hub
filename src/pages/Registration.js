import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FiLock } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import spiner from "../images/spinner.svg";
import "../styles/Login.css";
import "../styles/Registration.css";

const Registration = () => {
  const [spinner, setSpinner] = useState(false);
  const { regWithEmailPass, LoginWithGoogle, updateUserinfo, signOutUser } =
    useContext(myContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    const name = event.target.name.value;
    const accountType = event.target.accounttype.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const imageBBKey = process.env.REACT_APP_imgbbKey;
    const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((imageData) => {
        if (imageData.success) {
          regWithEmailPass(email, password)
            .then((user) => {
              setSpinner(false);
              fetch("https://resellerhub.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  displayName: name,
                  email,
                  password,
                  photoURL: imageData.data.url,
                  accountType,
                  isVerified: false,
                }),
              })
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err.message);
                });
              navigate("/login");
              updateUserinfo(name, imageData.data.url, accountType);
              signOutUser()
                .then((signOut) => {})
                .catch((err) => {});
              notifySuccess("Successfully Registred!!");
              console.log(user.user);
            })
            .catch((err) => {
              notifyError(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loginWithGoogle = () => {
    LoginWithGoogle()
      .then((users) => {
        const user = users.user;

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
        {spinner && (
          <div className="regSpinner">
            <img className="spinners" src={spiner} alt={""} />
            <p>Uploading Photo Please Wait...</p>
          </div>
        )}
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
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              type="file"
              name="image"
              id="profilePhoto"
              className="profilePhotoInput"
            />
          </div>

          <div className="inputField">
            <label htmlFor="email">Account Type</label>
            <div className="accountRole">
              <div className="acc flex items-center">
                <input
                  type="radio"
                  id="buyer"
                  name="accounttype"
                  className="radio w-4 h-4"
                  value="buyer"
                  defaultChecked
                />
                <label htmlFor="buyer">Buyer</label>
              </div>
              <div className="acc flex items-center">
                <input
                  type="radio"
                  id="seller"
                  name="accounttype"
                  value="seller"
                  className="radio w-4 h-4"
                />

                <label htmlFor="seller">Seller</label>
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
          <button type="submit" className="loginBtn bg-slate-700">
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
