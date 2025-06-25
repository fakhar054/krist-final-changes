"use client";
import "./FeaturedProducts.css";
import { products } from "@/data/products";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function FeaturedProducts({ category, currency }) {
  const [products, setProducts] = useState();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    if (!category) return;
    const fetchProducts = async () => {
      let apiUrl = `${baseUrl}api/front/products/category/${category}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data, "API Response");

        if (data.status && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  //this function counts word and then add ...
  function formatTitle(title, wordLimit = 6) {
    if (!title) return "";
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  }

  return (
    <div className="featured-products-panel panel featured_products_panel mt-4 ">
      <h2>Related Products</h2>
      <div className="panel swiper-parent mt-4 md:mt-6">
        {/* Swiper init */}
        <Swiper
          className="swiper"
          spaceBetween={8} // default gap
          slidesPerView={2} // default items
          pagination={{ clickable: true }}
          modules={[Navigation]}
          navigation={{
            prevEl: ".snbn8",
            nextEl: ".snbp8",
            // prevEl: ".snbp8",
            // nextEl: ".snbn8",
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 5,
              spaceBetween: 32,
            },
          }}
        >
          {products?.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <article className="product type-product panel">
                <div className="vstack gap-2">
                  <div className="panel">
                    <figure className="featured-image m-0 rounded ratio ratio-1x1 uc-transition-toggle overflow-hidden">
                      <Image
                        className="media-cover image uc-transition-scale-up uc-transition-opaque"
                        src={elm?.thumbnail}
                        width={1280}
                        height={1707}
                        alt="Elegant Watch"
                        unoptimized
                        onError={(e) => {
                          e.currentTarget.src =
                            "/assets/images/dummy-image.png";
                        }}
                      />
                      <Link
                        href={`/shop-product-detail/${elm?.id}`}
                        className="position-cover"
                        data-caption="Elegant Watch"
                      ></Link>
                    </figure>
                  </div>
                  <div className="content vstack  gap-1 fs-6  xl:mt-1">
                    <div className="my_content_div">
                      <h4>{formatTitle(elm?.title)}</h4>
                      <p className="description">{elm?.category_name}</p>
                      <div className="prices">
                        <div className="new_price">
                          <p>
                            {/* {currency?.sign} */}
                            {elm?.current_price}
                          </p>
                        </div>
                        <div className="old_price">
                          <p className="text-muted">
                            <del>
                              {/* {currency?.sign} */}
                              {elm?.previous_price}
                            </del>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Add Arrows */}
        <div className="swiper-nav snbp8 swiper-next btn btn-xs md:btn-md w-32px md:w-48px h-32px md:h-48px bg-white text-gray-900 dark:bg-gray-700 dark:text-white rounded-circle shadow-xs position-absolute top-50 start-100 translate-middle-x mt-n9 md:mt-n10 z-1">
          <i className="unicon-chevron-right icon-1 md:icon-2" />
        </div>
        <div className="swiper-nav snbn8 swiper-prev btn btn-xs md:btn-md w-32px md:w-48px h-32px md:h-48px bg-white text-gray-900 dark:bg-gray-700 dark:text-white rounded-circle shadow-xs position-absolute top-50 start-0 translate-middle-x mt-n9 md:mt-n10 z-1">
          <i className="unicon-chevron-left icon-1 md:icon-2" />
        </div>
      </div>
    </div>
  );
}
