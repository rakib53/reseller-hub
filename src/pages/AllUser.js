import React, { useEffect, useState } from "react";
import blueTick from "../images/blueTick.png";

const AllUser = () => {
  const [user, setUser] = useState([]);

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          const remainAdmin = user.filter((usr) => {
            return usr._id !== id;
          });
          setUser(remainAdmin);
          console.log("admin SuccessFull");
        }
      });
  };

  const makeVerifiedBuyer = (id) => {
    fetch(`http://localhost:5000/users/verify/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ isVerified: true }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const allSeller = data.filter((seller) => {
          return seller.accountType === "seller";
        });
        setUser(allSeller);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const remainingUser = user.filter((remainUsr) => {
          return remainUsr._id !== id;
        });
        setUser(remainingUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-20">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Account type</th>
              <th>Action</th>
              <th>Promotion</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {user.map((usr) => {
              return (
                <tr key={usr._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={usr?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h2 className="font-bold">{usr?.displayName}</h2>
                          {usr?.isVerified ? (
                            <img
                              className="blueTick w-5 h-5 ml-1"
                              src={blueTick}
                              alt=""
                            />
                          ) : (
                            <p className="ml-1 text-xs">Not Verified</p>
                          )}
                        </div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                  <td>{usr?.email}</td>
                  <td>{usr.accountType}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(usr?._id)}
                      className=" bg-red-600 text-white py-1 px-3 rounded-md hover:bg-sky-700 ease-in duration-300"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-sky-700 ease-in duration-300"
                      onClick={() => handleMakeAdmin(usr._id)}
                    >
                      Make admin
                    </button>
                  </td>

                  <td>
                    {usr?.isVerified ? (
                      <button className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-sky-700 ease-in duration-300">
                        Verified
                      </button>
                    ) : (
                      <button
                        className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-sky-700 ease-in duration-300"
                        onClick={() => makeVerifiedBuyer(usr._id)}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
