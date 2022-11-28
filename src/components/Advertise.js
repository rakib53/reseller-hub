import axios from "axios";
import React, { useEffect, useState } from "react";

const Advertise = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/advertises")
      .then(function (response) {
        setAds(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      {ads.length <= 0 || (
        <>
          <h2 className="secTitle">Advertise Products</h2>
          <div className="adsWrapper grid grid-cols-3">
            {ads.map((ads) => {
              return (
                <div
                  className="card bg-white w-96 shadow-xl"
                  key={ads?.adProduct._id}
                >
                  <figure className="px-10 pt-10">
                    <img
                      src={ads?.adProduct.image}
                      alt="Shoes"
                      className="rounded-xl h-36"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{ads?.adProduct.name}</h2>
                    <p>{ads?.adProduct.desc}</p>
                    <div className="card-actions">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Advertise;
