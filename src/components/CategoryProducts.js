import React from "react";
import blueTick from "../images/blueTick.png";

const CategoryProducts = ({ products, setProductData }) => {
  return (
    <div className="products">
      <h3>{products?.name}</h3>
      <small>
        Posted on {products?.postedOn}, {products?.location}
      </small>
      {products?.sellerVerfied ? (
        <div className="flex items-center">
          <p className="bg-amber-200 px-2 rounded-full text-xs">
            <span className="font-semibold">{products?.sellerName}</span>
          </p>
          <img className="blueTick w-3 h-3 ml-1" src={blueTick} alt="" />
        </div>
      ) : (
        <div className="flex items-center">
          <p className="bg-amber-200 px-2 rounded-full text-xs">
            <span className="font-semibold">{products?.sellerName}</span>
          </p>
          <p className="ml-1 text-xs">Not Verified</p>
        </div>
      )}
      <div className="productImagewrapper">
        <img
          className="productsImage w-full object-cover"
          src={products?.image}
          alt=""
        />
      </div>
      <h2>USD ${products?.sellPrice}</h2>
      <small>Original price:- USD {products?.originalPrice}</small>
      <div>
        <p>condition: {products?.condition}</p>
        <p>Brand: {products?.brand}</p>
        <p>Used for: {products?.yearOfUsed}</p>
      </div>

      <div className="description">
        <p className="descTitle">Description</p>
        <p>{products?.desc}</p>
      </div>

      <label
        onClick={() => setProductData(products)}
        htmlFor="buyNowModal"
        className="rounded-1 my-4 w-full  bg-slate-700 text-slate-50 py-2 text-center"
      >
        Buy Now
      </label>
    </div>
  );
};

export default CategoryProducts;
