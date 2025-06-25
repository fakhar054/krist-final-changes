"use client";
import React, { useEffect, useState } from "react";
import "./popular_products.css";
import Popular_Card from "./Popular_Card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPopularProducts } from "./fetchPopularProducts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Related_blogs({ blog }) {
  const [counter, setCounter] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setCounter(next + 1),
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 439,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 788,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await fetch(
  //
  //         );
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch data");
  //         }
  //         const result = await response.json();
  //         setData(Array.isArray(result.popular_products) ? result.popular_products : []);
  //       } catch (err) {
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // const handleNavigation = (id) => {
  //     router.push(`/shop-product-detail/${id}`);
  // };

  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <section id="popular_products" className="py-3">
          <div className="">
            <h2 className="p-0">Related Posts</h2>
            <div className="popular_products pb-3">
              <Slider {...settings}>
                {[...Array(2)].map((_, index) => (
                  <div className="popular_card_skeleton" key={index}>
                    <div className="skeleton-image" />
                    <div className="skeleton-line skeleton-title" />
                    <div className="skeleton-line skeleton-price" />
                  </div>
                ))}
              </Slider>
            </div>
            <hr />
          </div>
        </section>
      ) : (
        <section id="popular_products" className="py-3">
          <div className="">
            <h2 className="p-0">Related Posts</h2>
            <div className="popular_products pb-3">
              <Slider {...settings} className="d-flex flex-column gap-3 me-3">
                {blog?.relatedBlogs?.map((item, index) => (
                  <div className=" d-flex flex-column gap-3 me-3" key={index}>
                    <div className="single_card">
                      <Link href={`/my-blog/${item.id}`}>
                        <img
                          src={item?.photo}
                          alt={item?.title}
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-2">
                        <span>
                          {item?.category} /{" "}
                          {item?.created_at &&
                            new Date(item.created_at).toLocaleDateString(
                              "en-GB"
                            )}
                        </span>
                        <h3>{item?.title}</h3>
                        <p>
                          {" "}
                          {item?.detail}
                          <Link
                            href={`/my-blog/${item.id}`}
                            className="read-more"
                          >
                            Continue reading
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <hr />
          </div>
        </section>
      )}
    </>
  );
}
