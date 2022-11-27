import React from "react";
import PageNotFoundImg from "../images/notfounds.webp";

const PageNotFound = () => {
  return (
    <div>
      <img
        style={{ height: "100%", objectFit: "cover" }}
        className="w-full h-fit"
        src={PageNotFoundImg}
        alt=""
      />
    </div>
  );
};

export default PageNotFound;
