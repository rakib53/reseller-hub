import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Ccontext/Context";
import "../styles/Order.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(myContext);

  useEffect(() => {
    fetch(`http://localhost:5000/orders/?email=${user?.email}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  return (
    <div className="container">
      <div className="orderWrapper">
        {orders.map((order) => {
          return (
            <div className="Order" key={order._id}>
              <div className="orderImageWrapper">
                <img className="orderImage" src={order?.productImage} alt="" />
              </div>
              <div>
                <h2 className="font-semibold text-xl">{order?.productName}</h2>
                <p className="mb-1">Price:- {order?.price} USD</p>
                <button className="py-1 px-4 bg-slate-600 rounded text-white">
                  Pay now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
