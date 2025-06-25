"use client";
import React, { useState } from "react";
import "./setting.css";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";

export default function Page() {
  const [checkedState, setCheckedState] = useState({});

  const handleToggle = (id) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="settings">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container my_page">
        <div className="row">
          <div className="col-md-4">
            <MyProfile />
          </div>
          <div className="col-md-8 second_row mt-5">
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="content_div">
                  <h6>Appearance</h6>
                  <p>Customize how your theme looks on your device</p>
                </div>
              </div>
              <div className="time">
                <button>Light</button>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="content_div">
                  <h6>Language</h6>
                  <p>Select your language</p>
                </div>
              </div>
              <div className="time">
                <button>English</button>
              </div>
            </div>

            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="content_div">
                  <h6>Two-Factor Authentication</h6>
                  <p>Keep your account secure by adding 2FA via mail</p>
                </div>
              </div>
              <div className="time">
                <label
                  className="toggle"
                  style={{ background: checkedState[1] ? "#4caf50" : "#ccc" }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedState[1]}
                    onChange={() => handleToggle(1)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="content_div">
                  <h6>Push Notification</h6>
                  <p>Receive push notification</p>
                </div>
              </div>
              <div className="time">
                <label
                  className="toggle"
                  style={{ background: checkedState[6] ? "#4caf50" : "#ccc" }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedState[6]}
                    onChange={() => handleToggle(6)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="parent_flex_div pb-2 mb-2">
              <div className="left_main_div mt-3">
                <div className="content_div">
                  <h6>Desktop Notification</h6>
                  <p>Receive desktop notification</p>
                </div>
              </div>
              <div className="time">
                <label
                  className="toggle"
                  style={{ background: checkedState[7] ? "#4caf50" : "#ccc" }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedState[7]}
                    onChange={() => handleToggle(7)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
