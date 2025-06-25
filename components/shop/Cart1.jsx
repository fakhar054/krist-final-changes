"use client";
import Image from "next/image";
import Link from "next/link";
import "./Cart1.css";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ResponseContext } from "@/app/login/ResponseContext";

export default function Cart1() {
  const router = useRouter();
  const { cart, removeFromCart, updateCart, setting, currency } =
    useContext(ResponseContext);
  // console.log(cart, "cart data done???")
  const [loading, setLoading] = useState(false);
  const dummyImage = "/assets/images/dummy-image.png";

  // const price = cart.current_price;
  function parseLocalizedPrice(priceString) {
    if (typeof priceString !== "string") {
      console.warn("Invalid price string:", priceString);
      return 0;
    }

    const clean = priceString.replace(/[^\d,.-]/g, "");
    const normalized = clean.replace(/\./g, "").replace(",", ".");
    const parsed = parseFloat(normalized);

    return isNaN(parsed) ? 0 : parsed;
  }

  const rawPrice = cart.current_price;
  const price = parseLocalizedPrice(rawPrice);

  console.log(cart, "chekout response and pass api...");

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

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    updateCart(id, newQuantity); // Ensure this function updates the cart state
  };

  const totalPrice = 0;

  const handleNavigate = () => {
    router.push("/shipping-address");
  };

  // const [inputCode, setInputCode] = useState("");
  // console.log(inputCode, "code input.,.,.,")
  const subtotal = getTotalAmount() || 0;
  const deliveryFee = setting?.shipping_cost || 0;
  const grandtotalPrice = subtotal;
  // console.log(typeof(grandtotalPrice));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   applyCoupon(inputCode, subtotal);
  //   setLoading(false)
  // };

  return (
    <div className="section ">
      <div className="container">
        <div className="panel vstack gap-3 lg:gap-3 xl:gap-4">
          <header className="shop-header panel vstack  gap-2 lg:gap-4 ">
            <div className="panel">
              <h1 className="mt-3 check">Checkout</h1>
            </div>
          </header>
          <div className="panel cart-details row mb-5">
            <div className="col-lg-8">
              <div
                className="card px-3"
                style={{ boxShadow: "1px 0px 5px lightgray" }}
              >
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="panel max-h-sm overflow-auto "
                >
                  {cart.length > 0 ? (
                    <table className="table table-container mb-3" id="table">
                      <thead className="sticky-top ft-tertiary  dark:bg-gray-800 z-1">
                        <tr>
                          <th className="first-col">Products</th>
                          <th className="other-cols">Price</th>
                          <th className="other-cols">Quantity</th>
                          <th className="other-cols">Subtotal</th>
                          <th className="last-col ">Del</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart?.map((elm, i) => (
                          <tr key={i}>
                            {/* <td>
                            <a
                              onClick={() => removeItem(elm.id)}
                              className="remove text-none"
                            >
                              <i className="icon icon-1 unicon-close" />
                            </a>
                          </td> */}
                            <td>
                              <div
                                className="image panel  d-flex items-center gap-[30px]"
                                style={{ gap: "10px" }}
                              >
                                <Image
                                  className=""
                                  alt="Laptop Cover"
                                  src={
                                    elm?.thumbnail ? elm?.thumbnail : dummyImage
                                  }
                                  width="96"
                                  height="98"
                                />

                                <Link
                                  href={`/shop-product-detail/${elm.id}`}
                                  className="position-cover"
                                  data-caption="Laptop Cover"
                                ></Link>
                                <div className="title_size ">
                                  <h5 className="title h6 m-0">
                                    <Link
                                      href={`/shop-product-detail/${elm.id}`}
                                      className="text-none"
                                    >
                                      {elm?.title}
                                      {/* {elm.name} */}
                                    </Link>
                                  </h5>
                                  {elm?.size && elm?.size.length > 0 && (
                                    <p className="sizes">
                                      Size:{" "}
                                      {Array.isArray(elm.size)
                                        ? elm.size[0]
                                        : elm.size}
                                    </p>
                                  )}

                                  {elm?.color && elm?.color.length > 0 && (
                                    <p className="sizes">
                                      Color:{" "}
                                      {Array.isArray(elm.color)
                                        ? elm.color[0]
                                        : elm.color}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="price">
                                {/* {currency?.sign} */}
                                {elm?.current_price}
                              </span>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-xs w-64px lg:w-80px dark:bg-gray-100 dark:bg-opacity-5 dark:text-white dark:border-gray-800"
                                step={1}
                                min={1}
                                max={99}
                                name="quantity"
                                value={elm?.quantity}
                                onChange={(e) =>
                                  updateCartQuantity(
                                    elm?.id,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                                title="Qty"
                                autoComplete="off"
                              />
                            </td>
                            <td>
                              <span className="subtotal">
                                {currency?.sign}
                                { subtotal }
                                {/* {elm?.quantity *} */}
                                {/* {elm?.quantity * price} */}
                              </span>
                            </td>
                            <td>
                              <RiDeleteBin4Fill
                                onClick={() =>
                                  removeFromCart(elm?.id, elm?.color, elm?.size)
                                }
                                className="delete_icon_table"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="alert alert-warning m-3" hidden="">
                      Your cart empty!
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div
                className="card px-3"
                style={{ boxShadow: "1px 0px 5px lightgray" }}
              >
                <table className="table table-borderless pb-3">
                  <tbody className="mb-3">
                    <tr className="sub_total border_bottom">
                      <th className="ft-tertiary text-black font_family">
                        <span className="font_family">Subtotal</span>
                      </th>
                      <td className="text_align_right">
                        {currency?.sign}
                        {subtotal}
                      </td>
                    </tr>

                    <tr className="sub_total border_bottom">
                      <th className="ft-tertiary text-black font_family">
                        <span className="font_family">VAT 22%</span>
                      </th>
                      <td className="text_align_right">
                        {currency?.sign}
                        {(subtotal * 0.22).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="sub_total border_bottom">
                      <th className="ft-tertiary text-black font_family">
                        <span className="font_family">Delivery Charges</span>
                      </th>
                      <td className="text_align_right">
                        {currency?.sign}
                        {deliveryFee}
                      </td>
                    </tr>
                    <tr className="sub_total border_bottom">
                      <th className="ft-tertiary text-black font_family">
                        <span className="font_family">Grand Total</span>
                      </th>
                      <td className="text_align_right">
                        {currency?.sign}
                        {(
                          Number(deliveryFee) +
                          subtotal * 0.22 +
                          Number(grandtotalPrice)
                        ).toFixed(2)}
                      </td>
                    </tr>

                    <tr className="tr_row ft-tertiary">
                      <td colSpan="2" className="checkout_td text-center">
                        <button
                          className="w-100 check_out_btn"
                          onClick={handleNavigate}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Proceed to checkout...
                            </>
                          ) : (
                            "Proceed to checkout"
                          )}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lg:order-0">
          <div className="panel vstack gap-1 lg:gap-2">
            <h5 className="h5 sm:h4 mx-0">You may interested in:</h5>
            <div className="row child-cols-6 gy-4 gx-2">
              {products.slice(0, 2).map((elm, i) => (
                <div key={i}>
                  <article className="product type-product panel">
                    <div className="vstack gap-2">
                      <div className="panel">
                        <figure className="featured-image m-0 rounded ratio ratio-1x1 uc-transition-toggle overflow-hidden">
                          <Image
                            className="media-cover image uc-transition-scale-up uc-transition-opaque"
                            alt="White Classic Watch"
                            src={elm.image}
                            width="1280"
                            height="1707"
                          />
                          <Link
                            href={`/shop-product-detail/${elm.id}`}
                            className="position-cover"
                            data-caption="White Classic Watch"
                          ></Link>
                        </figure>
                        {elm.discount && (
                          <span className="position-absolute top-0 start-0 m-1 fs-7 ft-tertiary lh-sm h-16px px-narrow bg-yellow-400 text-dark">
                            {elm.discount}
                          </span>
                        )}
                      </div>
                      <div className="content vstack items-center gap-1 fs-6 text-center xl:mt-1">
                        <h5 className="h6 m-0">
                          <Link
                            className="text-none"
                            href={`/shop-product-detail/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                        </h5>
                        <ul
                          className="nav-x gap-0 text-gray-100 dark:text-gray-700"
                          title="Average 5 out of 5"
                        >
                          {[...Array(elm.rating)].map((elm, i) => (
                            <li key={i}>
                              <i className="icon fs-7 sunicon-star-filled text-yellow" />
                            </li>
                          ))}
                          {[...Array(5 - elm.rating)].map((elm, i) => (
                            <li key={i}>
                              <i className="icon fs-7 sunicon-star-filled" />
                            </li>
                          ))}
                        </ul>
                        <div className="hstack justify-center gap-narrow fs-7">
                          {elm.oldPrice && (
                            <span className="price-old text-line-through opacity-40">
                              ${elm.oldPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="price">${elm.price.toFixed(2)}</span>
                        </div>
                        <a
                          className="btn btn-text text-none text-primary border-bottom fs-7 mt-1 pb-narrow"
                          onClick={() => addProductToCart(elm.id)}
                        >
                          {isAddedToCartProducts(elm.id)
                            ? "Already Added"
                            : "Add To Cart"}
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
