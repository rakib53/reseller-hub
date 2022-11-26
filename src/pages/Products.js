import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyNowModal from "../components/BuyNowModal";
import CategoryProducts from "../components/CategoryProducts";
import "../styles/Products.css";

const Products = () => {
  const [allProducts, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
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
      <h2 className="mt-10 font-semibold text-2xl">
        All Products for {allProducts[0]?.category}
      </h2>
      <div className="productsWrapper">
        {allProducts.map((products) => {
          return (
            <CategoryProducts
              key={products._id}
              products={products}
              setProductData={setProductData}
            ></CategoryProducts>
          );
        })}
        <BuyNowModal productData={productData}></BuyNowModal>
      </div>
    </div>
  );
};

export default Products;
