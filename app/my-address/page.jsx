"use client";
import React, { useState, useEffect, useContext } from "react";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import "./my_address.css";
import { FiPhone } from "react-icons/fi";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { IoClose } from "react-icons/io5";
import { ResponseContext } from "../login/ResponseContext";

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [userId, setUserId] = useState(null);

  const {
    addresses,
    deleteAddress,
    addAddress,
    updateAddress,
    fetchAddresses,
  } = useContext(ResponseContext);

  const [newAddress, setNewAddress] = useState({
    user_id: "",
    name: "",
    phone: "",
    street_address: "",
    country: "",
    city: "",
    zipcode: "",
    isdefault: false,
  });
  //when default address change immidetlay component rerender
  useEffect(() => {}, [addresses]);

  // Set userId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "");
    }
  }, []);

  // Update newAddress user_id when userId is available
  useEffect(() => {
    if (userId) {
      setNewAddress((prev) => ({ ...prev, user_id: userId }));
      fetchAddresses(userId);
    }
  }, [userId]);

  // Change body background based on form visibility
  useEffect(() => {
    document.body.style.backgroundColor = isFormVisible ? "#f4f4f4" : "#ffffff";
    return () => {
      document.body.style.backgroundColor = "#ffffff";
    };
  }, [isFormVisible]);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isEditMode && editAddress?.id) {
  //     await updateAddress(editAddress.id, newAddress);
  //   } else {
  //     await addAddress(newAddress);
  //   }
  //   setIsFormVisible(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && editAddress?.id) {
      await updateAddress(editAddress.id, newAddress);
    } else {
      await addAddress(newAddress);
    }

    if (userId) {
      await fetchAddresses(userId); // force refresh after update
    }

    setIsFormVisible(false);
  };

  const handleEditClick = (address) => {
    setEditAddress(address);
    setNewAddress(address);
    setIsEditMode(true);
    setIsFormVisible(true);
  };

  const handleAddNewClick = () => {
    setNewAddress({
      user_id: userId,
      name: "",
      phone: "",
      street_address: "",
      country: "",
      city: "",
      zipcode: "",
      isdefault: false,
    });
    setIsEditMode(false);
    setIsFormVisible(true);
  };

  return (
    <section className="my_address">
      <div className="heading_div">
        <Header2 />
      </div>

      <div className="container mar_top">
        <div className="row">
          <div className="col-md-4 my_profile">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>

          <div className="col-md-8 second_div mt-5">
            <p id="btn" className="mb-3" onClick={handleAddNewClick}>
              + Add New Address
            </p>

            {addresses && addresses.length > 0 ? (
              addresses.map((addr) => (
                <div className="address_parent_div pb-3 mb-3" key={addr.id}>
                  <div className="name_div">
                    <h3>{addr.name}</h3>
                    {addr?.isdefault === 1 && <h6 id="default">Default</h6>}
                  </div>
                  <div className="address_div">
                    <div className="flex_div">
                      <p>
                        {addr.street_address}, {addr.zipcode}
                      </p>
                      <div className="phone_div">
                        <FiPhone className="icon_size" />
                        <p>{addr.phone}</p>
                      </div>
                      <p>
                        {addr.city}, {addr.country}
                      </p>
                    </div>
                    <div className="btn_div">
                      <button
                        className="edit"
                        onClick={() => handleEditClick(addr)}
                      >
                        <TiEdit className="edit_icon" /> Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteAddress(addr.id)}
                      >
                        <RiDeleteBin5Line /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="alert alert-warning">No Addresses Found!</p>
            )}
          </div>
        </div>

        {isFormVisible && (
          <form className="edit_form active" onSubmit={handleSubmit}>
            <div className="address_div">
              <h3>{isEditMode ? "Update Address" : "Add a New Address"}</h3>
              <IoClose
                className="icon_size"
                onClick={() => setIsFormVisible(false)}
              />
            </div>

            <div className="row">
              <div className="col-lg-6 mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>Address</label>
                <input
                  type="text"
                  name="street_address"
                  value={newAddress.street_address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Address"
                  style={{ height: "60px" }}
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Country"
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="City"
                />
              </div>

              <div className="col-lg-6 mt-3">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipcode"
                  value={newAddress.zipcode}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Zip Code"
                />
              </div>

              <div className="mb-3 form_check mt-3">
                <input
                  type="checkbox"
                  id="check_box"
                  checked={newAddress.isdefault}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      isdefault: e.target.checked,
                    })
                  }
                />
                <label className="form-check-label" htmlFor="check_box">
                  Use as my default address
                </label>
              </div>
            </div>

            <div className="btn_div">
              <button
                id="cancel"
                type="button"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </button>
              <button id="add_new" type="submit">
                {isEditMode ? "Update Address" : "Add New Address"}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer2 />
    </section>
  );
}
