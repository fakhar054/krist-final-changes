"use client";
import React, { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { ResponseContext } from "../login/ResponseContext";
import Header2 from "@/components/headers/Header2";
import toast, { Toaster } from "react-hot-toast";
import "./payment_method.css";
import "../../public/assets/css/theme/main.css";
import SmallForm from "@/components/SmallForm/SmallForm";
import { CiHome } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";
import Footer2 from "@/components/footers/Footer2";

export default function PaymentMethod() {
  const router = useRouter();
  const {
    cart,
    setting,
    discountAmount,
    formDataCheckout,
    setFormDataCheckout,
    response_Context,
  } = useContext(ResponseContext);
  const user_id = response_Context?.user?.id;

  const [loading, setLoading] = useState(false);

  const getTotalAmount = () => {
    return (
      cart
        ?.reduce((total, item) => total + item.current_price * item.quantity, 0)
        .toFixed(2) || "0.00"
    );
  };

  const subtotal = parseFloat(getTotalAmount());
  const deliveryFee = Number(setting?.shipping_cost || 0);
  const grandTotal = subtotal - discountAmount + subtotal * 0.22 + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        full_name,
        email,
        password,
        billing_street,
        billing_city,
        billing_country,
        billing_phone,
        billing_postal_code,
        shipping_street,
        shipping_city,
        shipping_country,
        shipping_phone,
        shipping_postal_code,
        customer_type,
        tax_code,
        company_name,
        vat_number,
        same_as,
      } = formDataCheckout.address;

      const transformedItems = formDataCheckout.items.map((item) => {
        const {
          id,
          title,
          current_price,
          previous_price,
          quantity,
          category,
          category_name,
          color,
          size,
          rating,
          thumbnail,
          created_at,
          updated_at,
        } = item;

        const finalColor = Array.isArray(color) ? color.join(", ") : color;
        const finalSize = Array.isArray(size) ? size.join(", ") : size;
        const finalCategoryName = category_name || category || "";

        return {
          id,
          title,
          current_price,
          previous_price,
          quantity,
          color: finalColor,
          size: finalSize,
          rating,
          thumbnail,
          created_at,
          updated_at,
          category_name: finalCategoryName,
        };
      });

      const totalQuantity = transformedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      console.log("Total Quantity:", totalQuantity);

      const item_o = {
        full_name,
        email,
        password,
        billing_street,
        billing_city,
        billing_country,
        billing_phone,
        billing_postal_code,
        shipping_street,
        shipping_city,
        shipping_country,
        shipping_phone,
        shipping_postal_code,
        customer_type,
        tax_code,
        company_name,
        vat_number,
        same_as,
        items: transformedItems,
        discount: discountAmount,
        grand_total: grandTotal,
        subtotal,
        total_quantity: totalQuantity,
        tax: subtotal * 0.22,
        user_id,
      };

      // console.log(item_o, "chk datatatata ");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}api/front/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          password,
          billing_street,
          billing_city,
          billing_country,
          billing_phone,
          billing_postal_code,
          shipping_street,
          shipping_city,
          shipping_country,
          shipping_phone,
          shipping_postal_code,
          customer_type,
          tax_code,
          company_name,
          vat_number,
          same_as,
          items: transformedItems,
          discount: discountAmount,
          grand_total: grandTotal,
          subtotal,
          total_quantity: totalQuantity,
          tax: subtotal * 0.22,
          user_id,
        }),
      });

      const data = await response.json();
      console.log("datatatadata.data", data.data);

      console.log(data, "checouttt,,t,t,t,t");
      toast.error(data?.error?.message || "error");
      router.push(data.data);
    } catch (err) {
      console.log("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  // const stripePromise = useMemo(() => {
  //   if (!stripekey) return null;
  //   return loadStripe(stripekey);
  // }, [stripekey]);

  const handleBack = () => {
    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));
    router.back();
  };

  return (
    <div>
      <section className="page_address mt-3 mb-3 pb-3">
        <div className="heading_div">
          <Header2 />
        </div>
        <div className="container">
          <div className="my-container">
            <div className="row mb-4">
              <h3>Payment Method</h3>

              <p onClick={handleBack} style={{ cursor: "pointer" }}>
                <span>&lt;</span> Back
              </p>
              <div className="col-lg-8">
                {/* <div className="check_radio_btn_div">
                  <input type="radio" />
                  <p>Debit/Credit Card</p>
                </div> */}
                <div className="icons_parent_div mb-3">
                  <div className="icons_div mt-3 mb-5">
                    <div className="icon active">
                      <CiHome className="icon_size_shiping" />
                    </div>
                    <div className="icon active">
                      <MdOutlineRateReview className="icon_size_shiping" />
                    </div>
                    <div className="icon active">
                      <BsCreditCard2Back className="icon_size_shiping" />
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="mt-3">
                  {/* <h4>Select a Payment Method</h4>
                  <div>
                    <div className="check_radio_btn_div my-3">
                      <input
                        type="checkbox"
                        onChange={(e) => setShowStripeForm(e.target.checked)}
                      />
                      <p>Stripe</p>
                    </div>

                    {showStripeForm && (
                      <Elements stripe={stripePromise}>
                        <StripeForm />
                      </Elements>
                    )}
                  </div>

                  <div className="check_radio_btn_div my-3">
                    <input type="checkbox" />
                    <p>Paypal</p>
                  </div> */}
                  {/* <button className="btn btn-primary" onClick={handleSubmit}>{loading ? "Pay Now.." : "Pay Now"}</button> */}
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      className="btn mt-4"
                      disabled={loading}
                    >
                      {loading ? "Pay Now..." : "Pay Now"}
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-4 mb-5">
                <SmallForm />
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </section>
    </div>
  );
}
