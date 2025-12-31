import React from "react";
import "./Container3.css";
import CTAButton from "./CTAButton";

function Container3() {
  return (
    <section className="container3-wrapper">
      <div className="container3">
        {/* LEFT TEXT */}
        <div className="container3-left">
          <h2>
            Get the skills you need for a{" "}
            <span className="highlight">job that is in demand</span>
          </h2>
        </div>

        {/* RIGHT CONTENT */}
        <div className="container3-right">
          <p>
            The modern StudyNotion dictates its own terms. Today, to be a
            competitive specialist requires more than just professional skills.
          </p>

          <CTAButton active={true}>Learn More</CTAButton>
        </div>
      </div>
    </section>
  );
}

export default Container3;
