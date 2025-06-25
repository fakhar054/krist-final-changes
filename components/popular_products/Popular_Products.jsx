"use client";
import React, { useEffect, useState } from "react";
import "./popular_products.css";
import Popular_Card from "./Popular_Card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPopularProducts } from "./fetchPopularProducts";
import { useRouter } from "next/navigation";

export default function Popular_Products() {
  const [counter, setCounter] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  // const products = [
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head1.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head2.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head1.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head2.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head1.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head2.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head1.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head2.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head1.png",
  //   },
  //   {
  //     productName: "Sony Headphones Wireless Noise Cancelling",
  //     img_src: "/assets/images/common/head2.png",
  //   },
  // ];

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setCounter(next + 1),
    autoplay: true,
    autoplaySpeed: 1000,
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
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleNavigation = (id) => {
    router.push(`/shop-product-detail/${id}`);
  };

  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <section id="popular_products" className="pb-3">
          <div className="container">
            <h1>Popular Products</h1>
            <div className="popular_products pb-3">
              <Slider {...settings}>
                {[...Array(4)].map((_, index) => (
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
        <section id="popular_products" className="pb-3">
          <div className="container">
            <h1>Popular Products</h1>
            <div className="popular_products pb-3">
              <Slider {...settings}>
                {products?.map((item, index) => (
                  <Popular_Card
                    key={index}
                    onClick={() => handleNavigation(item.id)}
                    img_src={item?.thumbnail}
                    productName={item?.title}
                    price={item.current_price}
                    rating={item?.rating}
                    productId={item.id}
                  />
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
