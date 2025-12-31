import React from "react";
import './About.css'
import img4 from '../../assest/img4.jpg'
import img5 from '../../assest/img5.jpg'
import img6 from '../../assest/img6.jpg'
import ContactUs from "./Contact";

function About(){
return(
<div>
    <div className="about2">
        <div className="about3">
            <h2>Driving Innovation in Inline Education for 
                a <span>Brighter Future</span>
            </h2>
            <p>
                Studeydesk provide good oppurtunity to student 
            </p>
            <div className="aboutImage">
               <img src={img4} style={{height:200}}></img>
               <img src={img5} style={{height:200}}></img>
               <img src={img6} style={{height:200}}></img>
            </div>

            <h2>We are passionate about revoluting the way we learn.Our
                innovative platform <span>combines technology</span>,<span>experties </span>
                and community create an <span>unparalleled educational experience.</span>
            </h2>
        </div>

    </div>


    <div className="section2">

        <div className="section21">

        <div className="left1">
            <h2>Our Founding Story</h2>
            <p> We started with a simple belief — that education should not be limited 
          by location or resources. From a small team with a big dream, we’ve grown 
          into a platform that helps thousands of learners achieve their goals 
          and prepare for a brighter future.</p>
            <p></p>
        </div>

        <img src={img4} style={{height:200}} className="right1"></img>

        </div>

        <div className="section22">
            <div className="left2">
                <h2>Our Vision</h2>
                  <p>To build an innovative platform that connects students, educators, and 
             resources seamlessly — fostering collaboration, growth, and lifelong learning.</p>
            </div>

            <div className="left2">
            <h2>Our Mission</h2>
            <p>To empower learners worldwide by making quality education accessible, 
          engaging, and personalized through technology-driven solutions.</p>
            </div>

        </div>



    </div>

    {/* section 3 */}

    <div className="section3">
       <div className="section31">
           <h3>5+</h3>
           <p>Active Students</p>
       </div>
       <div className="section31">
           <h3>15+</h3>
          <p>Mentors</p> 

       </div><div className="section31">
           <h3>200+</h3>
           <p>Courses</p>
       </div><div className="section31">
           <h3>50+</h3>
           <p className="ee">Awards</p>
       </div>

    </div>
<div className="contactForm1"></div>
    {/* section 4 */}
    <div className="contactForm">
    <ContactUs/>
    </div>


    </div>
 
)
}
export default About;