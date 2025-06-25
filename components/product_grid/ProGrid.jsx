import React from "react";
import "./Product_grid.css";
export default function ProGrid() {
  return (
    <>
      <section className="deal-section mb-3">
        <div className="container">
          <div className="row row_height">
            <div className="col-md-8 ">
              <div className="img_parent_div">
                <div className="main_img_div pb-3 pt-3 ">
                  <p id="discount">Up to 70% OFF</p>
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="mt-3 heading">
                        Lenovo
                        <br /> Office & Work Laptop
                      </h3>
                      <div className="text_icon_div">
                        <p id="shop_now">Shop Now</p>
                        <img
                          src="/assets/images/common/icons/arrow_img.png"
                          alt=""
                        />
                      </div>
                      <p className="mt-2" id="latest">
                        Power & Verstality
                      </p>
                      <p id="latest">ThinkPad X1 Gen 12 Latest Workstation</p>
                    </div>
                    <div className="col-md-6 img_col">
                      <img src="/assets/images/products/computer1.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="small_images_parent">
                  <div className="small_image1 small_div_width">
                    <img src="/assets/images/products/laptop.png" alt="" />
                    <p>
                      Lenovo Laptop
                      <span id="small_dis" className="mt-2 ">
                        Upto 70% OFF
                      </span>
                    </p>
                  </div>
                  <div className="small_image1 small_div_width">
                    <img src="/assets/images/products/laptop.png" alt="" />
                    <p>
                      Lenovo Laptop <span id="small_dis">Upto 70% OFF</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="second_col_main">
                <div className="small_image1 second_col_div">
                  <img src="/assets/images/products/laptop.png" alt="" />
                  <p>
                    Lenovo Laptop
                    <span id="small_dis" className="mt-2 ">
                      Upto 70% OFF
                    </span>
                  </p>
                </div>
                <div className="small_image1 second_col_div_2">
                  <img src="/assets/images/products/laptop.png" alt="" />
                  <p>
                    Lenovo Laptop <span id="small_dis">Upto 70% OFF</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
