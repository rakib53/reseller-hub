import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { myContext } from "../Ccontext/Context";
import "../styles/Addproducts.css";

const AddProduct = () => {
  const { user } = useContext(myContext);
  const navigate = useNavigate();

  const handleAddProduct = (event) => {
    event.preventDefault();
    const productTitle = event.target.productTitle.value;
    const brandName = event.target.brandName.value;
    const uploadPhoto = event.target.uploadPhoto.value;
    const productCondition = event.target.productCondition.value;
    const sellPrice = event.target.sellPrice.value;
    const originalPrice = event.target.originalPrice.value;
    const phoneNumber = event.target.phone.value;
    const addLocation = event.target.addLocation.value;
    const usedTime = event.target.usedTime.value;
    const productDesc = event.target.productDesc.value;
    const sellerName = user?.displayName;
    const sellerEmail = user?.email;
    const isSellerVerified = true;
    const categry = event.target.category.value;
    const postOn = `${new Date().toDateString().split(" ")[1]} ${
      new Date().toDateString().split(" ")[2]
    } ${new Date().toLocaleString().split(" ")[1].split(":")[0]}:${
      new Date().toLocaleString().split(" ")[1].split(":")[1]
    } ${new Date().toLocaleString().split(" ")[2]}`;

    // new Date().toDateString().split(" ")[1] Nov
    // new Date().toDateString().split(" ")[2] 25
    // new Date().toLocaleString().split(" ")[1].split(":")[0] 4
    // new Date().toLocaleString().split(" ")[1].split(":")[1] 54
    // new Date().toLocaleString().split(" ")[2] PM

    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: productTitle,
        brand: brandName,
        desc: productDesc,
        image: uploadPhoto,
        category: categry,
        condition: productCondition,
        location: addLocation,
        originalPrice: originalPrice,
        sellPrice: sellPrice,
        yearOfUsed: usedTime,
        sellerName: sellerName,
        sellerEmail: sellerEmail,
        sellerVerfied: isSellerVerified,
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
          notifySuccess("Successfully Added a Product!");
          navigate("/myproducts");
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  return (
    <div className="container">
      <div className="addProductsWrapper">
        <form onSubmit={handleAddProduct}>
          <div className="inputFiled">
            <input
              type="text"
              name="productTitle"
              placeholder="Product title"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="brandName"
              placeholder="Bran name"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="uploadPhoto"
              placeholder="Upload your photo"
              required
            />
          </div>

          <div className="inputFiled">
            <label htmlFor="condition">Products Condition:</label>

            <select
              id="condition"
              className="selectOption"
              name="productCondition"
            >
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="sellPrice"
              placeholder="Sell Price"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="originalPrice"
              placeholder="Original Price"
              required
            />
          </div>

          <div className="inputFiled">
            <label htmlFor="category">Choose a category:</label>

            <select id="category" className="selectOption" name="category">
              <option value="digitalcamera">Digital Camera</option>
              <option value="cccamera">CC Camera</option>
              <option value="spycamera">Spy Camera</option>
            </select>
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="addLocation"
              placeholder="Add your location"
              required
            />
          </div>

          <div className="inputFiled">
            <input
              type="text"
              name="usedTime"
              placeholder="Used Time"
              required
            />
          </div>

          <div className="inputFiled">
            <textarea
              className="productDesc"
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
