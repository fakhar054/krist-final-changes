import React from "react";
import "./features.css";

export default function page() {
  return (
    <div>
      <div className="features_div mb-3">
        <div className="features">
          <div className="feature">
            <img src="/assets/images/common/vehical.png" alt="Free Shipping" />
            <h4>Free Shipping</h4>
            <p>Free shipping for order above $150</p>
          </div>
          <div className="feature">
            <img src="/assets/images/common/money.png" alt="Money Guarantee" />
            <h4>Money Guarantee</h4>
            <p>Within 30 days for an exchange</p>
          </div>
          <div className="feature">
            <img src="/assets/images/common/face.png" alt="Online Support" />
            <h4>Online Support</h4>
            <p>24 hours a day</p>
          </div>
          <div className="feature">
            <img
              src="/assets/images/common/payment.png"
              alt="Flexible Payment"
            />
            <h4>Flexible Payment</h4>
            <p>Pay with multiple credit cards</p>
          </div>
        </div>
      </div>
    </div>
  );
}
