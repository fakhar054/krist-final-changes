import React from "react";
import "./searchedproducts.css";
import { RiStarSFill } from "react-icons/ri";

export default function Searchedproducts() {
  return (
    <section className="Searchedproducts ">
      <div className="container">
        <div className="row ">
          <div className="col-4">
            <div className="img_div">
              <img
                src="/assets/images/solar_img.jpg"
                alt="Solar Panel for Ring Camera"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-8 product_info py-2">
            <h4>
              Solar Panel for Ring Camera, 5W Camera Solar Panel for Ring Stick
              Up Cam/Pro Battery, Spotlight Cam/Pro/Plus Battery, Solar for Ring
              Camera with 9.8ft Cable, IP65 Waterproof
            </h4>
            <div className="rating">
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
              <RiStarSFill />
            </div>
            <p className="text-primary fw-bold fs-5">€20.34</p>
            <button className="btn_add_to_cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
}
