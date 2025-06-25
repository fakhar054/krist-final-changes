"use client";
import React, { useEffect, useState } from "react";
import "./login.css";
import "../../public/assets/css/theme/main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import useAuth from "./useAuth";
import { toast, Toaster } from "react-hot-toast";
import useAuth from "./useAuth";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(formData.email, formData.password);

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
      <section className="login" id="login">
        <div className="container set_bg ">
          <div className="row login-container height_width">
            <img
              className="logoImg"
              alt="Lexend"
              src="/assets/images/common/logo_krist.png"
            />
            <div className="col-lg-7">
              <img src="/assets/images/forms/login_girl_pic.png" />
            </div>
            <div className="col-lg-5 p-5">
              <h2>Welcome</h2>
              <p className="text-muted">Please login here</p>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control large border_radius"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control large border_radius"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="rember_div">
                    <div className="check_box_div">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                    <Link
                      href={`/forget-password`}
                      className="text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Login...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="signup_div mt-2">
                  <p>Don't have Account?</p>
                  <Link href={`/sign-up`}>sign up here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
