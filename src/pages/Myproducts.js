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

  console.log(allProducts);

  return (
    <div className="container">
      {allProducts?.length <= 0 ? (
        <div className="noProductText">
          <h3 className="noProduct">No Product Were Found</h3>
          <p>
            Start Listing your product by clicking{" "}
            <Link to={"/addproduct"} className="addProductLink">
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
                <p>{product?.name}</p>
                <Link
                  className={`productAction ${
                    product?.salesStatus === "available"
                      ? "productAvaiable"
                      : "soldProduct"
                  }`}
                >
                  {product?.salesStatus}
                </Link>
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
