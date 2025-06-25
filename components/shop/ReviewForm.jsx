"use client";
import "./ReviewForm.css";
export default function ReviewForm() {
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="panel vstack gap-2 lg:gap-3 mt-2 mb-3"
        action="?"
      >
        <div className="row g-2 child-cols-12 lg:child-cols-12 review_div">
          <h4 className="review">Add your Review</h4>
          <p>Your Rating</p>
          <div className="form-group">
            <label className="" htmlFor="reviewer_name">
              Name <sup className="text-danger"></sup>
            </label>
            <input
              type="text"
              id="reviewer_name"
              className="form-control form-control-sm form_input "
              placeholder="Enter Your Name"
            />
          </div>
          <div className="form-group">
            <label
              className="form-label fs-7 ft-tertiary"
              htmlFor="reviewer_email"
            >
              Email Address <sup className="text-danger"></sup>
            </label>
            <input
              type="email"
              id="reviewer_email"
              className="form-control form-control-sm form_input"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label
              className="form-label fs-7 ft-tertiary"
              htmlFor="reviewer_email"
            >
              Your Review <sup className="text-danger"></sup>
            </label>
            <textarea
              id="text_area"
              className="w-full h-[100px] p-2 form_input"
              placeholder="Enter Your Review"
              required
            ></textarea>
          </div>
        </div>
        <button className="submit_btn">Submit </button>
      </form>
      <hr />
    </>
  );
}
