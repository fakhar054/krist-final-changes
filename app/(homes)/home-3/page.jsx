import Header2 from "@/components/headers/Header2";
import ProGrid from "@/components/product_grid/ProGrid";
import "./home_used.css";

import Pricing from "@/components/common/Pricing";
import Brands2 from "@/components/homes/home-3/Brands";
import Features from "@/components/homes/home-3/Features";
import Hero from "@/components/homes/home-3/Hero";
import KeyFeatures from "@/components/homes/home-3/KeyFeatures";
import React from "react";
import Testimonials from "@/components/homes/home-3/Testimonials";
import Blog from "@/components/homes/home-3/Blog";
import Cta from "@/components/homes/home-3/Cta";
import Footer2 from "@/components/footers/Footer2";
// import Brands3 from "@/components/common/Brands2";
import Popular_Products from "@/components/popular_products/Popular_Products";
import BrandSlider from "@/components/BrandSlider/BrandSlider";
import Popular_Products2 from "@/components/Popular_Products2/Popular_Products2";
import Promotions from "@/components/promotions/Promotions";
import MainProducts from "@/components/MainProducts/MainProducts";

import AddCart from "@/components/CardComponent/page";

export const metadata = {
  title:
    "Home 3 || Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
  description:
    "Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
};
export default function HomePage3() {
  return (
    <>
      <div className="page-wrapper uni-body panel bg-white parent_relative_div text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
        <div className="heading_div">
          <Header2 />
        </div>
        <div id="wrapper" className="wrap">
          <Hero />
          <Brands2 />
          <Promotions />
          {/* <ProGrid /> */}
          {/* <MainProducts /> */}
          <Popular_Products />

          <BrandSlider />
          <Popular_Products2 />
        </div>

        <Footer2 />
      </div>
    </>
  );
}
