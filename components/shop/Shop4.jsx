"use client";

// import { products } from "@/data/products";
import Link from "next/link";
import Pagination from "../common/Pagination";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import ShopSidebar from "./ShopSidebar";
import { useEffect, useState } from "react";
export default function Shop4() {
  const {
    addProductToCart,
    isAddedToCartProducts,
    catalog = [],
  } = useContextElement();

  const itemsPerPage = 15;
  const [activePage, setActivePage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (catalog?.length) {
      const prices = catalog.map((product) => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
      setFilteredCatalog(catalog);
    }
  }, [catalog]);

  const totalItems = filteredCatalog.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filteredCatalog.slice(startIndex, endIndex);

  const handleFilter = () => {
    const [min, max] = priceRange;
    const filtered = catalog.filter(
      (product) => product.price >= min && product.price <= max
    );
    setFilteredCatalog(filtered);
    setActivePage(1);
  };

  if (!isClient) return null;
  return (
    <div className="section py-4 lg:py-6 xl:py-8">
      <div className="container max-w-xl">
        <div className="row g-4 xl:g-8 md-column-reverse">
          <div className="col col-md-12">
            <div className="panel vstack gap-4 lg:gap-6 xl:gap-8">
              <header className="shop-header panel vstack justify-center gap-2 lg:gap-4 text-center">
                <div className="panel">
                  <h1 className="h3 lg:h1 m-0">Shop listing</h1>
                </div>
                <div className="vstack sm:hstack justify-between items-center gap-2 sm:gap-4">
                  <div className="panel text-center sm:text-start">
                    <span className="fs-6 m-0 opacity-60">
                      Showed {itemsPerPage} products out of {totalItems} total.
                    </span>
                  </div>
                  <div>
                    <div className="hstack gap-1 fs-6">
                      <span>Filter by:</span>
                      <select
                        name="select"
                        id="filter_by"
                        className="form-select form-control-xs fs-6 w-150px dark:bg-gray-900 dark:text-white dark:border-gray-700"
                      >
                        <option value="">Latest</option>
                        <option value="">Relevance</option>
                        <option value="">Most popular</option>
                        <option value="">Trending</option>
                        <option value="">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              </header>
              <div className="shop-lisiting row child-cols-6 lg:child-cols-4 col-match gy-4 lg:gy-8 gx-2 lg:gx-6">
                {visibleItems ? (
                  visibleItems.map((product) => (
                    // console.log(product.energy_image, index, '...........'),
                    <div key={product.sku}>
                      <article className="product type-product panel">
                        <div className="vstack gap-2">
                          <div className="panel">
                            <figure className="featured-image m-0 rounded ratio ratio-3x4 overflow-hidden uc-transition-toggle overflow-hidden">
                              <Image
                                className="media-cover image uc-transition-scale-up uc-transition-opaque"
                                src={
                                  product?.energy_image
                                    ? product?.energy_image
                                    : "/assets/images/common/products/img-01.jpg"
                                }
                                width={1280}
                                height={1707}
                                alt={product?.description}
                              />
                              <Link
                                // href={`/shop-product-detail/${product.id}`}
                                href={
                                  product?.sku
                                    ? `/shop-product-detail/${product.sku}`
                                    : "#"
                                }
                                className="position-cover"
                                data-caption={product?.description}
                              ></Link>
                            </figure>
                            <a
                              href="#add_to_favorite"
                              className="btn btn-md btn-alt-gray-200 hover:bg-primary w-32px h-32px p-0 rounded-circle shadow-xs position-absolute top-0 end-0 m-1 md:m-2"
                            >
                              <i className="icon icon-narrow unicon-favorite-filled" />
                            </a>
                            {/* {product.discount && (
                            <span className="position-absolute top-0 start-0 m-1 md:m-2 ft-tertiary h-24px px-1 bg-yellow-400 text-dark">
                              {product.discount}
                            </span>
                          )} */}
                          </div>
                          <div className="content vstack items-center gap-1 fs-6 text-center xl:mt-1">
                            <h5 className="h6 md:h5 m-0">
                              <Link
                                className="text-none fs-7"
                                // href={`/shop-product-detail/${product.id}`}
                                href={
                                  product?.sku
                                    ? `/shop-product-detail/${product.sku}`
                                    : "#"
                                }
                              >
                                {product?.description}
                              </Link>
                            </h5>
                            {/* <ul
                            className="nav-x gap-0 text-gray-100 dark:text-gray-700"
                            title={`Average ${product?.rating} out of 5`}
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <li key={index}>
                                <i
                                  className={`icon fs-6 unicon-star-filled ${
                                    index < product?.rating ? "text-yellow" : ""
                                  }`}
                                />
                              </li>
                            ))}
                          </ul> */}
                            <div className="hstack justify-center gap-narrow fs-7">
                              {/* {product.oldPrice && (
                              <span className="price-old text-line-through opacity-40">
                                ${product.oldPrice?.toFixed(2)}
                              </span>
                            )} */}
                              <span className="price">
                                ${product.price?.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span className="price">
                                {product?.availability?.quantity}
                                {product?.availability?.quantity > 0 ? (
                                  <span
                                    className="ms-1"
                                    style={{
                                      display: "inline-block",
                                      padding: ".35em .65em",
                                      fontSize: ".75em",
                                      fontWeight: "700",
                                      lineHeight: "1",
                                      color: "#fff",
                                      textAlign: "center",
                                      whiteSpace: "nowrap",
                                      verticalAlign: "baseline",
                                      borderRadius: ".25rem",
                                      backgroundColor: "#198754",
                                    }}
                                  >
                                    in stock
                                  </span>
                                ) : (
                                  <span
                                    className="ms-1"
                                    style={{
                                      display: "inline-block",
                                      padding: ".35em .65em",
                                      fontSize: ".75em",
                                      fontWeight: "700",
                                      lineHeight: "1",
                                      color: "#fff",
                                      textAlign: "center",
                                      whiteSpace: "nowrap",
                                      verticalAlign: "baseline",
                                      borderRadius: ".25rem",
                                      backgroundColor: "#dc3545",
                                    }}
                                  >
                                    out of stock
                                  </span>
                                )}
                              </span>
                            </div>
                            <a
                              className="btn btn-text text-none text-primary border-bottom fs-7 lg:fs-6 mt-1 pb-narrow"
                              onClick={() => addProductToCart(product?.sku)}
                            >
                              {isAddedToCartProducts(product?.sku)
                                ? "Already Added"
                                : "Add To Cart"}
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))
                ) : (
                  <h1>No products found</h1>
                )}
              </div>
              <div className="nav-pagination pt-3 border-top border-gray-100 dark:border-gray-800">
                <ul
                  className="nav-x uc-pagination hstack gap-1 justify-center ft-secondary"
                  data-uc-margin=""
                >
                  <Pagination
                    totalPages={totalPages}
                    activePage={activePage}
                    setActivePage={setActivePage}
                  />
                </ul>
              </div>
            </div>
          </div>
          <div className="sticky-element col-auto col-md-12 w-md-100">
            <ShopSidebar
              handleFilter={handleFilter}
              setPriceRange={setPriceRange}
              priceRange={priceRange}
              maxPrice={maxPrice}
              minPrice={minPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
