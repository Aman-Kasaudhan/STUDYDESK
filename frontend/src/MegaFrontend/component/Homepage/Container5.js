import "./Container5.css";

function Container5() {
  return (
    <section className="container5">
      {/* TEXT CONTENT */}
      <div className="container5-text">
        <h2>
          Your swiss knife for{" "}
          <span className="highlight">learning any language</span>
        </h2>

        <p>
          Our platform makes learning multiple languages easy with
          <b> 20+ languages</b>, realistic voice-overs, progress tracking,
          custom schedules, and much more.
        </p>
      </div>

      {/* IMAGE / CARDS */}
      <div className="container5-cards">
        <div className="card card-left">
          <div className="card-content">
            <h4>20+ Languages</h4>
            <p>Learn global languages with native pronunciation</p>
          </div>
        </div>

        <div className="card card-center">
          <div className="card-content">
            <h4>Smart Tracking</h4>
            <p>Track progress with AI-powered insights</p>
          </div>
        </div>

        <div className="card card-right">
          <div className="card-content">
            <h4>Flexible Schedule</h4>
            <p>Learn anytime with personalized plans</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container5;
