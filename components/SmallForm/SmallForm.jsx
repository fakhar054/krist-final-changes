"use client";
import React, { useContext, useState } from "react";
import "./small_form.css";
import { ResponseContext } from "@/app/login/ResponseContext";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function SmallForm() {
  const {
    cart,
    removeFromCart,
    setting,
    discountAmount,
    applyCoupon,
    couponCode,
    couponError,
    currency,
  } = useContext(ResponseContext);

  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const handleToggleDiscountInput = () => {
    setShowDiscountInput((prevState) => !prevState);
  };

  // console.log("Cartt is is from small...", cart);

  // const getTotalAmount = () => {
  //   return cart?.reduce(
  //     (total, item) => total + item.current_price * item.quantity,
  //     0
  //   );
  // };

  const getTotalAmount = () => {
    return (
      cart?.reduce((total, item) => {
        let priceStr = item.current_price.replace(/[^\d.,-]+/g, "");

        if (priceStr.slice(-3).includes(",")) {
          priceStr = priceStr.replace(/\./g, "").replace(",", ".");
        } else {
          priceStr = priceStr.replace(/,/g, "");
        }

        const price = parseFloat(priceStr);
        return total + (isNaN(price) ? 0 : price * item.quantity);
      }, 0) || 0
    ).toFixed(2);
  };

  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = getTotalAmount();
  const deliveryFee = Number(setting?.shipping_cost || 0);
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    applyCoupon(inputCode, subtotal);
    setLoading(false);
  };

  return (
    <section className="small_form">
      <div>
        {cart.map((item) => (
          <div
            className="pop_up_parent_div d-flex p-2"
            key={item.id}
            style={{ justifyContent: "space-between" }}
          >
            <div className="img_div" style={{ width: "35%" }}>
              <img
                width={"100%"}
                src={
                  item?.thumbnail || "/assets/images/products/checkout_pic.png"
                }
                alt="Product"
              />
            </div>
            <div className="content_div" style={{ width: "65%" }}>
              <p className="prod_title">{item?.title}</p>
              <p className="prod_title p-0 m-0">
                Quantity: {item?.quantity || "N/A"}
              </p>
              <p className="prod_title p-0 m-0">
                Price:{item.current_price}
                {/* {Number(item?.current_price)} */}
              </p>
              <div className="delete_div">
                <div>
                  {item?.size && item?.size.length > 0 && (
                    <p className="sizes">
                      Size:{" "}
                      {Array.isArray(item.size) ? item.size[0] : item.size}
                    </p>
                  )}

                  {item?.color && item?.color.length > 0 && (
                    <p className="sizes">
                      Color:{" "}
                      {Array.isArray(item.color) ? item.color[0] : item.color}
                    </p>
                  )}
                </div>
                <RiDeleteBin5Fill
                  className="icon_prop"
                  onClick={() =>
                    removeFromCart(item?.id, item?.color, item?.size)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Only one form should wrap the coupon input and summary */}
      <form className="border p-4 shadow-sm rounded" onSubmit={handleSubmit}>
        <div className="mb-3 d-flex space_between">
          <label htmlFor="subtotal" className="form-label mb-0 fw-bold">
            Subtotal
          </label>
          <div className="d-flex gap-1">
            {discountAmount > 0 && (
              <span style={{ textDecoration: "line-through" }}>
                {currency?.sign}
                {discountAmount.toFixed(2)}
              </span>
            )}
            <span id="subtotal">
              {" "}
              {currency?.sign}
              {subtotal}
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex space_between">
          <label htmlFor="subtotal" className="form-label mb-0 fw-bold">
            VAT 22%
          </label>
          <span id="subtotal">
            {currency?.sign}
            {(subtotal * 0.22).toFixed(2)}
          </span>
        </div>

        <div className="mb-3 d-flex space_between pb-3">
          <label
            htmlFor="deliveryCharges"
            className="form-label mb-0 fw-bold"
            id="delivery"
          >
            Delivery Charges
          </label>
          <span id="delivery">
            {currency?.sign}
            {deliveryFee.toFixed(2)}
          </span>
        </div>

        {/* {discountAmount > 0 && (
          <div className="sub_total border_bottom d-flex justify-content-between">
            <span className="text-success fw-bold">
              Discount ({couponCode})
            </span>
            <span className="text-success">-{currency?.sign}{discountAmount.toFixed(2)}</span>
          </div>
        )} */}

        <p
          style={{
            textAlign: "left",
            color: "#000",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          className="my-1"
          onClick={handleToggleDiscountInput}
        >
          have a coupon code?
        </p>

        {showDiscountInput && (
          <>
            {/* <label htmlFor="discount" id="discount">
              Enter Discount Code
            </label> */}
            <div className="input-group input_div mb-3">
              <input
                type="text"
                id="discountCode"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter Discount Code"
                className="form-control"
                aria-label="Discount Code"
              />
              <button type="submit" className="btn btn-dark">
                {loading ? "....." : "Apply"}
              </button>
            </div>
            {couponError && (
              <small className="text-danger mt-1 d-block">{couponError}</small>
            )}
          </>
        )}

        <div className="d-flex space_between">
          <label htmlFor="grandTotal" className="form-label mb-0 fw-bold">
            Grand Total
          </label>
          <span id="grandTotal" className="fw-bold">
            {currency?.sign}
            {(Number(subtotal * 0.22) + Number(grandTotal)).toFixed(2)}
          </span>
        </div>
      </form>
    </section>
  );
}
