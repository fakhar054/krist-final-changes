"use client";
import React from "react";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import "./search_page.css";
import Searchedproducts from "@/components/Searchedproducts/Searchedproducts";

export default function page() {
  return (
    <section className="search_page">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container margin_top " style={{ paddingTop: "166px" }}>
        <div className="row">
          <div className="col-md-12 col-lg-3"></div>
          <div className="col-md-12 col-lg-9">
            <h3>Results</h3>
            <p className="mb-2">
              Check each product page for other buying options.
            </p>
            <div className="pro_flex mb-3">
              <Searchedproducts />
              <Searchedproducts />
              <Searchedproducts />
              <Searchedproducts />
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </section>
  );
}
