import React, { useContext } from "react";
import { myContext } from "../Ccontext/Context";

const BuyNowModal = ({ productData }) => {
  const { user } = useContext(myContext);
  console.log(productData);
  const handleOrderSubmit = (event) => {
    event.preventDefault();

    const buyerName = user?.displayName;
    const buyerEmail = user?.email;
    const buyerPhone = event.target.phone.value;
    const meetLocation = event.target.location.value;
    const productName = productData?.name;
    const price = productData?.sellPrice;
    const productId = productData?._id;
    const productCategory = productData?.categoryCode;
  };

  return (
    <div>
      <input type="checkbox" id="buyNowModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-white py-3 px-3">
          <label
            htmlFor="buyNowModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-center font-semibold text-xl mt-2 mb-3">
            Your Product Info
          </h2>

          <form onSubmit={handleOrderSubmit}>
            <input
              className="bg-white border w-full p-1 my-2 rounded"
              type="text"
              defaultValue={user?.displayName}
              readOnly
            />
            <input
              className="bg-white border w-full p-1 my-2 rounded"
              type="text"
              defaultValue={user?.email}
              readOnly
            />
            <input
              className="bg-white border w-full p-1 my-2 rounded"
              type="text"
              defaultValue={`Price: ${productData?.sellPrice} USD`}
              readOnly
            />
            <input
              className="bg-white border w-full p-1 rounded"
              type="text"
              defaultValue={productData?.name}
              readOnly
            />

            <input
              type="number"
              name="phone"
              placeholder="Enter your phone"
              className="bg-white border w-full p-1 my-2 rounded"
            />
            <textarea
              name="location"
              placeholder="Meeting location"
              id="location"
              className="bg-white border w-full p-1 my-2 min-h-20 rounded"
            ></textarea>
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="p-2 bg-slate-700 text-slate-50 rounded w-50"
              >
                Buy now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
