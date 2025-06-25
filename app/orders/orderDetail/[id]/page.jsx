"use client";
import React, { useEffect, useState } from "react";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import MyProfile from "../../../../components/MyProfile/profile";
import "./orderDetail.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Page() {
  const { id } = useParams();

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Order details::", orderDetails);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}api/user/order/${id}/details`);
        const data = await response.json();
        if (response.ok) {
          setOrderDetails(data.data);
        } else {
          setError("Failed to fetch order details");
        }
      } catch (error) {
        setError("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <section className="my_Orders">
        <div className="heading_div">
          <Header2 />
        </div>
        <div className="container product_image">
          <div className="row mt-5 position_relative">
            <div className="col-lg-4 my_profile mb-2">
              <div className="position_fixed">
                <Skeleton circle width={80} height={80} />
              </div>
            </div>
            <div className="col-lg-8 margin_top mb-4">
              <div className="mt-5 mb-5">
                <Skeleton height={30} width="40%" />
                <Skeleton height={20} width="20%" className="my-3" />
                <Skeleton height={20} count={5} />
                <Skeleton height={200} className="my-3" />
                <Skeleton height={40} />
              </div>
            </div>
          </div>
        </div>
        <Footer2 />
      </section>
    );
  }

  return (
    <section className="my_Orders">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container product_image">
        <div className="row mt-5 position_relative">
          <div className="col-lg-4 my_profile mb-2">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>
          <div className="col-lg-8 margin_top mb-4">
            <div className="mt-5 mb-5">
              <h1>Purchased Items</h1>
              <h3>
                Order# {orderDetails?.number} [{orderDetails?.status}]
              </h3>
              <div
                className="d-flex justify-content-between align-items-start w-100"
                style={{ justifyContent: "space-between" }}
              >
                <p>Order Date: {formatDate(orderDetails?.created_at)}</p>
                <Link href={`/orders/${orderDetails?.id}`}>
                  <button className="btn btn-dark">Print Order</button>
                </Link>
              </div>
              <div>
                <h6>Shipping Address</h6>
                <p>
                  Name: {orderDetails?.shipping_name} <br />
                  Email: {orderDetails?.shipping_email} <br />
                  Phone: {orderDetails?.shipping_phone} <br />
                  Address: {orderDetails?.shipping_address} <br />
                  {orderDetails?.shipping_city}, {orderDetails?.shipping_zip}{" "}
                  {orderDetails?.shipping_country}
                </p>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div className="me-3">
                  <h6>Billing Address</h6>
                  <p>
                    Name: {orderDetails?.shipping_name} <br />
                    Email: {orderDetails?.shipping_email} <br />
                    Phone: {orderDetails?.shipping_phone} <br />
                    Address: {orderDetails?.shipping_address} <br />
                    {orderDetails?.shipping_city}{" "}
                    {orderDetails?.shipping_country}
                  </p>
                </div>
                <div>
                  <h6>Payment Information</h6>
                  <p>Payment Status: {orderDetails?.payment_status}</p>
                  <p>Tax: {orderDetails?.tax}</p>
                  <p>Paid Amount: {orderDetails?.total}</p>
                  {/* <p>Payment Method: {orderDetails?.payment_method}</p>
                  <p>Transaction ID: {orderDetails?.transaction_id}</p> */}
                </div>
              </div>
              <div className="overflow-x-auto mt-2">
                <h6>Ordered Products</h6>
                <table className="w-full border border-gray-300 text-sm sm:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">ID#</th>
                      <th className="p-2 text-left">Image</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Detail</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.ordered_products &&
                      Object.entries(orderDetails.ordered_products).map(
                        ([key, product]) => {
                          const { item } = product;
                          const productInfo = item?.item || {};
                          const quantity = item?.qty || 1;

                          return (
                            <tr key={key} className="border-t">
                              <td className="p-2">{productInfo?.id}</td>
                              <td className="p-2">
                                <img
                                  src={productInfo?.photo}
                                  width={50}
                                  height={50}
                                  alt={productInfo?.name}
                                />
                              </td>
                              <td className="p-2">{productInfo?.name}</td>
                              <td className="p-2">Quantity: {quantity}</td>
                              <td className="p-2">{productInfo?.price}</td>
                              <td className="p-2">
                                {(
                                  parseFloat(productInfo?.price || 0) * quantity
                                ).toFixed(2)}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
