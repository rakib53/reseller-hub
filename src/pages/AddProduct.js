import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import spiner from "../images/spinner.svg";
import "../styles/Addproducts.css";

const AddProduct = () => {
  const [sellerVerified, setSellerVerified] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { user } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const seller = data.filter((seller) => {
          return seller.email === user?.email;
        });
        setSellerVerified(seller);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  const handleAddProduct = (event) => {
    event.preventDefault();
    setSpinner(true);

    const productTitle = event.target.productTitle.value;
    const brandName = event.target.brandName.value;
    const productCondition = event.target.productCondition.value;
    const sellPrice = event.target.sellPrice.value;
    const originalPrice = event.target.originalPrice.value;
    const phoneNumber = event.target.phone.value;
    const addLocation = event.target.addLocation.value;
    const usedTime = event.target.usedTime.value;
    const productDesc = event.target.productDesc.value;
    const sellerName = user?.displayName;
    const sellerEmail = user?.email;
    const categry = event.target.category.value;
    const postOn = `${new Date().toDateString().split(" ")[1]} ${
      new Date().toDateString().split(" ")[2]
    } ${new Date().toLocaleString().split(" ")[1].split(":")[0]}:${
      new Date().toLocaleString().split(" ")[1].split(":")[1]
    } ${new Date().toLocaleString().split(" ")[2]}`;
    const imageBBKey = process.env.REACT_APP_imgbbKey;
    const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((imageData) => {
        if (imageData.success) {
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: productTitle,
              brand: brandName,
              desc: productDesc,
              image: imageData.data.url,
              category: categry,
              condition: productCondition,
              location: addLocation,
              originalPrice: originalPrice,
              sellPrice: sellPrice,
              yearOfUsed: usedTime,
              sellerName: sellerName,
              sellerEmail: sellerEmail,
              sellerVerfied: sellerVerified[0]?.isVerified,
              phone: phoneNumber,
              salesStatus: "available",
              postedOn: postOn,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.acknowledged) {
                setSpinner(false);
                notifySuccess("Successfully Added a Product!");
                navigate("/dashboard/myproduct");
              }
            })
            .catch((err) => {
              notifyError(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  return (
    <div className="container">
      <div className="addProductsWrapper">
        {spinner && (
          <div className="regSpinner">
            <img className="spinners" src={spiner} alt={""} />
            <p>Adding Poduct Please Wait...</p>
          </div>
        )}
        <form onSubmit={handleAddProduct}>
          <div className="inputFiled">
            <input
              className="bg-white"
              type="text"
              name="productTitle"
              placeholder="Product title"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="text"
              name="brandName"
              placeholder="Bran name"
              required
            />
          </div>

          <div className="inputField">
            <label htmlFor="profilePhoto">Upload Product Photo</label>
            <input
              type="file"
              name="image"
              id="profilePhoto"
              className="profilePhotoInput"
            />
          </div>

          <div className="inputFiled">
            <label htmlFor="condition">Products Condition:</label>

            <select
              id="condition"
              className="selectOption bg-white"
              name="productCondition"
            >
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="number"
              name="sellPrice"
              placeholder="Sell Price"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="number"
              name="originalPrice"
              placeholder="Original Price"
              required
            />
          </div>

          <div className="inputFiled">
            <label htmlFor="category">Choose a category:</label>

            <select
              id="category"
              className="selectOption bg-white"
              name="category"
            >
              <option value="digitalcamera">Digital Camera</option>
              <option value="cccamera">CC Camera</option>
              <option value="spycamera">Spy Camera</option>
            </select>
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="number"
              name="phone"
              placeholder="Phone number"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="text"
              name="addLocation"
              placeholder="Add your location"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              className="bg-white"
              type="text"
              name="usedTime"
              placeholder="Used Time"
              required
            />
          </div>

          <div className="inputFiled">
            <textarea
              className="productDesc bg-white"
              name="productDesc"
              placeholder="Product Description"
            ></textarea>
          </div>

          <div className="addProductWrapper">
            <button className="addProducts">Add Product</button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddProduct;
