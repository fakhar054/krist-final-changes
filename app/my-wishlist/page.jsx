"use client";
import React, { useContext } from "react";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import "./my-wishlist.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import Features from "@/components/Features_div/page";
import { MdDelete } from "react-icons/md";
import { ResponseContext } from "../login/ResponseContext";

export default function page() {
  const { removeFromWishlist, wishlist, currency } =
    useContext(ResponseContext);
  console.log(wishlist);
  return (
    <section className="my_wishlist">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container mar_top">
        <div className="row">
          <div className="col-lg-4 my_profile mb-2">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>
          <div className="col-lg-8">
            {wishlist && wishlist.length > 0 ? (
              <div className="product_grid_main_div mt-5">
                {wishlist.map((item, index) => (
                  <div className="product_parent_div mb-2" key={index}>
                    <div className="img_div">
                      <img
                        src={
                          item?.thumbnail ||
                          "/assets/images/common/dress_pic.png"
                        }
                        alt=""
                      />
                      <MdDelete
                        className="delte_icon"
                        onClick={() => {
                          removeFromWishlist(item?.id);
                        }}
                      />
                    </div>
                    <div className="content">
                      <h6>{item?.title}</h6>
                      <p id="color_gray">{item?.category_name}</p>
                      <div className="price_div">
                        <p id="newPrice">
                          {currency?.sign}
                          {item?.current_price}
                        </p>
                        <p id="old_Price">
                          {currency?.sign}
                          {item?.previous_price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="alert alert-warning mt-5">Empty my wishlist!</p>
            )}
          </div>

          <div className="mt-3">
            <Features />
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
