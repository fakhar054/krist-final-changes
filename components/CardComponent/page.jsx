"use client";
import React, { useContext, useState } from "react";
import "./card.css";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { ResponseContext } from "@/app/login/ResponseContext";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";

export default function Page() {
  const router = useRouter();
  const { cart, removeFromCart, currency } = useContext(ResponseContext);
  // console.log(cart, '......cart aa hai na')
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleCheckout = () => {
    router.push("/shop-cart");
  };

  // console.log("Cartttt is isis....", cart);
  // const getTotalAmount = () => {
  //   return (
  //     cart
  //       ?.reduce((total, item) => total + item.current_price * item.quantity, 0)
  //       .toFixed(2) || "0.00"
  //   );
  // };

  const getTotalAmount = () => {
    const total =
      cart?.reduce((sum, item) => {
        let s = item.current_price.replace(/[^\d.,-]+/g, ""); //
        if (s.slice(-3).includes(",")) {
          s = s.replace(/\./g, "").replace(/,/, ".");
        } else {
          s = s.replace(/,/g, "");
        }
        const price = parseFloat(s);
        return sum + (isNaN(price) ? 0 : price * item.quantity);
      }, 0) || 0;

    return total.toFixed(2); // "1234.56"
  };

  return (
    <div>
      {isPopupOpen && (
        <div className={`pop_up show`} style={{ width: "320px" }}>
          <div className="close_div">
            <p id="total_item">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart`
                : ""}
            </p>
            {/* <IoMdClose className="close_icon" onClick={handlePopup} /> */}
          </div>

          {cart?.length > 0 ? (
            <div className="pop_up_item_wrapper">
              {cart.map((item) => (
                <div className="pop_up_parent_div mt-3 pb-2" key={item.id}>
                  <div className="img_div" style={{ width: "35%" }}>
                    <img
                      width={"100%"}
                      src={
                        item?.thumbnail ||
                        "/assets/images/products/checkout_pic.png"
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
                      {/* Price: {currency?.sign} */}
                      Price:{item?.current_price}
                      {/* {Number(item?.current_price || 0).toFixed(2)} */}
                    </p>
                    <div className="delete_div">
                      <div>
                        {item?.size && item?.size.length > 0 && (
                          <p className="sizes">
                            Size:{" "}
                            {Array.isArray(item.size)
                              ? item.size[0]
                              : item.size}
                          </p>
                        )}

                        {item?.color && item?.color.length > 0 && (
                          <p className="sizes">
                            Color:{" "}
                            {Array.isArray(item.color)
                              ? item.color[0]
                              : item.color}
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
          ) : (
            <div
              className="pop_up_parent_div mt-3 pb-2 flex-column w-100"
              style={{ width: "220px" }}
            >
              <CiShoppingCart
                style={{ width: "30%", height: "30%", color: "lightgray" }}
              />
              <p style={{ margin: "20px auto" }}>Your Cart is empty!</p>
            </div>
          )}

          {cart?.length > 0 && (
            <>
              <div className="total_div mt-1 mb-1">
                <p className="sub_total">Subtotal</p>
                <p className="total_amount">
                  {currency?.sign}
                  {getTotalAmount()}
                </p>
              </div>
              <div className="w-100 mt-2">
                {/* <button id="view_cart">View Cart</button> */}
                <Link href="/shop-cart" id="view_cart">
                  <button
                    style={{
                      background: "transparent",
                      width: "100%",
                      borderRadius: "6px",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    View Cart
                  </button>
                </Link>
                <Link href="/shipping-address">
                  <button
                    id="checkout"
                    style={{
                      background: "black",
                      width: "100%",
                      borderRadius: "6px",
                      color: "white",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
