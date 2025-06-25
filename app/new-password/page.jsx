"use client";
import { useState } from "react";
import React from "react";
import "./new-password.css";
import "../../public/assets/css/theme/main.css";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function NewPassword() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleDiv = () => {
    setIsVisible(!isVisible); // Toggle the visibility
  };

  const handleClick = () => {
    router.push("/");
  };
  return (
    <section className="new_pass" id="new_pass">
      <div className={`container ${isVisible ? "blur-effect" : ""}`}>
        <div className="row login-container height_width">
          <div className="col-lg-7">
            <img
              src="/assets/images/forms/forget_pass_pic.png"
              className="hide"
            />
          </div>

          <div className="col-lg-5 j-center">
            <div className="icon_div">
              <IoIosArrowBack />
              <p>Back</p>
            </div>
            <h2>Enter New Password</h2>
            <p className="text-muted">
              Create a strong password for your account. Make sure it’s at least
              8 characters long and includes a mix of letters, numbers, and
              symbols.
            </p>
            <form className="mt-2">
              <div className="mb-1">
                <label htmlFor="password1" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control large border_radius"
                  minLength="8"
                  id="email"
                  required
                />
              </div>

              <div className="mb-1">
                <label htmlFor="password2" className="form-label">
                  Confrim New Password
                </label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control large border_radius"
                  minLength="8"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={toggleDiv}
                className="btn btn-dark w-100 mt-2"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className={`pop_up ${isVisible ? "visible" : ""}`}>
          <img src="/assets/images/forms/tic_pic.png" className="tic" alt="" />
          <h3 className="mt-3">Password Changed Successfully</h3>
          <p>Your Password has been updated successfully</p>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-dark  mt-2"
          >
            Back to login
          </button>
        </div>
      )}
    </section>
  );
}
