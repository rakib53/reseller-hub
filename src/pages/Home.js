import React from "react";
import Advertise from "../components/Advertise";
import Category from "../components/Category";

const Home = () => {
  return (
    <div className="container">
      <Category></Category>
      <Advertise></Advertise>
    </div>
  );
};

export default Home;
