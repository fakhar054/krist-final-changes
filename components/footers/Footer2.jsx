"use client";
import "./footer.css";
import React, { useContext, useEffect, useState } from "react";
import "../../public/assets/css/theme/main.css";
import Link from "next/link";
import Image from "next/image";
import LanguageSelect from "../common/LanguageSelect";
import { footerLinks, socialLinks } from "@/data/footer";
import imgCard from "../../public/assets/images/credit-card.png";

import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { LiaFacebookSquare } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";

import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { ResponseContext } from "@/app/login/ResponseContext";
import { useRouter } from "next/navigation";

export default function Footer2() {
  const router = useRouter();
  const { setting, response_Context } = useContext(ResponseContext);

  const footer_token = response_Context.token;
  console.log("Response context in footer ", response_Context.token);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubscription = async () => {
    setLoading(true);

    try {
      // Replace with your API endpoint or third-party service
      const response = await fetch(`${baseUrl}api/front/subscriber/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.message) {
        toast.success(data?.message);
      } else {
        if (data?.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            toast.error(error || "This Email Has Already Been Taken."); // Show each error message individually
          });
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
    } catch (error) {
      toast.error("Error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistClick = () => {
    if (footer_token) {
      router.push("/my-wishlist");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <footer id="footer" className="pt-4 pb-4">
        <div className="container">
          <div className="row pb-3 border_bottom">
            <div className="col-lg-3 col-md-6 parent_div">
              <img
                // src={`${process.env.NEXT_PUBLIC_BASE_URL}${setting?.logo || "/assets/images/common/logo_main.png"}`}
                src="/assets/images/common/logo_footer.png"
                id="logo_footer"
              />
              <div className="single_div">
                <div className="icon_div">
                  <MdOutlinePhoneInTalk className="icon_size" />
                </div>
                <div className="text_div">
                  <p>(704) 6663055</p>
                </div>
              </div>

              <div className="single_div">
                <div className="icon_div">
                  <MdOutlineEmail className="icon_size" />
                </div>
                <div className="text_div">
                  <p>{setting?.from_email}</p>
                </div>
              </div>

              <div className="single_div">
                <div className="icon_div">
                  <CiLocationOn className="icon_size" />
                </div>
                <div className="text_div">
                  <p>3056 Ranchview Dr. Richard</p>
                  <p>California 6269</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="small_heading pt-2">Information</h4>
              <ul>
                <li>
                  {isLoggedIn ? (
                    <Link href="/personal-info">My Account</Link>
                  ) : (
                    <Link href="/login">Login</Link>
                  )}
                </li>
                <li onClick={handleWishlistClick}>My Wishlist</li>
                <li>
                  <Link href="/shop-cart">Checkout</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="small_heading pt-2">Service</h4>
              <ul>
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Careers</Link>
                </li>

                <li>
                  <Link href="/">Delivery Information</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">terms & Condition</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="small_heading pt-2">Subscribe</h4>
              <p id="input_text">
                Enter your email below to be the first to know about new
                collections and product launches.
              </p>
              <div className="input_box_div mt-3">
                <MdOutlineAttachEmail className="input_icon_size email_icon" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                ) : (
                  <FaArrowRight
                    className="input_icon_size email_arrow"
                    onClick={handleSubscription}
                  />
                )}
              </div>
            </div>
          </div>
          {/* <hr /> */}

          <div className="bottom_foter pt-3 pb-3 d-flex">
            {/* <img src="/assets/images/common/visa_card.png" />  */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/assets/images/credit-card.png"
                style={{ width: "55px", height: "55px" }}
                alt="card"
              />
              <img
                src="/assets/images/amex.png"
                style={{ width: "55px", height: "45px" }}
                alt="card"
              />
              <img
                src="/assets/images/google-pay.png"
                style={{ width: "55px", height: "55px" }}
                alt="card"
              />
              <img
                src="/assets/images/paypal.png"
                style={{ width: "60px", height: "60px" }}
                alt="card"
              />
            </div>
            <p>{setting?.copyright}</p>
            <div className="icon_div">
              <LiaFacebookSquare className="social_icon_size" />
              <FaInstagram className="social_icon_size" />
              <LuTwitter className="social_icon_size" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
