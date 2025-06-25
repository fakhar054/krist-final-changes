"use client";
import React, { useState } from "react";
import "../../public/assets/css/theme/main.css";
import "./sign-up.css";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "../login/useAuth";

export default function Page() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { registration, loading, error } = useAuth();

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }

    registration(formData.first_name, formData.last_name, formData.email, formData.password);

    // try {
    //   const response = await fetch(
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   let data = await response.json();
    //   console.log("data response register ka data", data);

    //   if (!response.ok) {
    //     throw new Error(data.message || "Something went wrong!");
    //   }

    //   if (data.status === true) {
    //     localStorage.setItem("token", data.data.token);
    //     toast.success("User Register Successful!");
    //     router.push("/login");
    //   } else {
    //     throw new Error(data?.error?.email || "Registration failed.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error(error?.email || "An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="sign-up" id="sign-up">
        <div className="container">
          <div className="row login-container height_width">
            <img
              className="logoImg"
              alt="Lexend"
              src="/assets/images/common/logo_krist.png"
            />
            <div className="col-lg-7">
              <img src="/assets/images/forms/sign_up_pic.png" alt="Sign Up" />
            </div>

            <div className="col-lg-5 j-center">
              <h2>Create New Account</h2>
              <p className="text-muted">Please enter details</p>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="mb-1">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control large border_radius"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control large border_radius"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control large border_radius"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control large border_radius"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="rember_div">
                    <div className="check_box_div">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={agreeTerms}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the<strong> Terms & Conditions</strong>
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-2">
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
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
