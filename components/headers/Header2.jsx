"use client";
import { useContext, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Nav from "./component/Nav";
import Image from "next/image";
import { openMobileMenu } from "@/utlis/toggleMobileMenu";
import { openContactModal } from "@/utlis/toggleContactModal";
import LanguageSelect2 from "../common/LanguageSelect2";
import "./style_header.css";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import CardComponent from "../CardComponent/page";
import { toast, Toaster } from "react-hot-toast";
import { FaHeart, FaSearch } from "react-icons/fa";
import { ResponseContext } from "@/app/login/ResponseContext";
import { FaPerson } from "react-icons/fa6";
import "./navbar.css";
import { useRouter } from "next/navigation";

export default function Header2() {
  const [showSearch, setShowSearch] = useState(false);
  const dropdownReference = useRef(null);

  const timeoutRef = useRef(null);
  const router = useRouter();

  const goToCart = () => {
    router.push("/shop-cart");
  };

  const handleMouseLeaveAccount = () => {
    timeoutRef.current = setTimeout(() => {
      // setOpen(false);
    }, 1000);
  };
  const {
    cart,
    showPopup,
    setShowPopup,
    animateWishlist,
    setAnimateWishlist,
    setting,
  } = useContext(ResponseContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      sessionStorage.clear();
      localStorage.clear();
      setIsLoggedIn(false);
      toast.success("User Logout Successfully!");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    setPrevScrollPos(window.pageYOffset);
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setScrollingUp(currentScrollPos <= 80 ? false : isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const {
    wishlist,
    setSearchQuery,
    searchQuery,
    searchedProducts,
    searchedLoading,
  } = useContext(ResponseContext);
  // console.log("The list of searchedProducts is ::", searchedProducts);
  // console.log("The searchedPorudct is  ::", searchedLoading);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (animateWishlist) {
      const timer = setTimeout(() => setAnimateWishlist(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animateWishlist]);

  //useEffect for close the dropdown when user click outside the search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchQuery(""); // Clear the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchQuery]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header
        style={{ "--uc-nav-height": "80px !important" }}
        className={`uc-header header-default uc-navbar-sticky-wrap z-999 uc-sticky ${scrollingUp ? " uc-sticky-below uc-sticky-fixed headerFixed" : ""
          }`}
        data-uc-sticky="start: 100vh; show-on-up: true; animation: uc-animation-slide-top; sel-target: .uc-navbar-container; cls-active: uc-navbar-sticky; cls-inactive: uc-navbar-transparent; end: !*;"
      >
        <nav
          className={`bg-white uc-navbar-container uc-navbar-float ft-tertiary z-1 ${scrollingUp ? "uc-navbar-sticky" : "uc-navbar-transparent"
            } `}
          data-anime="translateY: [-40, 0]; opacity: [0, 1]; easing: easeOutExpo; duration: 750; delay: 0;"
          style={{ transform: "translateY(0px)", opacity: 1 }}
        >
          <div className="container max-w-xl">
            <div
              className="nav_main_width uc-navbar min-h-64px lg:min-h-80px text-gray-900 dark:text-white"
              data-uc-navbar="mode: click; animation: uc-animation-slide-top-small; duration: 150;"
            >
              <div className="uc-navbar-left increase_width_left">
                <div className="uc-logo text-dark dark:text-white">
                  <Link
                    className="panel text-none"
                    href={`/`}
                  // style={{ width: 140 }}
                  >
                    <Image
                      className="dark:d-none"
                      alt="Lexend"
                      src={"/assets/images/common/logo_main.png"}
                      width="117"
                      height="40"
                    />
                  </Link>
                </div>
              </div>
              <div className="main_input_div">
                <input
                  type="text"
                  placeholder="Search..."
                  className=""
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery && (
                  <ul className="dropdown" ref={dropdownRef}>
                    {searchedLoading ? (
                      <li className="loading">Loading...</li>
                    ) : searchedProducts.length > 0 ? (
                      searchedProducts.map((product, index) => (
                        <li
                          key={index}
                          className="dropdown-item"
                          // onClick={() => {
                          //   setSearchQuery("");
                          //   router.push(`/shop-product-detail/${product.id}`);
                          // }}
                          onClick={() => {
                            localStorage.setItem("search_keyword", product.title);
                            setSearchQuery(""); // input clear
                            dropdownRef.current?.blur()
                            router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
                          }}
                        >
                          {product.title}
                        </li>
                      ))
                    ) : (
                      <li className="no-results">No matches found</li>
                    )}
                  </ul>
                )}

                <FaSearch className="search_icon_div" />
              </div>
              <div className="icon_div_main">
                <div className="icons">
                  <div
                    className="account-wrapper"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    ref={dropdownRef}
                  >
                    {isLoggedIn ? (
                      <p className="account-label">My Account</p>
                    ) : (
                      <Link className="text-none fw-medium" href={`/login`}>
                        <p className="account-label">Login</p>
                      </Link>
                    )}

                    {isLoggedIn && open && (
                      <div className="account-dropdown">
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/personal-info">Personal Information</Link>
                        <Link href="/orders">Orders</Link>
                        <Link href="/my-wishlist">Wishlist</Link>
                        <Link href="/my-address">Addresses</Link>
                        <Link href="/settings">Settings</Link>
                        <Link href="/login" onClick={handleAuth}>
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>

                  {isLoggedIn ? (
                    <Link href="/my-wishlist">
                      <div className="relative heart-container">
                        {animateWishlist ? (
                          <FaHeart
                            className="icon_size cursor-pointer transition-transform duration-300 scale-150 text-red-600"
                            style={{ width: "30px", height: "30px" }}
                          />
                        ) : (
                          <CiHeart
                            className="icon_size cursor-pointer transition-transform duration-300"
                            style={{ width: "30px", height: "30px" }}
                          />
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <CiHeart
                        className="icon_size cursor-pointer"
                        style={{
                          position: "relative",
                          width: "40px",
                          height: "40px",
                        }}
                      />
                    </Link>
                  )}
                  <div
                    className={`img_div first_img_div`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="icon_size"
                      src="/assets/images/add-button.png"
                      alt=""
                    />
                    <span className="cart_counter">
                      {cart ? cart?.length : "0"}
                    </span>
                    <div
                      className={`pop_up_compoent ${showPopup ? "show_popup" : ""
                        }`}
                    >
                      <CardComponent />
                    </div>
                  </div>

                  <div className={`img_div second_img_div`} onClick={goToCart}>
                    <img
                      className="icon_size"
                      src="/assets/images/add-button.png"
                      alt=""
                    />
                    <span className="cart_counter">
                      {cart ? cart?.length : "0"}
                    </span>
                  </div>
                </div>
              </div>

              <a
                className="d-block lg:d-none uc-icon uc-navbar-toggle-icon"
                onClick={openMobileMenu}
              >
                <svg width={20} height={20} viewBox="0 0 20 20">
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        '.uc-navbar-toggle-icon svg>[class*="line-"]{transition:0.2s ease-in-out;transition-property:transform, opacity;transform-origin:center;opacity:1}.uc-navbar-toggle-icon svg>.line-3{opacity:0}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-3{opacity:1}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-2{transform:rotate(45deg)}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-3{transform:rotate(-45deg)}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-1,.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-4{opacity:0}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-1{transform:translateY(6px) scaleX(0)}.uc-navbar-toggle-animate[aria-expanded="true"] svg>.line-4{transform:translateY(-6px) scaleX(0)}',
                    }}
                  />
                  <rect className="line-1" y={3} width={20} height={2} />
                  <rect className="line-2" y={9} width={20} height={2} />
                  <rect className="line-3" y={9} width={20} height={2} />
                  <rect className="line-4" y={15} width={20} height={2} />
                </svg>
              </a>
              {/* </div> */}
            </div>
          </div>
          <ul className="uc-navbar-nav gap-3 xl:gap-4 d-none lg:d-flex fw-medium ">
            <Nav />
          </ul>
        </nav>
      </header>
    </>
  );
}
