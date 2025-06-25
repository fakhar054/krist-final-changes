// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, useContext } from "react";
// import "../../public/assets/css/theme/main.css";
// import SmallForm from "@/components/SmallForm/SmallForm";
// import { MdOutlineRateReview } from "react-icons/md";
// import { MdPayment } from "react-icons/md";
// import { IoIosHome } from "react-icons/io";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinFill } from "react-icons/ri";
// import { IoMdClose } from "react-icons/io";

// import { CiHome } from "react-icons/ci";
// import { BsCreditCard2Back } from "react-icons/bs";

// import "./review.css";
// import Header2 from "@/components/headers/Header2";
// import Footer2 from "@/components/footers/Footer2";
// import { ResponseContext } from "../login/ResponseContext";

// export default function ReviewOrder() {
//   const {
//     cart,
//     formDataCheckout,
//     setFormDataCheckout,
//     currency,
//     setting,
//     discountAmount,
//     response_Context,
//   } = useContext(ResponseContext);

//   console.log("cart isssss from review order..", cart);
//   const router = useRouter();

//   const user_id = response_Context?.user?.id;

//   const [loading, setLoading] = useState(false);

//   // const getTotalAmount = () => {
//   //   return (
//   //     cart
//   //       ?.reduce((total, item) => total + item.current_price * item.quantity, 0)
//   //       .toFixed(2) || "0.00"
//   //   );
//   // };

//   const getTotalAmount = () => {
//     const total =
//       cart?.reduce((sum, item) => {
//         const priceStr = item.current_price
//           .replace("€", "")
//           .replace(".", "")
//           .replace(",", ".");
//         const price = parseFloat(priceStr);
//         return sum + price * item.quantity;
//       }, 0) || 0;

//     return new Intl.NumberFormat("it-IT", {
//       style: "currency",
//       currency: "EUR",
//     }).format(total);
//   };

//   const subtotal = parseFloat(getTotalAmount());
//   const deliveryFee = Number(setting?.shipping_cost || 0);
//   const grandTotal = subtotal - discountAmount + subtotal * 0.22 + deliveryFee;

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   // Synchronize formDataCheckout.items with the current cart
//   //   setFormDataCheckout((prev) => ({
//   //     ...prev,
//   //     items: cart,
//   //   }));

//   //   try {
//   //     const {
//   //       full_name,
//   //       email,
//   //       password,
//   //       billing_street,
//   //       billing_city,
//   //       billing_country,
//   //       billing_phone,
//   //       billing_postal_code,
//   //       shipping_street,
//   //       shipping_city,
//   //       shipping_country,
//   //       shipping_phone,
//   //       shipping_postal_code,
//   //       customer_type,
//   //       tax_code,
//   //       company_name,
//   //       vat_number,
//   //       same_as,
//   //     } = formDataCheckout.address;

//   //     // Use the updated formDataCheckout.items
//   //     const transformedItems = cart.map((item) => {
//   //       const {
//   //         id,
//   //         title,
//   //         current_price,
//   //         previous_price,
//   //         quantity,
//   //         category,
//   //         category_name,
//   //         color,
//   //         size,
//   //         rating,
//   //         thumbnail,
//   //         created_at,
//   //         updated_at,
//   //       } = item;

//   //       const finalColor = Array.isArray(color) ? color.join(", ") : color;
//   //       const finalSize = Array.isArray(size) ? size.join(", ") : size;
//   //       const finalCategoryName = category_name || category || "";

//   //       return {
//   //         id,
//   //         title,
//   //         current_price,
//   //         previous_price,
//   //         quantity: Number(quantity), // Ensure quantity is a number
//   //         color: finalColor,
//   //         size: finalSize,
//   //         rating,
//   //         thumbnail,
//   //         created_at,
//   //         updated_at,
//   //         category_name: finalCategoryName,
//   //       };
//   //     });

//   //     const totalQuantity = transformedItems.reduce(
//   //       (sum, item) => sum + item.quantity,
//   //       0
//   //     );
//   //     // console.log("Total Quantity:", totalQuantity);

//   //     const item_o = {
//   //       full_name,
//   //       email,
//   //       password,
//   //       billing_street,
//   //       billing_city,
//   //       billing_country,
//   //       billing_phone,
//   //       billing_postal_code,
//   //       shipping_street,
//   //       shipping_city,
//   //       shipping_country,
//   //       shipping_phone,
//   //       shipping_postal_code,
//   //       customer_type,
//   //       tax_code,
//   //       company_name,
//   //       vat_number,
//   //       same_as,
//   //       items: transformedItems,
//   //       discount: discountAmount,
//   //       grand_total: grandTotal,
//   //       subtotal,
//   //       total_quantity: totalQuantity,
//   //       tax: subtotal * 0.22,
//   //       user_id,
//   //     };

//   //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//   //     const response = await fetch(`${baseUrl}api/front/checkout`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(item_o),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok && data?.data) {
//   //       console.log("After the data fetched");
//   //       console.log(data, "checouttt,,t,t,t,t");
//   //       router.push(data.data);
//   //     } else {
//   //       console.log("Error while the data fetched");
//   //       toast.error(data?.error?.message || "error");
//   //     }
//   //   } catch (err) {
//   //     console.log("Something went wrong during checkout.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Sync cart to formDataCheckout.items
//     setFormDataCheckout((prev) => ({
//       ...prev,
//       items: cart,
//     }));

//     try {
//       const {
//         full_name,
//         email,
//         password,
//         billing_street,
//         billing_city,
//         billing_country,
//         billing_phone,
//         billing_postal_code,
//         shipping_street,
//         shipping_city,
//         shipping_country,
//         shipping_phone,
//         shipping_postal_code,
//         customer_type,
//         tax_code,
//         company_name,
//         vat_number,
//         same_as,
//       } = formDataCheckout.address;

//       // Transform cart items with price conversion
//       const transformedItems = cart.map((item) => {
//         const {
//           id,
//           title,
//           current_price,
//           previous_price,
//           quantity,
//           category,
//           category_name,
//           color,
//           size,
//           rating,
//           thumbnail,
//           created_at,
//           updated_at,
//         } = item;

//         // Convert prices from Italian format to number
//         const convertPrice = (priceStr) =>
//           parseFloat(
//             priceStr.replace("€", "").replace(/\./g, "").replace(",", ".")
//           );

//         const finalColor = Array.isArray(color) ? color.join(", ") : color;
//         const finalSize = Array.isArray(size) ? size.join(", ") : size;
//         const finalCategoryName = category_name || category || "";

//         return {
//           id,
//           title,
//           current_price: convertPrice(current_price),
//           previous_price: convertPrice(previous_price),
//           quantity: Number(quantity),
//           color: finalColor,
//           size: finalSize,
//           rating,
//           thumbnail,
//           created_at,
//           updated_at,
//           category_name: finalCategoryName,
//         };
//       });

//       const totalQuantity = transformedItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );

//       const item_o = {
//         full_name,
//         email,
//         password,
//         billing_street,
//         billing_city,
//         billing_country,
//         billing_phone,
//         billing_postal_code,
//         shipping_street,
//         shipping_city,
//         shipping_country,
//         shipping_phone,
//         shipping_postal_code,
//         customer_type,
//         tax_code,
//         company_name,
//         vat_number,
//         same_as,
//         items: transformedItems,
//         discount: discountAmount,
//         grand_total: grandTotal,
//         subtotal,
//         total_quantity: totalQuantity,
//         tax: subtotal * 0.22,
//         user_id,
//       };

//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//       const response = await fetch(`${baseUrl}api/front/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(item_o),
//       });

//       const data = await response.json();

//       if (response.ok && data?.data) {
//         console.log("After the data fetched");
//         console.log(data, "checouttt,,t,t,t,t");
//         router.push(data.data);
//       } else {
//         console.log("Error while the data fetched");
//         toast.error(data?.error?.message || "error");
//       }
//     } catch (err) {
//       console.log("Something went wrong during checkout.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNavigation = () => {
//     setFormDataCheckout((prev) => ({
//       ...prev,
//       items: cart,
//     }));
//     router.push("/payment-method");
//   };

//   const handleBack = () => {
//     setFormDataCheckout((prev) => ({
//       ...prev,
//       items: cart,
//     }));
//     router.back();
//   };

//   console.log("form data checkout after Question", formDataCheckout?.address);

//   return (
//     <div>
//       <section className="page_address mb-3 ">
//         <div className="heading_div">
//           <Header2 />
//         </div>
//         <div className="container mar_top">
//           <div className="row mt-3">
//             <h1>Review Your Order</h1>
//             <p onClick={handleBack} style={{ cursor: "pointer" }}>
//               <span>&lt;</span> Back
//             </p>
//             <div className="col-lg-8">
//               <div className="icons_parent_div mb-3">
//                 <div className="icons_div mt-3 mb-5">
//                   <div className="icon active">
//                     <CiHome className="icon_size_shiping " />
//                   </div>
//                   <div className="icon active">
//                     {/* <MdOutlineRateReview className="icon_size_shiping" /> */}
//                     <BsCreditCard2Back className="icon_size_shiping " />
//                   </div>
//                 </div>
//                 <hr />
//               </div>

//               {cart.map((item) => (
//                 <div className="pop_up_parent_div d-flex p-2" key={item.id}>
//                   <div className="img_div">
//                     <img
//                       height={90}
//                       width={90}
//                       src={
//                         item?.thumbnail ||
//                         "/assets/images/products/checkout_pic.png"
//                       }
//                       alt="Product"
//                     />
//                   </div>
//                   <div className="content_div" style={{ width: "65%" }}>
//                     <p className="prod_title">{item?.title}</p>
//                     <p className="prod_title p-0 m-0">
//                       Quantity: {item?.quantity || "N/A"}
//                     </p>
//                     <p className="prod_title p-0 m-0">
//                       Price:{item?.current_price}
//                       {/* {Number(item?.current_price).toFixed(2)} */}
//                     </p>
//                     <div className="delete_div">
//                       <div>
//                         {item?.size && item?.size.length > 0 && (
//                           <p className="sizes">
//                             Size:{" "}
//                             {Array.isArray(item.size)
//                               ? item.size[0]
//                               : item.size}
//                           </p>
//                         )}

//                         {item?.color && item?.color.length > 0 && (
//                           <p className="sizes">
//                             Color:{" "}
//                             {Array.isArray(item.color)
//                               ? item.color[0]
//                               : item.color}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div className="address_section mt-5">
//                 <h4>Shipping Address</h4>
//                 <div className="name_parent_div pb-2 mb-3">
//                   <div className="name_edit ">
//                     <h5>{formDataCheckout?.address?.full_name}</h5>
//                     {/* <FaRegEdit /> */}
//                   </div>
//                   <p id="home_add">
//                     {formDataCheckout?.address?.shipping_street}
//                   </p>
//                   <p id="home_add">
//                     Postal Code:
//                     {formDataCheckout?.address?.shipping_postal_code}
//                   </p>
//                   <p id="home_add">
//                     Phone Num:{formDataCheckout?.address?.shipping_phone}
//                   </p>
//                   <p id="home_add">
//                     {formDataCheckout?.address?.shipping_city},
//                     {formDataCheckout?.address?.shipping_country}
//                   </p>
//                 </div>
//                 {/* <div className="name_parent_div pb-2">
//                   <div className="name_edit ">
//                     <h5>Payment Method</h5>
//                     <FaRegEdit />
//                   </div>
//                   <p id="home_add">Debit Card (************)</p>
//                 </div> */}
//               </div>
//               {/* <button
//                 type="button"
//                 onClick={handleNavigation}
//                 className="btn w-100 mt-3 mb-3"
//               >
//                 Pay Now
//               </button> */}

//               <form onSubmit={handleSubmit} className="pb-2">
//                 <button type="submit" className="btn mt-4 " disabled={loading}>
//                   {loading ? "Pay Now..." : "Pay Now"}
//                 </button>
//               </form>
//             </div>
//             <div className="col-lg-4">
//               <SmallForm />
//             </div>
//           </div>
//         </div>
//         <Footer2 />
//       </section>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import "../../public/assets/css/theme/main.css";
import SmallForm from "@/components/SmallForm/SmallForm";
import { BsCreditCard2Back } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import "./review.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { ResponseContext } from "../login/ResponseContext";

export default function ReviewOrder() {
  const {
    cart,
    formDataCheckout,
    setFormDataCheckout,
    currency,
    setting,
    discountAmount,
    response_Context,
  } = useContext(ResponseContext);

  const router = useRouter();
  const user_id = response_Context?.user?.id;
  const [loading, setLoading] = useState(false);

  // ✅ Restore formDataCheckout from localStorage on first render
  useEffect(() => {
    const savedData = localStorage.getItem("formDataCheckout");
    if (savedData) {
      setFormDataCheckout(JSON.parse(savedData));
    }
  }, []);

  // ✅ Save formDataCheckout to localStorage when it changes
  useEffect(() => {
    if (formDataCheckout?.address) {
      localStorage.setItem(
        "formDataCheckout",
        JSON.stringify(formDataCheckout)
      );
    }
  }, [formDataCheckout]);

  const getTotalAmount = () => {
    const total =
      cart?.reduce((sum, item) => {
        const priceStr = item.current_price
          .replace("€", "")
          .replace(".", "")
          .replace(",", ".");
        const price = parseFloat(priceStr);
        return sum + price * item.quantity;
      }, 0) || 0;

    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(total);
  };

  const subtotal = parseFloat(getTotalAmount());
  const deliveryFee = Number(setting?.shipping_cost || 0);
  const grandTotal = subtotal - discountAmount + subtotal * 0.22 + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));

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

      const transformedItems = cart.map((item) => {
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

        const convertPrice = (priceStr) =>
          parseFloat(
            priceStr.replace("€", "").replace(/\./g, "").replace(",", ".")
          );

        return {
          id,
          title,
          current_price: convertPrice(current_price),
          previous_price: convertPrice(previous_price),
          quantity: Number(quantity),
          color: Array.isArray(color) ? color.join(", ") : color,
          size: Array.isArray(size) ? size.join(", ") : size,
          rating,
          thumbnail,
          created_at,
          updated_at,
          category_name: category_name || category || "",
        };
      });

      const totalQuantity = transformedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

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

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}api/front/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_o),
      });

      const data = await response.json();

      if (response.ok && data?.data) {
        router.push(data.data);
      } else {
        console.log("Checkout error:", data?.error?.message || "Unknown error");
      }
    } catch (err) {
      console.log("Checkout failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));
    router.back();
  };

  return (
    <div>
      <section className="page_address mb-3">
        <div className="heading_div">
          <Header2 />
        </div>
        <div className="container mar_top">
          <div className="row mt-3">
            <h1>Review Your Order</h1>
            <p onClick={handleBack} style={{ cursor: "pointer" }}>
              <span>&lt;</span> Back
            </p>
            <div className="col-lg-8">
              <div className="icons_parent_div mb-3">
                <div className="icons_div mt-3 mb-5">
                  <div className="icon active">
                    <CiHome className="icon_size_shiping" />
                  </div>
                  <div className="icon active">
                    <BsCreditCard2Back className="icon_size_shiping" />
                  </div>
                </div>
                <hr />
              </div>

              {cart.map((item) => (
                <div className="pop_up_parent_div d-flex p-2" key={item.id}>
                  <div className="img_div">
                    <img
                      height={90}
                      width={90}
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
                      Price: {item?.current_price}
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
                    </div>
                  </div>
                </div>
              ))}

              <div className="address_section mt-5">
                <h4>Shipping Address</h4>
                <div className="name_parent_div pb-2 mb-3">
                  <div className="name_edit ">
                    <h5>{formDataCheckout?.address?.full_name}</h5>
                  </div>
                  <p id="home_add">
                    {formDataCheckout?.address?.shipping_street}
                  </p>
                  <p id="home_add">
                    Postal Code:{" "}
                    {formDataCheckout?.address?.shipping_postal_code}
                  </p>
                  <p id="home_add">
                    Phone Num: {formDataCheckout?.address?.shipping_phone}
                  </p>
                  <p id="home_add">
                    {formDataCheckout?.address?.shipping_city},{" "}
                    {formDataCheckout?.address?.shipping_country}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="pb-2">
                <button type="submit" className="btn mt-4" disabled={loading}>
                  {loading ? "Pay Now..." : "Pay Now"}
                </button>
              </form>
            </div>
            <div className="col-lg-4">
              <SmallForm />
            </div>
          </div>
        </div>
        <Footer2 />
      </section>
    </div>
  );
}
