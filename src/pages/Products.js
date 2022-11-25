import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Products.css";

const Products = () => {
  const [allProducts, setProducts] = useState([]);
  const { categoryCode } = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const matchedCategory = data.filter((product) => {
          return product.categoryCode === categoryCode;
        });
        setProducts(matchedCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryCode]);

  return (
    <div className="container">
      <h2>All Product for {allProducts[0]?.category}</h2>
      <div className="productsWrapper">
        {allProducts.map((products) => {
          return (
            <div key={products._id} className="products">
              <h3>{products?.name}</h3>
              <small>Posted on 12 nov, {products?.location}</small>
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
              <button className="bookNowBtn">Book Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
