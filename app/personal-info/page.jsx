"use client";
import React, { useState, useContext, useEffect } from "react";
import "./personal-info.css";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import { FaRegEdit } from "react-icons/fa";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import { ResponseContext } from "../login/ResponseContext";
import useAuth from "../login/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const { response_Context, setResponse_Context } = useContext(ResponseContext);
  const [userId, setUserId] = useState(null);
  const [previewphoto, setPreviewphoto] = useState(
    "/assets/images/common/default_image.jpg"
  );
  const [loadingUserData, setLoadingUserData] = useState(true);
  const router = useRouter();
  const { updateProfile, loading } = useAuth();

  // Extract safe user data from context
  const user = response_Context?.user || {};
  const { email = "", full_name = "", address = "", propic = "" } = user;

  // console.log("full name is ::::", full_name);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "No ID available");
    }
  }, []);

  useEffect(() => {
    if (response_Context?.user) {
      setLoadingUserData(false);
    }
  }, [response_Context]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    photo: "",
    user_id: null,
  });

  console.log("Full response context", response_Context);

  useEffect(() => {
    const email = response_Context?.user?.email;
    const address = response_Context?.user?.address;
    const fullName = response_Context?.user?.full_name;

    setFormData((prev) => {
      let first_name = prev.first_name;
      let last_name = prev.last_name;

      if (fullName) {
        const [first, ...rest] = fullName.split(" ");
        first_name = first;
        last_name = rest.join(" ");
      }

      return {
        ...prev,
        email: email || prev.email,
        address: address || prev.address,
        first_name,
        last_name,
      };
    });
  }, [
    response_Context?.user?.email,
    response_Context?.user?.address,
    response_Context?.user?.full_name,
  ]);

  useEffect(() => {
    if (!loadingUserData && full_name) {
      const [firstName, ...rest] = full_name.split(" ");
      const lastName = rest.join(" ");
      setFormData({
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        photo: propic,
        user_id: userId,
      });
      setPreviewphoto(propic || "/assets/images/common/persona_img.png");
    }
  }, [loadingUserData, email, address, propic, userId]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlephotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewphoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name || "");
    formDataToSend.append("last_name", formData.last_name || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("address", formData.address || "");
    formDataToSend.append("user_id", userId);

    if (formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const updatedUser = await updateProfile(formDataToSend);

    if (updatedUser) {
      setResponse_Context((prev) => ({
        ...prev,
        user: { ...prev.user, ...updatedUser },
      }));
    }
  };

  if (loadingUserData) {
    return <p>Loading user data...</p>;
  }

  return (
    <section className="persoal_info">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container mar_top">
        <div className="row">
          <div className="col-lg-4 mb-3 my_profile">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>
          <div className="col-lg-8 mt-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="first_flex_div mt-5">
                  <div className="img_div">
                    <img src={previewphoto} alt="Profile Preview" />
                    <label className="edit_icon">
                      <FaRegEdit />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlephotoChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>

                <form
                  className="mt-3 perosnal_info_form"
                  onSubmit={handleSubmit}
                >
                  <div className="row margin_bottom">
                    <div className="col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row margin_bottom">
                    <div className="col-md-6">
                      <label htmlFor="emailAddress">Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button className="submit_btn mb-3" type="submit">
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Update Profile...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
