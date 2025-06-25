"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { LuMinus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";

import FeaturedProducts from "./FeaturedProducts";
import ProductSlide from "./ProductSlide";
import ReviewSection from "../ReviewSection/ReviewSection";
import Specifications from "../Specifications/Specifications";
import { ResponseContext } from "@/app/login/ResponseContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./shopDetails1.css";
import ReviewForm from "./ReviewForm";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export default function ShopDetails1() {
  const { cart, addToCart, updateCart, currency } = useContext(ResponseContext);
  const [data, setData] = useState(null);
  console.log(data, "data single pro..");
  // console.log(data.stock, "stock length");

  const [loading, setLoading] = useState(false);
  const [bodyColor, setBodyColor] = useState(false);
  const [cartProducts, setCartProducts] = useState({});
  const [selectedColor, setSelectedColor] = useState(""); // New state for color
  const [selectedSize, setSelectedSize] = useState(""); // New state for size
  const { id } = useParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}api/front/product/${id}/details`);
        const result = await res.json();
        setData(result.data);
        setCartProducts({ [result.data.id]: 1 }); // Initialize quantity
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return; // Prevent invalid quantities
    setCartProducts((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleDecrease = (productId) => {
    if (cartProducts[productId] > 1) {
      updateCartQuantity(productId, cartProducts[productId] - 1); // Decrease the quantity
    }
  };

  const handleIncrease = (productId) => {
    updateCartQuantity(productId, (cartProducts[productId] || 1) + 1); // Increase the quantity
  };

  const handleAddToCart = () => {
    const selectedColorValue = selectedColor || ""; // Default to empty string if not selected
    const selectedSizeValue = selectedSize || "";
    if (data) {
      const quantity = cartProducts[data.id] || 1; // Default to 1 if no quantity is selected
      // console.log("Data being added to cart:", {
      //   ...data,
      //   quantity,
      //   color: selectedColorValue,   // Add color
      //   size: selectedSizeValue,     // Add size
      // });
      addToCart(
        {
          ...data,
          quantity,
          color: selectedColorValue,
          size: selectedSizeValue,
        },
        quantity
      );
    }
  };

  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(ResponseContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (wishlist && id) {
      setFavorite(wishlist.some((item) => item?.id == id));
    }
  }, [wishlist, id]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
    setFavorite(!favorite);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return loading ? (
    <article className="product type-product single product-single py-2 lg:py-2 xl:py-2">
      <div className="container single_product">
        <div className="row child-cols-12 lg:child-cols-6 gy-4 gx-4 md:gx-6 xl:gx-8">
          <div>
            <Skeleton height={400} />
          </div>
          <div>
            <div className="product-details sticky-element panel vstack gap-1 xl:gap-2">
              <Skeleton height={30} width={250} />
              <Skeleton height={20} width={100} />
              <Skeleton count={2} />
              <Skeleton height={40} width={150} />
              <Skeleton height={100} />
              <div className="box-container">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} width={30} height={30} circle />
                ))}
              </div>
              <div className="box-container mt-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} width={50} height={30} />
                ))}
              </div>
              <div className="product-actions hstack gap-1 xl:mt-2">
                <Skeleton width={100} height={40} />
                <Skeleton width={40} height={40} circle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  ) : (
    <article className="product type-product single product-single py-2 lg:py-2 xl:py-2">
      <div
        className={`container single_product ${
          bodyColor ? "bg_color_gray" : ""
        }`}
      >
        <header className="product-header panel">
          <div className="row child-cols-12 lg:child-cols-6 gy-4 gx-4 md:gx-6 xl:gx-8">
            <div>
              <ProductSlide data={data} />
            </div>
            <div>
              <div className="product-details sticky-element panel vstack gap-1 xl:gap-2">
                <div className="flex_div">
                  <h1 className="pro_details">{data?.title}</h1>
                  <p id="stock">{data?.stock > 0 ? "In Stock" : "out Stock"}</p>
                </div>
                <p id="prod_name">{data?.title}</p>

                <div className="product-rating hstack gap-1">
                  <ul
                    className="nav-x gap-0 text-gray-100 dark:text-gray-700"
                    title="Average 4 out of 5"
                  >
                    {[...Array(Number(data?.reviews?.[0]?.rating) || 0)].map(
                      (_, i) => (
                        <li key={i}>
                          <i className="unicon-star-filled yellow_star" />
                        </li>
                      )
                    )}
                  </ul>
                  <span className="hstack gap-narrow fs-7 opacity-60 reviews">
                    {Number(data?.rating)}{" "}
                    <span className="d-none sm:d-inline-block reviews">
                      ({data?.reviews?.length})
                    </span>
                  </span>
                </div>

                <div className="hstack justify-between items-center gap-2">
                  <div className="product-price hstack gap-1 fs-5 xl:fs-4">
                    <span className="price">
                      {/* {currency?.sign} */}
                      {data?.current_price}
                    </span>
                    <span className="price-old text-line-through opacity-40">
                      {/* {currency?.sign} */}
                      {data?.previous_price}
                    </span>
                  </div>
                </div>

                <p className="product-desc fs-6 xl:fs-5 my-2 pro_details_para1">
                  {data?.description || "No description available."}
                </p>

                {/* Color Selection */}
                {data && data.colors?.length > 0 && (
                  <>
                    <p id="color_word">Color</p>
                    <div className="box-container">
                      {data.colors.map((color) => (
                        <div
                          key={color}
                          className={`box ${
                            selectedColor === color ? "selected" : ""
                          }`}
                          style={{ background: color }}
                          onClick={() => setSelectedColor(color)}
                        ></div>
                      ))}
                    </div>
                  </>
                )}

                {/* Size Selection */}
                {data && data.sizes?.length > 0 && (
                  <>
                    <p id="color_word" className="mt-2">
                      Size
                    </p>
                    <div className="box-container">
                      {data.sizes.map((size) => (
                        <div
                          key={size}
                          className={`box size ${
                            selectedSize === size ? "selected" : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="product-actions hstack gap-1 xl:mt-2">
                  <div className="quantity_box_div">
                    <LuMinus
                      className="quantity_icon"
                      onClick={() => handleDecrease(data?.id)}
                    />
                    <input
                      type="number"
                      className="quantity_input"
                      step={1}
                      min={1}
                      max={99}
                      name="quantity"
                      value={cartProducts[data?.id] || 1}
                      onChange={(e) =>
                        updateCartQuantity(
                          data?.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      title="Qty"
                      autoComplete="off"
                    />
                    <FiPlus
                      className="quantity_icon"
                      onClick={() => handleIncrease(data?.id)}
                    />
                  </div>

                  <button className="addCart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  {isLoggedIn ? (
                    <div>
                      {favorite ? (
                        <FaHeart
                          className="icon_size"
                          onClick={toggleFavorite}
                        />
                      ) : (
                        <FaRegHeart
                          className="icon_size"
                          onClick={toggleFavorite}
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <Link href={"/login"}>
                        <FaRegHeart className="icon_size" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="first_tab mt-3 mb-3">
          <p className="tab_heading">Description</p>
          <p className="details_p">{data?.details}</p>
        </div>

        {/* <Specifications /> */}
        {/* <ReviewSection product_review={data} /> */}
        {isLoggedIn ? (
          <div className="add_review_form mt-2">
            <ReviewForm />
          </div>
        ) : (
          ""
        )}

        <FeaturedProducts category={data?.category} currency={currency} />
        <div className="features_sec mt-3 "></div>
      </div>
    </article>
  );
}
