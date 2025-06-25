import React from "react";
import "./single_product.css";

export default function SingleProduct({ image_src, prod_name }) {
  return (
    <div>
      <div className="container" id="single_product_brand">
        <div className="row">
          <div className="single_product_div">
            <img src={image_src} alt="imge from slider" />
            <p>{prod_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
