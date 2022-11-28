import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Category.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://resellerhub.vercel.app/category")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="categories">
      <h2 className="secTitle">Browse items by category</h2>
      <div className="categoryWrapper">
        {category.map((categoryData) => {
          return (
            <Link
              className="categoriesProduct"
              key={categoryData._id}
              to={`/products/${categoryData.categoryCode}`}
            >
              <div className="category">
                <img
                  className="categoryImage"
                  src={categoryData.image}
                  alt="categoryImage"
                />
                <p>{categoryData.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
