import React, { useEffect, useState } from "react";

const AllUser = () => {
  const [user, setUser] = useState([]);

  const handleMakeAdmin = (id) => {
    fetch(`https://resellerhub.vercel.app/users/${id}`, {
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

  useEffect(() => {
    fetch("https://resellerhub.vercel.app/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const allSeller = data.filter((seller) => {
          return seller.accountType === "buyer";
        });
        setUser(allSeller);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteUser = (id) => {
    fetch(`https://resellerhub.vercel.app/users/${id}`, {
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
    <div className="px-5 lg:px-20">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Buyer Email</th>
              <th>Account type</th>
              <th>Action</th>
              <th>Promotion</th>
            </tr>
          </thead>
          <tbody>
            {user?.length <= 0 ? (
              <tr>
                <td className="noUserText flex justify-center items-center">
                  <h3 className="text-center font-bold text-xl">
                    You haven't any Buyer
                  </h3>
                </td>
              </tr>
            ) : (
              user.map((usr) => {
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
                          <div className="font-bold">{usr?.displayName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{usr?.email}</td>
                    <td>{usr.accountType}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(usr._id)}
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
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
