"use client";
import { reviewLogos } from "@/data/brands";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./brands.css";
import "../../../public/assets/css/theme/main.css";
import SingleProduct from "./SingleProduct";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Brands() {
  const [counter, setCounter] = useState(1);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setCounter(next + 1),
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 439,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}api/front/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <>
          <div className="container mt-4 pb-3 brands">
            <div className="row">
              <div className="product_list">
                <Slider {...settings}>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="skeleton-product">
                      <div className="skeleton-image mb-2"></div>
                      <div className="skeleton-text w-75 mb-1"></div>
                      <div className="skeleton-text w-50"></div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <hr />
          </div>
        </>
      ) : (
        <div className="container mt-4  pb-3 brands">
          <div className="row ">
            <div className="product_list">
              <Slider {...settings}>
                {data.map((item, index) => {
                  return (
                    <SingleProduct
                      key={index}
                      image_src={item.image}
                      prod_name={item.name}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}
