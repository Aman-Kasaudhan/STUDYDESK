import "./Container6.css";
import img3 from "../../assest/img3.jpg";
import CTAButton from "./CTAButton";
import {Link, useNavigate} from 'react-router-dom'

function Container6() {
    const navigate=useNavigate()
    function w(){
        navigate("/signup")
    }
  return (
    <section className="container6">
      {/* IMAGE */}
      <div className="container6-image">
        <img src={img3} alt="Become an Instructor" />
      </div>

      {/* CONTENT */}
      <div className="container6-content">
        <h2 className="container6-title">
          Become an <span className="highlight">Instructor</span>
        </h2>

        <p className="container6-desc">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <div className="container6-btn">
            {/* <Link to={"/signup"}> */}
            <button className="become-instructor-btn" onClick={w}>
  Become an Instructor
</button>

          
          {/* </Link> */}
        </div>
      </div>
    </section>
  );
}

export default Container6;
