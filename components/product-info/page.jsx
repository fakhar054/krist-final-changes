"use client";
import React, { useState } from "react";
import "./product_info.css";
import { FaPlus } from "react-icons/fa6";

import { LiaStarSolid } from "react-icons/lia";
import { FaMinus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

export default function page() {
  const [value, setValue] = useState(1);
  const inCreaseValue = () => {
    if (value < 99) {
      setValue(value + 1);
    }
  };
  const deCreaseValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div className="prodct_info">
      <div className="flex_div">
        <h1 className="prod_head">NYK DISNEY</h1>
        <p id="stock">In Stock</p>
      </div>
      <p id="prod_name">Girls Pink Moana Printed Dress</p>

      <div className="d-flex review_icon">
        <div className="social_icons">
          <LiaStarSolid className="icon_props" />
          <LiaStarSolid className="icon_props" />
          <LiaStarSolid className="icon_props" />
          <LiaStarSolid className="icon_props" />
          <LiaStarSolid className="icon_props" />
        </div>
        <span className="d-none sm:d-inline-block reviews">
          5.0 (100 Reviews)
        </span>
      </div>
      <div className="price_div mt-2">
        <p className="new_price">$80.00</p>
        <p className="old_price">$80.00</p>
      </div>

      <p className="product-desc  my-2 pro_details_para1">
        Moana Printed Pink Dress is soft, breathable, and perfect for young
        adventurers. Featuring a vibrant Moana design, short sleeves, and a
        flared skirt, it offers comfort and easy movement. Ideal for casual
        wear, parties, and Disney-themed events
      </p>

      <p id="color_word">Color</p>

      <div className="box-container">
        <div className="box box-red"></div>
        <div className="box box-blue"></div>
        <div className="box box-yellow"></div>
        <div className="box box-black"></div>
        <div className="box box-green"></div>
      </div>
      <p id="color_word" className="mt-2">
        Size
      </p>
      <div className="box-container">
        <div className="box size active">S</div>
        <div className="box size">M</div>
        <div className="box size">L</div>
        <div className="box size">XL</div>
        <div className="box size">XXL</div>
      </div>

      <div className="btns_div mt-2">
        <div className="quantity_div">
          <FaPlus className="increase_size" onClick={inCreaseValue} />
          <div className="count">{value}</div>
          <FaMinus className="increase_size" onClick={deCreaseValue} />
        </div>
        <div className="btn_div ">Add to cart</div>
        <div className="heart_div">
          <CiHeart className="icon_size" />
        </div>
      </div>
    </div>
  );
}
