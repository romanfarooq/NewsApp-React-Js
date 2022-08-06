import React from "react";
import loading from "./loading.gif";

function Spinner() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "60vh" }}
    >
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Spinner;
