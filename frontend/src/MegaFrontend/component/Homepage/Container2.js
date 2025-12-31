import React from "react";
import "./Container2.css";
import codeString from "./Code";
import Container12 from "./Container12";
import CTAButton from "./CTAButton";

function Container2() {
  return (
    <section className="container2">
      {/* LEFT : CODE PREVIEW */}
      <div className="container2-left">
        <Container12 code={codeString} />
      </div>

      {/* RIGHT : CONTENT */}
      <div className="container2-right">
        <h2 className="container2-title">
          Start <span className="highlight">coding in seconds</span>
        </h2>

        <p className="container2-desc">
          Go ahead, give it a try. Our hands-on learning environment means
          you’ll be writing real code from your very first lesson.
        </p>

        <div className="container2-actions">
          <CTAButton active={true}>Continue Lesson</CTAButton>
          <CTAButton>Learn More</CTAButton>
        </div>
      </div>
    </section>
  );
}

export default Container2;
