import React from "react";
import loading from "./loading.gif";

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <img className="my-4" src={loading} alt="loading" />
    </div>
  );
}

export default Spinner;
