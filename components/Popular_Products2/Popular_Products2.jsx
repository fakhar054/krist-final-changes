"use client";
import React, { useEffect, useState } from "react";
import "./Popular_Products2.css";
// import { fetchPopularProducts } from "../popular_products/fetchPopularProducts";
// import useCategories from "../headers/categories";

export default function Popular_Products2() {
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  // console.log(categories, "cateiiiii")

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // general settings
  const popularCategories = async () => {
    try {
      const response = await fetch(
        `${baseUrl}api/front/popular/categories`, // Parameters in URL",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setCategories(data.data);
      // console.log(data, "catego poplar data");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    popularCategories();
  }),
    [];

  return (
    <section id="Popular_Products2" className="mt-3 mb-5">
      <div className="container">
        <h1>Popular Categories</h1>
        <div className="card_parent mt-3">
          {loading ? (
            <p>loading...</p>
          ) : (
            categories?.map((item, index) => {
              return (
                <div className="single_card mt-1" key={index}>
                  <img src={item?.image} />
                  <div className="info_div">
                    <h4>{item?.name}</h4>
                    {/* <p>{item?.subs[0]?.name}</p> */}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
