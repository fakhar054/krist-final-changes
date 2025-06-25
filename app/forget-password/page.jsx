"use client";
import React, { useState } from "react";
import "./forget-password.css";
import "../../public/assets/css/theme/main.css";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}api/user/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === true) {
        // Save reset_token and user_id for verification later
        localStorage.setItem("reset_token", data.reset_token);
        localStorage.setItem("user_id", data.user_id);

        toast.success("OTP sent to your email!");
        router.push("/enter-otp");
      } else {
        // Handle errors properly
        const errorMsg = data.error.length
          ? data.error[0]
          : "Failed to send OTP. Try again.";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackBtn = () => {
    router.push("/login");
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="forget_pass" id="forget_pass">
        <div className="container">
          <div className="row login-container height_width">
            <div className="col-lg-7">
              <img src="/assets/images/forms/forget_pass_pic.png" />
            </div>

            <div className="col-lg-5 j-center">
              <div className="icon_div" onClick={handleBackBtn}>
                <IoIosArrowBack />
                <p>Back</p>
              </div>
              <h2>Forgot Password</h2>
              <p className="text-muted">
                Enter your registered email address. We’ll send you a code to
                reset your password.
              </p>
              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control large border_radius"
                    id="email"
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-2">
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Send OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
