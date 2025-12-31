import React from "react";
import "./Coupan.css";

function Coupan() {
  const coupons = [
    { id: 1, title: "50% OFF", code: "SAVE50", desc: "Get 50% off on Web Dev Course" },
    { id: 2, title: "30% OFF", code: "LEARN30", desc: "Flat 30% off on Data Science" },
    { id: 3, title: "BUY 1 GET 1", code: "B1G1", desc: "On Graphic Design Courses" },
    { id: 4, title: "20% OFF", code: "CODE20", desc: "Discount on DSA Masterclass" },
  ];

  return (
    <div className="coupan-container">
      <div className="coupan-slider">
        {coupons.concat(coupons).map((coupon, index) => (
          <div key={index} className="coupan-card">
            <h3>{coupon.title}</h3>
            <p>{coupon.desc}</p>
            <span className="code">Use Code: {coupon.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coupan;
