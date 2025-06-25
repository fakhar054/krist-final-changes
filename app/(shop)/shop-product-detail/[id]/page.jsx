import Header2 from "@/components/headers/Header2";

import Footer2 from "@/components/footers/Footer2";
import Breadcumb2 from "@/components/shop/Breadcumb2";
import ShopDetails1 from "@/components/shop/ShopDetails1";
import { products } from "@/data/products";
import ReviewSection from "@/components/ReviewSection/ReviewSection";

import "./shop_details.css";
export const metadata = {
  title:
    "Shop Details",
  description:
    "Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
};
export default function ShopDetailsPage1({ params }) {
  const id = params.id;
  const product = products.filter((elm) => elm?.id == id)[0] || products[0];

  return (
    <>
      <div
        style={{ overflowX: "clip" }}
        className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready set_parent"
      >
        <div className="heading_div">
          <Header2 />
        </div>
        <div id="wrapper" className="wrap">
          <Breadcumb2 product={product} />
          <ShopDetails1 product={product} />
        </div>
        {/* <featurs_div /> */}
        <Footer2 />
      </div>
    </>
  );
}
