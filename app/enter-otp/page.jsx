"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import "./enter-otp.css";
import "../../public/assets/css/theme/main.css";
import { IoIosArrowBack } from "react-icons/io";
import { ResponseContext } from "../login/ResponseContext";
import { AiOutlineClose } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const { response_Context } = useContext(ResponseContext);
  console.log(response_Context, "Response API...");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [confirmForm, showConfirmForm] = useState(false);
  const [resetFormData, setResetFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const user_Email =
    response_Context?.data?.user?.email || "No email available";
  // const userId = response_Context?.data?.user?.id || "No ID available";
  // const userId = localStorage.getItem("userId") || "No ID available";
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "No ID available");
    }
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus on first input
  }, []);

  const handleOtpChange = (index, value) => {
    if (!/^[a-zA-Z0-9]$/.test(value)) return; // Only allow single numeric characters

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move back
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpCode = otpValues.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      setLoading(false);
      return;
    }

    const requestData = {
      email: user_Email,
      reset_token: otpCode,
    };
    console.log(requestData, "otp enter after this is pass..ll;;;;;;;;;");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}api/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log(result, "otp data respone......");
      if (result.status === true) {
        toast.success("OTP Verified!");
        showConfirmForm(true);
      } else {
        toast.error(result.message || "Invalid OTP!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to verify OTP!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackBtn = () => {
    router.push("/forget-password");
  };

  const handleResetFormData = (e) => {
    setResetFormData({ ...resetFormData, [e.target.name]: e.target.value });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (resetFormData.newPassword !== resetFormData.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const requestData = {
      user_id: userId,
      new_password: resetFormData.newPassword,
      confirm_password: resetFormData.confirmNewPassword,
    };

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}api/user/forgot/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (result.status === true) {
        toast.success("Password updated successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="otp" id="otp">
        <div className="container">
          <div className="row login-container height_width">
            <div className="col-lg-7">
              <img src="/assets/images/forms/otp_pic.png" alt="OTP" />
            </div>

            <div className="col-lg-5 j-center">
              <div className="icon_div" onClick={handleBackBtn}>
                <IoIosArrowBack />
                <p>Back</p>
              </div>
              <h2>Enter OTP</h2>
              <p className="text-muted">
                We’ve sent a code to your registered email: <br />
                {user_Email}
              </p>

              <form className="mt-2" onSubmit={handleOtpSubmit}>
                <div className="input_parent_div">
                  {otpValues.map((val, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      className="square-input"
                      maxLength="1"
                      value={val}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
            </div>
          </div>

          {confirmForm && (
            <div className="row mt-5 mb-5">
              <div className="confirm_form">
                <form
                  className="mt-3 form-confirm"
                  onSubmit={handleResetSubmit}
                >
                  <AiOutlineClose
                    className="form_close_icon"
                    onClick={() => showConfirmForm(false)}
                  />

                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      Enter New Password
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      className="confirm_input"
                      placeholder="Enter New Password"
                      value={resetFormData.newPassword}
                      onChange={handleResetFormData}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      name="confirmNewPassword"
                      type="password"
                      className="confirm_input"
                      placeholder="Confirm Password"
                      value={resetFormData.confirmNewPassword}
                      onChange={handleResetFormData}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      "Confirm Password"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
