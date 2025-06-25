"use client";
import React, { useContext, Suspense } from "react";
import SkeletonLoader from "@/components/product/SkeletonLoader";
import Header2 from "@/components/headers/Header2";
import Dropdown from "@/components/dropdown/Dropdown";
import AllProduct from "@/components/product/product";
// import Features from "@/components/homes/home-1/Features";
import Footer2 from "@/components/footers/Footer2";
// import { ResponseContext } from "@/app/login/ResponseContext";

export default function Page() {
  // const { products, loading, error } = useContext(ResponseContext);

  return (
    <section id="all_product" className="all_product">
      {/* <Header2 /> */}
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container margin_top" style={{ paddingTop: "166px" }}>
        <div className="row">
          <div className="col-md-12 col-lg-3">
            <Suspense fallback={<SkeletonLoader />}>
              <Dropdown />
            </Suspense>
          </div>
          <div className="col-md-12 col-lg-9">
            <Suspense fallback={<SkeletonLoader />}>
              <AllProduct />
            </Suspense>
          </div>
        </div>
        {/* <Features /> */}
      </div>
      <Footer2 />
    </section>
  );
}
