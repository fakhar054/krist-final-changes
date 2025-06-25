import React from "react";
import "./review_section.css";
import "../../public/assets/css/theme/main.css";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import ReviewFilterDropdown from "../ReviewFilterDropdown/ReviewFilter";
import Comments from "../Comments/Comments";

export default function ReviewSection({ product_review }) {
  // console.log("product Review", product_review);
  return (
    <section className="review_sec mb-3 pb-3 mt-5">
      <div className={`container max-w-xl`}>
        <div className="flex_div pb-2 mb-3">
          <h1>Reviews</h1>
          <FaPlus className="icon_size" />
        </div>
        <div className="row pb-3 first_row">
          <div className="col-lg-4">
            <div className="heading_sec">
              <h3>Review Snippet</h3>
              <p>Lorem ipsum dolor, sit amet consectetur </p>
            </div>
            <div className="review_row mt-2 mb-1">
              <div className="progress-container">
                <FaStar className="star_icon" />

                <div>5</div>
                <div className="progress-bar">
                  <div className="progress-fill second"></div>
                </div>
                <div>23</div>
              </div>
            </div>
            <div className="review_row mb-1">
              <div className="progress-container">
                <FaStar className="star_icon" />

                <div>5</div>
                <div className="progress-bar">
                  <div className="progress-fill zero"></div>
                </div>
                <div>23</div>
              </div>
            </div>
            <div className="review_row mb-1">
              <div className="progress-container">
                <FaStar className="star_icon" />

                <div>5</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div>23</div>
              </div>
            </div>
            <div className="review_row mb-1">
              <div className="progress-container">
                <FaStar className="star_icon" />

                <div>5</div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div>23</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Overall rating</h3>
            <div className="parent_flex_div">
              <h1>{product_review?.rating}</h1>
              <div className="stars_review">
                <div className="stars_div">
                  <FaStar className="star_icon" />
                  <FaStar className="star_icon" />
                  <FaStar className="star_icon" />
                  <FaStar className="star_icon" />
                  <FaStar className="star_icon" />
                </div>
                <p>5.0 (10)</p>
              </div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, minima?
            </p>
          </div>
          <div className="col-lg-4 product_review">
            <h3>Review this Product</h3>
            <div className="stars_div mt-2 mb-1">
              <FaStar className="star_icon active" />
              <FaStar className="star_icon" />
              <FaStar className="star_icon" />
              <FaStar className="star_icon" />
              <FaStar className="star_icon" />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestias, itaque.
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-4">
            <div className="filter_div pb-2 mb-2">
              <h6>Review Filter</h6>
              <p>Reset All</p>
            </div>
            <ReviewFilterDropdown />
            <div className="last_sec mb-3 mt-2">
              <h4>Lorem, ipsum dolor.</h4>
              <p>Lorem ipsum dolor sit.</p>
              <button>Lorem lipsum</button>
            </div>
          </div>
          <div className="col-lg-8">
            <Comments />
          </div>
        </div>
      </div>
    </section>
  );
}
