import React from "react";
import "./product_details.css";
import Specifications from "@/components/Specifications/Specifications";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import ReviewForm from "@/components/shop/ReviewForm";
import ProductInfo from "@/components/product-info/page";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Description from "@/components/Description/page";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function page() {
  const imagesArray = [
    {
      img_src: "/assets/images/common/tv.png",
    },
    {
      img_src: "/assets/images/common/tv.png",
    },
    {
      img_src: "/assets/images/common/tv.png",
    },
    {
      img_src: "/assets/images/common/tv.png",
    },
  ];
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCounter(next + 1),
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 439,
        settings: {
          slidesToShow: 1,
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
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-4">
            {/* <Slider {...settings}>
              {imagesArray.map((item, index) => {
                return <img src={item.img_src} key={index} />;
              })}
            </Slider> */}
          </div>
          <div className="col-lg-8">
            <ProductInfo />
          </div>
          <Description />
          <Specifications />
          <ReviewSection />
          <ReviewForm />
        </div>
      </div>
      <Footer2 />
    </div>
  );
}
