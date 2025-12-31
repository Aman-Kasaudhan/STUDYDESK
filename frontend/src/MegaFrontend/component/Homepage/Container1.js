import "./Container.css";
import CTAButton from "./CTAButton";
import Container12 from "./Container12";
import codeString from "./Code";

function Container1() {
  return (
    <section className="container">
      {/* LEFT CONTENT */}
      <div className="container-left">
        <h1 className="container-title">
          Unlock your <span className="highlight">coding potential</span> <br />
          with our online courses
        </h1>

        <p className="container-desc">
          Our courses are designed and taught by industry experts who have
          years of real-world experience and are passionate about helping
          you grow.
        </p>

        <div className="container-actions">
          <CTAButton active={true}>Try it Yourself</CTAButton>
          <CTAButton>Learn More</CTAButton>
        </div>
      </div>

      {/* RIGHT CODE PREVIEW */}
      <div className="container-right">
        <Container12 code={codeString} />
      </div>
    </section>
  );
}

export default Container1;
