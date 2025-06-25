import React from "react";
import "./saved_cards.css";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";

export default function page() {
  return (
    <section className="saved_cards ">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container mar_top">
        <div className="row">
          <div className="col-md-4 mb-3">
            <MyProfile />
          </div>
          <div className="col-md-8 second_row">
            <p id="btn" className="mb-3">
              + Add New Address
            </p>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="img_div">
                  <img
                    src="/assets/images/common/master_card.png"
                    alt="master card"
                  />
                </div>
                <div className="content_div">
                  <h6>Master Card</h6>
                  <p>1234 5679 0988 7777</p>
                </div>
              </div>

              <div className="delete_div">
                <button className="delte">
                  <RiDeleteBin5Line /> Delete
                </button>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="img_div">
                  <img
                    src="/assets/images/common/visa_card2.png"
                    alt="master card"
                  />
                </div>
                <div className="content_div">
                  <h6>Visa Card</h6>
                  <p>1234 5679 0988 7777</p>
                </div>
              </div>

              <div className="delete_div">
                <button className="delte">
                  <RiDeleteBin5Line /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
