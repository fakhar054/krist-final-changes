"use client";
import { useRouter, usePathname } from "next/navigation";

import React, { useContext } from "react";
import "./profile.css";
import { FaRegUser } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { ResponseContext } from "@/app/login/ResponseContext";

export default function profile() {
  const router = useRouter();
  const pathname = usePathname();

  const handleDashboardNavigation = () => {
    router.push("/dashboard");
  };
  const handlePersonalNavigation = () => {
    router.push("/personal-info");
  };
  const handleWishlist = () => {
    router.push("/my-wishlist");
  };
  const handleAddress = () => {
    router.push("/my-address");
  };

  const handleCards = () => {
    router.push("/saved-cards");
  };
  const handleSetting = () => {
    router.push("/settings");
  };

  const handleNotifications = () => {
    router.push("/notifications");
  };
  const handleOrders = () => {
    router.push("/orders");
  };

  const { response_Context } = useContext(ResponseContext);

  return (
    <>
      {/* <h1 className="profile_heading">My Profile</h1> */}

      <section className="myProfile_parent_div mt-5">
        <h4>My Account</h4>

        <div className="user_info">
          <div
            className={`user flex_props ${
              pathname === "/dashboard" ? "bottom_border" : ""
            }`}
          >
            {/* <FaRegUser /> */}
            <p onClick={handleDashboardNavigation}>Dashboard</p>
          </div>
          <div
            className={`user flex_props ${
              pathname === "/personal-info" ? "bottom_border" : ""
            }`}
          >
            {/* <FaRegUser /> */}
            <p onClick={handlePersonalNavigation}>Personal Information</p>
          </div>
          <div
            className={`user flex_props ${
              pathname === "/orders" ? "bottom_border" : ""
            }`}
          >
            {/* <FaBorderAll /> */}
            <p onClick={handleOrders}>My Orders</p>
          </div>
          <div
            className={`user flex_props ${
              pathname === "/my-wishlist" ? "bottom_border" : ""
            }`}
          >
            {/* <CiHeart /> */}
            <p onClick={handleWishlist}>My Wishlist</p>
          </div>
          <div
            className={`user flex_props ${
              pathname === "/my-address" ? "bottom_border" : ""
            }`}
          >
            {/* <IoLocationOutline /> */}
            <p onClick={handleAddress}>Manage Addresses</p>
          </div>
          {/* <div
            className={`user flex_props ${
              pathname === "/saved-cards" ? "bottom_border" : ""
            }`}
          >
            <IoCardSharp />
            <p onClick={handleCards}>Saved Cards</p>
          </div> */}
          {/* <div
            className={`user flex_props ${
              pathname === "/notifications" ? "bottom_border" : ""
            }`}
          >
            <IoIosNotificationsOutline />
            <p onClick={handleNotifications}>Notifications</p>
          </div> */}
          <div
            className={`user flex_props ${
              pathname === "/settings" ? "bottom_border" : ""
            }`}
          >
            {/* <CiSettings /> */}
            <p onClick={handleSetting}>Settings</p>
          </div>
        </div>
      </section>
    </>
  );
}
