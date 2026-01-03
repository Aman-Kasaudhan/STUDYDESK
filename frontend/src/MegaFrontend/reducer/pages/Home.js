import React from 'react';
import {FaArrowRight} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import './Home.css'
import '../../component/Homepage/CTAButton.css';

import banner from '../../assest/banner.mp4'
import CTAButton from '../../component/Homepage/CTAButton'
import Container1 from '../../component/Homepage/Container1'
import Container2 from '../../component/Homepage/Container2'
import Container3 from '../../component/Homepage/Container3'
import Container4 from '../../component/Homepage/Container4'
import Container5 from '../../component/Homepage/Container5'
import Container6 from '../../component/Homepage/Container6'
import Navbar from '../../component/Homepage/Navbar'
import Login from './Login'
import Signup from './Signup'
 import InstructorImageDashboard from '../../component/Dashboard/Instructor/InstructorImageDashboard';
import StudentImageDashboard from '../../component/Dashboard/Student/DashboardContent/StudentImageDashboard';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
function Home(){
 

const {user}=useSelector( (state)=>state.profile)

     const {totalItems}=useSelector( (state)=>state.cart)
     const {token}=useSelector( (state)=>state.auth);
     // const accounttype=user?.accountType;
     // console.log(accounttype)
     const navigate=useNavigate()
    
function contact(){
  navigate("/contact")
}
      return(
        <div className='main'>
          <div className="navbar">
  <div className="navbar-left"></div>   {/* empty or logo if you want */}
  
  <div className="navbar-center">
    <Navbar />
  </div>
                <div>
                {
                   token && user && user?.accountType=="Student" &&(
                        <Link to="/cart-items" className="cart-icon" title="Your Cart">
    <FaShoppingCart size={29} style={{ cursor: "pointer", marginRight: "15px", color:"lightgrey"}} />
                           
                        {
                            totalItems>0&&(
                                <span className='cartNumberItem'
                                >
                                    {totalItems}
                                </span>
                            )

                          }
                    </Link>
                    )
                }
                    </div>
 
  <div className="navbar-right">
    

    {token != null && user && (user?.accountType === "Instructor" ? <InstructorImageDashboard /> : <StudentImageDashboard />)}
  </div>
</div>


            {/* Section 1 */}
            <div className='part1'>
             {!token && !user && <Link to={"/signup"}>
              
               <div className='btn'>

                 <div className='btn1'>
                   <p>Become an Instructor</p>
                   <FaArrowRight/>
                </div>
               
                </div>
             </Link>}
           
            <div className='text1'>
                Empower Your Future with <span className='textStyle'>Coding Skills</span>
            </div>

            <div className='text2'>
                With our online coding courses, yo can learn at your own pace, from anywhere in the world,and get access to a wealth of resources, including hands-on projects,quizzes and personalized feedback from instructor
            </div>

            <div className='CTAButton'>
               <button className="become-instructor-btn" onClick={contact}>Learn More</button>
    
               <button className="become-instructor-btn" onClick={contact}>Book a Demo</button>
            </div>
            <div>
              <video muted loop autoPlay  className='video1'>
                  <source src={banner} type="video/mp4"/>
              </video>
            </div>

             
              {/* Code Section */}

           
        <div className='code1'>
         <Container1/>
           </div>   


        <div className='code2'>
          <Container2/>
         </div>

        </div>

        <div className='part2'>

         
          <div>
             <Container3></Container3>
          </div>
             
             <div>
              <Container4></Container4>
             </div>
             <div>
              <Container5></Container5>
             </div>

              <div className='btn4' >
              {/* <CTAButton active={true}>Learn More</CTAButton> */}
              </div>
        </div>

        <div className='part3'>

          <div>
              <Container6></Container6>
          </div>

        </div>
        
        </div>
      );
}
export default Home;