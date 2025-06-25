"use client";
import { useContextElement } from "@/context/Context";
import { icons, menuItems } from "@/data/menu";
import { closeMobileMenu } from "@/utlis/toggleMobileMenu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { toast, Toaster } from "react-hot-toast"
import useCategories from "../categories";

export default function MobileMenu() {
  const { isChecked, handleToggle } = useContextElement();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("menu");
  const [activeParent1, setActiveParent1] = useState(-1);
  const [activeParent2, setActiveParent2] = useState(-1);
  const elementRef = useRef(null);
  const containerRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success('User Logout Successfully!')
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && // Check if click is inside #mobileMenu
        containerRef.current.contains(event.target) &&
        elementRef.current && // Check if click is outside .gt-menu-area
        !elementRef.current.contains(event.target)
      ) {
        closeMobileMenu();
        // Add your custom logic here
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const isMenuActive = (menu) => {
    let isActive = false;
    if (menu.href) {
      if (pathname.split("/")[1] == menu.href?.split("/")[1]) {
        isActive = true;
      }
    }
    if (menu.subItems) {
      menu.subItems.forEach((el) => {
        if (el.href) {
          if (pathname.split("/")[1] == el.href?.split("/")[1]) {
            isActive = true;
          }
        }
        if (el.subItems) {
          el.subItems.map((elm) => {
            if (elm.href) {
              if (pathname.split("/")[1] == elm.href?.split("/")[1]) {
                isActive = true;
              }
            }
          });
        }
      });
    }
    return isActive;
  };

  const { latestCategories } = useCategories();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await latestCategories();
      if (data.status && Array.isArray(data.data)) {
        setCategories(data.data); // ✅ Store categories in state
      } else {
        throw new Error("Invalid API response structure");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      ref={containerRef}
      id="uc-menu-panel"
      data-uc-offcanvas="overlay: true;"
      className="uc-offcanvas mobile-menu"
      style={{ display: "block" }}
      tabIndex={-1}
    >
      <div
        ref={elementRef}
        className="uc-offcanvas-bar bg-white text-dark dark:bg-gray-900 dark:text-white uc-offcanvas-bar-animation uc-offcanvas-slide"
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: 876 }}
      >
        <header className="uc-offcanvas-header hstack justify-between items-center pb-2 bg-white dark:bg-gray-900">
          <div className="uc-logo">
            <Link
              href={`/`}
              className="h5 text-none text-gray-900 dark:text-white"
            >
              <Image
                className="w-72px"
                alt="Lexend"
                src="/assets/images/common/logo_main.png"
                width="34"
                height="34"
              />
            </Link>
          </div>
          <button
            className="uc-offcanvas-close rtl:end-auto rtl:start-0 m-1 mt-2 icon-3 btn border-0 dark:text-white dark:text-opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all"
            type="button"
            onClick={closeMobileMenu}
          >
            <i className="unicon-close" />
          </button>
        </header>
        <div className="panel">
          {/* Tab Buttons */}
          <div className="tab-buttons">
            <button
              className={activeTab === "menu" ? "active text-white bg-dark" : ""}
              style={{ width: "50%", border: "none", padding: "15px 0px" }}
              onClick={() => setActiveTab("menu")}
            >
              Menu
            </button>
            <button
              className={activeTab === "categories" ? "active text-white bg-dark" : ""}
              style={{ width: "50%", border: "none", padding: "15px 0px" }}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </button>
          </div>

          {/* Display Menu OR Categories based on activeTab */}
          {activeTab === "menu" ? (
            <ul className="nav-y gap-narrow fw-medium fs-6 uc-nav mt-3">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${item.subItems ? "uc-parent" : ""} ${activeParent1 === index ? "active" : ""}`}
                >
                  {item.href ? (
                    <Link className="menuActive text-dark" href={item.href}>
                      {item.label}
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              ))}
              <li onClick={handleAuth}>
                <Link href={`/login`} >{isLoggedIn ? "Logout" : "Login"}</Link>
              </li>
            </ul>
          ) : (
            <ul className="categories-list mt-3 p-0">
              {categories.map((category, index) => (
                <li key={index} style={{ listStyle: "none", marginBottom: "15px" }}>
                  <Link className="text-dark" style={{ textDecoration: "none" }} href={`/all-products?category=${encodeURIComponent(category.name)}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
