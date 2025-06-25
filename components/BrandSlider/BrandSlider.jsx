"use client";
import React, { useEffect, useState } from "react";
import "./brandSlider.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BrandSlider() {
  const [counter, setCounter] = useState(1);
  const [partner, serPartner] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}api/front/partners`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        serPartner(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setCounter(next + 1),
    autoplay: true,
    autoplaySpeed: 1500,
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
  return (
    <section id="brandSlider" className="mt-3">
      <div className="container  ">
        <div className="row pb-3">
          <Slider {...settings}>
            {partner?.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image?.photo}
                  style={{ height: "50px" }}
                />
              );
            })}
          </Slider>
        </div>
        {/* <hr /> */}
      </div>
    </section>
  );
}
