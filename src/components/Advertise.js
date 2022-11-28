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

  console.log(ads);

  return (
    <div className="container">
      <h2 className="text-4xl">Advertise</h2>
      <div className="adsWrapper">
        {ads.map((ads) => {
          console.log(ads.adProduct.name);
          return (
            <>
              <h1>{ads?.adProduct.name}</h1>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Advertise;
