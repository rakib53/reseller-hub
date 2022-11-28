import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import "../styles/MyProduct.css";

const Myproducts = () => {
  const [allProducts, setProducts] = useState([]);
  const { user } = useContext(myContext);

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  useEffect(() => {
    fetch(`http://localhost:5000/myproducts/?email=${user?.email}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        notifyError(err.message);
      });
  }, [user]);

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const remainProducts = allProducts.filter((product) => {
          return product._id !== id;
        });
        notifySuccess("Successfully Deleted Product!");
        setProducts(remainProducts);
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  const getAdvertise = (prdt) => {
    console.log(prdt);
    fetch("http://localhost:5000/advertises", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prdt }),
    })
      .then((res) => {
        return res.json();
      })
      .then((produt) => {
        console.log(produt);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      {allProducts?.length <= 0 ? (
        <div className="noProductText">
          <h3 className="noProduct">No Product Were Found</h3>
          <p>
            Start Listing your product by clicking{" "}
            <Link to={"/dashboard/addproduct"} className="addProductLink">
              Add a product
            </Link>
          </p>
        </div>
      ) : (
        <div className="myProductWrpper">
          {allProducts.map((product) => {
            return (
              <div key={product._id} className="myProduct">
                <AiFillCloseCircle
                  className="deleteProduct"
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                ></AiFillCloseCircle>
                <div className="productImage">
                  <img className="myProductImage" src={product?.image} alt="" />
                </div>
                <div className="productsInfo">
                  <h3>{product?.name}</h3>
                  <small>
                    Posted on {product?.postedOn}, {product?.location}
                  </small>
                  <p>USD ${product?.sellPrice}</p>
                  {product?.salesStatus === "available" ? (
                    <Link className="productAction productAvaiable">
                      {product?.salesStatus}
                    </Link>
                  ) : (
                    <Link className="productAction soldProduct">
                      {product?.salesStatus}
                    </Link>
                  )}
                  <div className="mt-2">
                    <button
                      onClick={() => getAdvertise(product)}
                      className="productAction soldProduct"
                    >
                      Advertise
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      )}
    </div>
  );
};

export default Myproducts;
