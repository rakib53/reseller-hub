import React, { useEffect, useState } from "react";

const AllUser = () => {
  const [user, setUser] = useState([]);

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

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Account type</th>
              <th></th>
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
                        <div className="font-bold">{usr?.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {usr?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{usr.accountType}</td>
                  <th>
                    <button className=" bg-red-600 text-white py-1 px-3 rounded-md hover:bg-sky-700 ease-in duration-300">
                      Delete
                    </button>
                  </th>
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
