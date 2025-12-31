import studyLogo from "../../assest/Logo.jpg";
import Logo1 from "../../assest/mg2.jpg";
import "./Container4.css";
import {
  FaCrown,
  FaChalkboardTeacher,
  FaBookOpen,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
// import {FaCrown} from "react-icons/fa"
const features = [
  {
    logo: <FaCrown />,
    heading: "Leadership",
    description: "Fully committed to the success of every student",
  },
  {
    logo: <FaChalkboardTeacher />,
    heading: "Expert Mentors",
    description: "Learn from industry professionals with real experience",
  },
  {
    logo: <FaBookOpen />,
    heading: "Quality Content",
    description: "Well-structured courses with practical learning",
  },
  {
    logo: <FaChartLine />,
    heading: "Career Growth",
    description: "Focused on skill-building and job readiness",
  },
  {
    logo: <FaShieldAlt />,
    heading: "Trusted Platform",
    description: "Thousands of learners trust our education system",
  },
];

function Container4() {
  return (
    <section className="container4">
       
      {/* LEFT SIDE */}
      <div className="container4-left">
        <h1 className="container4-title">
          Why Choose <span>StudyDesk</span>?
        </h1>

        <div className="features">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              {/* <img
                src={item.logo}
                alt={item.heading}
                className="feature-icon"
              /> */}
              <div className="feature-icon">
              {item.logo}
              </div>
              <div>
                <h3>{item.heading}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="container4-right">
        <img src={studyLogo} alt="Study Illustration" className="main-image" />

        <div className="stats">
          <div className="stat-box">
            <h2>10+</h2>
            <p>Years Experience</p>
          </div>

          <div className="stat-box">
            <h2>50+</h2>
            <p>Expert Mentors</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container4;
