import React from "react";

const CategoryProducts = ({ products, setProductData }) => {
  return (
    <div className="products">
      <h3>{products?.name}</h3>
      <small>
        Posted on {products?.postedOn}, {products?.location}
      </small>
      <div className="productImagewrapper">
        <img className="productsImage" src={products?.image} alt="" />
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
