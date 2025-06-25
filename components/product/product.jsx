"use client";
import "./style.css";
import {
  FaRegHeart,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
  FaAngleDown,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useAllProducts from "../../app/all-products/All_ProductResponse_Api";
import { ResponseContext } from "@/app/login/ResponseContext";
import SkeletonLoader from "./SkeletonLoader";
import Link from "next/link";

export default function AllProduct() {
  // console.log(productsFilter, "page filters??????");
  // const { products } = useContext(ResponseContext);

  // const [showPopup, setShowPopup] = useState(false);
  const { addToCart, products, loading, currency } =
    useContext(ResponseContext);
  const [searchedProducts, setSearchedProducts] = useState([]);
  console.log(searchedProducts, "search productsss...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuerys = searchParams.get("search");
  console.log(searchQuerys, "sssss");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const [productss, setProducts] = useState([]);
  // console.log(productss, "Fetched products... mega menue");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchProducts = async () => {
    let apiUrl = `${baseUrl}api/front/products/category/${category}`;
    if (subcategory) {
      apiUrl += `?subcategory=${subcategory}`;
    }

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // const { products, loading } = useAllProducts(currentPage);
  const { addToWishlist, removeFromWishlist, wishlist, searchQuery } =
    useContext(ResponseContext);

  // console.log(wishlist, "Wishlist items");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      const productId = product.id;
      const isFav = wishlist.some((item) => item.id === productId);
      // console.log(`Product ID ${productId} favorite status: ${isFav}`);
    });
  }, [wishlist, products]);

  const fetchSearchedProducts = async (searchQuerys) => {
    // setSearchedLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}api/front/search?search=${encodeURIComponent(searchQuerys)}`
      );
      const data = await res.json();
      setSearchedProducts(data.data);
    } catch (err) {
      console.error("Search error:", err);
      setSearchedProducts([]);
    } finally {
      // setSearchedLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuerys) {
      fetchSearchedProducts(searchQuerys);
    }
  }, [searchQuerys]);

  const handleNavigation = (id) => {
    router.push(`/shop-product-detail/${id}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, [category, subcategory]);
  useEffect(() => {
    if (category || subcategory) {
      fetchProducts();
      setSearchedProducts([]); // force remove search results
    } else if (searchQuerys) {
      fetchSearchedProducts(searchQuerys);
      setProducts([]); // clear category products
    } else {
      setProducts(products); // context default
      setSearchedProducts([]);
    }
  }, [searchQuerys, category, subcategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuerys, category, subcategory]);

  const displayProducts =
    searchQuerys && !category && !subcategory
      ? searchedProducts
      : category
      ? productss
      : products;

  // const displayProducts = category ? productss : products;
  const filteredProducts = displayProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(displayProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="results_main mb-3">
        <div className="results">
          <div className="img_div">
            {/* <img src="/assets/images/common/showing.png" /> */}
            {/* <img src="/assets/images/common/results.png" /> */}
          </div>
          <p>{`Showing page ${currentPage} of ${totalPages}`}</p>
        </div>
        {/* <div className="results">
          <FaAngleDown />
          <p>Sort by latest</p>
        </div> */}
      </div>

      {loading ? (
        // Skeleton Loader
        <div className="all_product_parent_div">
          {[...Array(6)].map((_, index) => (
            <section key={index} className="AllProduct pro_item mb-3">
              <div
                className="img_div skeleton-box"
                style={{ height: "200px", width: "100%", borderRadius: "10px" }}
              ></div>
              <div
                className="skeleton-line mt-2"
                style={{ width: "80%", height: "20px", borderRadius: "4px" }}
              ></div>
              <div
                className="skeleton-line mt-1"
                style={{ width: "60%", height: "16px", borderRadius: "4px" }}
              ></div>
              <div className="price_div">
                <div
                  className="skeleton-line"
                  style={{ width: "40%", height: "16px", borderRadius: "4px" }}
                ></div>
                <div
                  className="skeleton-line"
                  style={{ width: "30%", height: "16px", borderRadius: "4px" }}
                ></div>
              </div>
              <div className="btn_div mt-2">
                <div
                  className="skeleton-box"
                  style={{
                    height: "30px",
                    width: "100px",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
            </section>
          ))}
        </div>
      ) : displayedProducts?.length === 0 ? (
        <div className="text-center my-5">
          <h3>No products available</h3>
        </div>
      ) : (
        <div className="all_product_parent_div">
          {displayedProducts.map((product, index) => {
            const productId = product.id;
            const isFavorite = wishlist.some((item) => item.id === productId);

            const toggleFavorite = () => {
              if (isFavorite) {
                removeFromWishlist(productId);
              } else {
                addToWishlist(productId);
              }
            };

            return (
              <section
                key={index}
                id="AllProduct"
                className="AllProduct pro_item mb-3"
              >
                <div className="img_div">
                  <img
                    src={
                      product.thumbnail ||
                      "https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg"
                    }
                    onClick={() => handleNavigation(productId)}
                    alt="product"
                  />
                  {isLoggedIn ? (
                    <div>
                      {isFavorite ? (
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
                    <Link href="/login">
                      <FaRegHeart className="icon_size" />
                    </Link>
                  )}
                  <h2 className="mt-1">
                    {product.title.split(" ").slice(0, 10).join(" ")}...
                  </h2>
                  <p className="detail">{product.category_name}</p>
                  <div className="price_div">
                    <p className="price">
                      {/* {currency?.sign} */}
                      {product.current_price}
                    </p>
                    <p className="old_price">
                      {product?.previous_price
                        ? `${product.previous_price}`
                        : ""}
                    </p>
                  </div>
                  <div className="btn_div">
                    <button
                      className="cart mt-1"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      <div className="pagination mt-5 mb-5">
        <FaArrowLeft
          className={`icon_prop ${currentPage === 1 ? "disabled" : ""}`}
          onClick={prevPage}
        />
        <p
          className={currentPage === 1 ? "active" : ""}
          onClick={() => goToPage(1)}
        >
          1
        </p>
        {currentPage > 3 && <p>...</p>}
        {Array.from({ length: 5 }, (_, i) => {
          let page = currentPage - 2 + i;
          if (page > 1 && page < totalPages) {
            return (
              <p
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => goToPage(page)}
              >
                {page}
              </p>
            );
          }
          return null;
        })}
        {currentPage < totalPages - 2 && <p>...</p>}
        {totalPages > 1 && (
          <p
            className={currentPage === totalPages ? "active" : ""}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </p>
        )}
        <FaArrowRight
          className={`icon_prop ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={nextPage}
        />
      </div>
    </>
  );
}
