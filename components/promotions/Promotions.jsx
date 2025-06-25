"use client";
import React, { useContext, useEffect, useState } from "react";
import "./promotions.css";
import useCategories from "../headers/categories";
import { useRouter } from "next/navigation";
import { ResponseContext } from "@/app/login/ResponseContext";

export default function Promotions() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("recommendations");
  const { latestCategories } = useCategories();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useContext(ResponseContext);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await latestCategories();
      if (data.status && Array.isArray(data.data)) {
        setCategories(data.data); // ✅ Store categories in state
      } else {
        throw new Error("Invalid API response structure");
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const [procCat, setProcat] = useState();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchCategoryProducts = async (categoryName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}api/front/products/category/${encodeURIComponent(
          categoryName
        )}`
      );
      // console.log(response, "response cate product")
      const data = await response.json();
      setProcat(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    setActiveTab(categoryName);
    fetchCategoryProducts(categoryName); // Pass category name only
  };

  const [productss, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}api/front/deal-of-the-day`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getProducts();
  }, []);

  const handleNavigation = (id) => {
    router.push(`/shop-product-detail/${id}`);
  };

  return (
    <>
      {/* Tabs Section */}
      <section className="promotions mb-5 pb-5" id="promotions">
        <div className="container">
          <h1>New Promotions</h1>
          <h4>See what’s new with our promos</h4>
          <div className="tab_div">
            <p
              className={activeTab === "recommendations" ? "active" : ""}
              onClick={() => {
                setActiveTab("recommendations");
                setProcat([]);
              }}
            >
              Recommendations
            </p>
            {loading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <p key={index} className="skeleton-tab mb-2"></p>
                ))}
              </>
            ) : (
              categories?.slice(0, 4).map((category, index) => (
                <p
                  key={index}
                  className={activeTab === category.name ? "active" : ""}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category?.name}
                </p>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Content Sections Based on Active Tab */}
      <section className="deal-section mb-3">
        <div className="container">
          {activeTab === "recommendations" && (
            <div className="row row_height ">
              {/* Recommendation Section */}
              <div className="col-lg-8 ">
                <div className="img_parent_div">
                  <div className="main_img_div pb-3 pt-3">
                    <p id="discount">Up to 70% OFF</p>
                    <div className="row flex_one_row">
                      <div className="col-md-6 width_50">
                        <h3 className="mt-3 heading">
                          {/* Lenovo
                          <br /> Office & Work Laptop */}
                          {productss?.title}
                        </h3>
                        <a
                          href={productss?.shop_link}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <div className="text_icon_div">
                            <p id="shop_now">Shop Now</p>
                            <img
                              src="/assets/images/common/icons/arrow_img.png"
                              alt=""
                            />
                          </div>
                        </a>
                        {/* <p className="mt-2" id="latest">
                          Power & Versatility
                        </p> */}
                        <p id="latest">{productss?.details}</p>
                      </div>
                      <div className="col-md-6 img_col width_50">
                        <img
                          src={
                            productss
                              ? productss?.image
                              : "/assets/images/products/computer1.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="small_images_parent">
                    <div className="small_image1 small_div_width">
                      <img src="/assets/images/products/laptop.png" alt="" />
                      <p>
                        Lenovo Laptop
                        <span id="small_dis" className="mt-2 ">
                          Upto 70% OFF
                        </span>
                      </p>
                    </div>
                    <div className="small_image1 small_div_width">
                      <img src="/assets/images/products/laptop.png" alt="" />
                      <p>
                        Lenovo Laptop <span id="small_dis">Upto 70% OFF</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="second_col_main">
                  <div className="small_image1 second_col_div">
                    <img src="/assets/images/products/laptop.png" alt="" />
                    <p>
                      Lenovo Laptop
                      <span id="small_dis" className="mt-2 ">
                        Upto 70% OFF
                      </span>
                    </p>
                  </div>
                  <div className="small_image1 second_col_div_2 p_x">
                    <img src="/assets/images/products/laptop.png" alt="" />
                    <p>
                      Lenovo Laptop <span id="small_dis">Upto 70% OFF</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="popular_products2 pb-3">
            {loading
              ? [...Array(4)].map((_, index) => (
                  <div className="single_card2 skeleton" key={index}>
                    <div className="img_div skeleton-box" />
                    <p className="skeleton-line mt-2" />
                    <div className="review_div">
                      <div className="div_1">
                        <p className="skeleton-line" style={{ width: "60%" }} />
                      </div>
                      <div className="price_div">
                        <p className="skeleton-line" style={{ width: "40%" }} />
                      </div>
                    </div>
                  </div>
                ))
              : procCat?.length > 0
              ? procCat.map((product, index) => (
                  <div className="single_card2" key={index}>
                    <div
                      className="img_div"
                      onClick={() => handleNavigation(product.id)}
                    >
                      <img src={product?.thumbnail} />
                    </div>
                    <p style={{ textAlign: "left", margin: "10px 0px" }}>
                      {product?.title}
                    </p>
                    <div className="review_div" style={{ textAlign: "left" }}>
                      <div className="div_1">
                        <p>
                          <strong>{product?.category_name}</strong>
                        </p>
                      </div>
                      <div className="price_div">
                        <p>
                          <strong>
                            {/* {currency?.sign} */}
                            {product?.current_price}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}
