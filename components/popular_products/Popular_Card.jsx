"use client";
import React, { useContext, useEffect, useState } from "react";
import "./popular_card.css";

import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { ResponseContext } from "@/app/login/ResponseContext";
import Link from "next/link";

export default function Popular_Card({
  img_src,
  productName,
  price,
  rating,
  productId,
  onClick,
}) {
  const { addToWishlist, removeFromWishlist, wishlist, currency } =
    useContext(ResponseContext);

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (wishlist && productId) {
      setFavorite(wishlist.some((item) => item?.id == productId));
    }
  }, [wishlist, productId]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setFavorite(!favorite);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section id="popular_card" className="pt-3">
      <div className="container">
        <div className="single_card" style={{ position: "relative" }}>
          <div className="img_div" onClick={onClick}>
            <img src={img_src} />
          </div>
          {isLoggedIn ? (
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              {favorite ? (
                <FaHeart className="icon_size" onClick={toggleFavorite} />
              ) : (
                <FaRegHeart className="icon_size" onClick={toggleFavorite} />
              )}
            </div>
          ) : (
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <Link href={"/login"}>
                <FaRegHeart className="icon_size" />
              </Link>
            </div>
          )}
          <p>{productName}</p>
          <div className="review_div">
            <div className="div_1">
              <FaStar className="icon_props" />
              <p>
                <strong>{rating}</strong> 12k reviews
              </p>
            </div>
            {/* {currency?.sign} */}
            <div className="price_div">
              <p>
                <strong>{price}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
