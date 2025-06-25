import React from "react";
import "./notifications.css";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";

export default function page() {
  return (
    <section className="notifications mt-3">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container page_div mb-3">
        <div className="row">
          <div className="col-md-4">
            <MyProfile />
          </div>
          <div className="col-md-8 second_row">
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="img_div">
                  <img
                    src="/assets/images/common/profile_pic.png"
                    alt="master card"
                  />
                </div>
                <div className="content_div">
                  <h6>Profile Update</h6>
                  <p>You just update your profile picture</p>
                </div>
              </div>

              <div className="time">
                <p>Just Now</p>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="img_div">
                  <img
                    src="/assets/images/common/placed.png"
                    alt="master card"
                  />
                </div>
                <div className="content_div">
                  <h6>Your order placed successfully</h6>
                  <p>You’ve placed a new order </p>
                </div>
              </div>

              <div className="time">
                <p>11:05</p>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="img_div">
                  <img
                    src="/assets/images/common/placed.png"
                    alt="master card"
                  />
                </div>
                <div className="content_div">
                  <h6>Order Delivered</h6>
                  <p>Your order has been delivered successfully</p>
                </div>
              </div>

              <div className="time">
                <p>Just Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
