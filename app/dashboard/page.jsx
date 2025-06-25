"use client";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import React, { useEffect, useState } from "react";
import MyProfile from "../../components/MyProfile/profile";
import "./dashboard.css";
import { FaFileAlt } from "react-icons/fa";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart, CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function Page() {
  const router = useRouter();

  const handlePersonalNavigation = () => {
    router.push("/personal-info");
  };
  const handleWishlist = () => {
    router.push("/my-wishlist");
  };
  const handleAddress = () => {
    router.push("/my-address");
  };

  const handleSetting = () => {
    router.push("/settings");
  };

  const handleOrders = () => {
    router.push("/orders");
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("You don't have a token");
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  const handleAuth = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    toast.success("User Logout Successfully!");
    router.push("/login");
  };

  return (
    <section className="persoal_info">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container mar_top mb-5">
        <div className="row">
          <div className="col-lg-4 mb-3 my_profile">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>
          <div className="col-lg-8 mt-5">
            <p>Hello </p>
            <p>
              From your account dashboard you can view your order, manage your
              billing and shipping addresses, and edit your password and account
              details.
            </p>
            <div className="first_flex_div mt-5">
              <div className="row">
                <div className="col-lg-4" onClick={handleOrders}>
                  <div className="card card_dash">
                    <FaFileAlt style={{ color: "#767676", fontSize: "32px" }} />
                    <p>Orders</p>
                  </div>
                </div>
                <div className="col-lg-4" onClick={handlePersonalNavigation}>
                  <div className="card card_dash">
                    <IoPersonOutline
                      style={{ color: "#767676", fontSize: "32px" }}
                    />
                    <p>Personal Information</p>
                  </div>
                </div>
                <div className="col-lg-4" onClick={handleWishlist}>
                  <div className="card card_dash">
                    <CiHeart style={{ color: "#767676", fontSize: "32px" }} />
                    <p>Wishlist</p>
                  </div>
                </div>
                <div className="col-lg-4" onClick={handleAddress}>
                  <div className="card card_dash">
                    <IoLocationOutline
                      style={{ color: "#767676", fontSize: "32px" }}
                    />
                    <p>Addresses</p>
                  </div>
                </div>
                <div className="col-lg-4" onClick={handleSetting}>
                  <div className="card card_dash">
                    <CiSettings
                      style={{ color: "#767676", fontSize: "32px" }}
                    />
                    <p>Settings</p>
                  </div>
                </div>
                <div className="col-lg-4" onClick={handleAuth}>
                  <div className="card card_dash">
                    <IoIosLogOut
                      style={{ color: "#767676", fontSize: "32px" }}
                    />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
