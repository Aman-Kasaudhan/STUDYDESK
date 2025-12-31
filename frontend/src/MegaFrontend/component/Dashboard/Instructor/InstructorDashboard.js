// import { VscBook, VscGraph, VscMortarBoard } from "react-icons/vsc";
// import InstructorImageDashboard from "./InstructorImageDashboard";
// import './InstructorDashboard.css';
// import { useDispatch, useSelector } from "react-redux";
// import AddCourse from "./Addcourse";
// import {  useNavigate } from "react-router-dom";
// import "../../../common/loader2.css"
// import { useState } from "react";
// import { resetCourse } from "../../../slice/courseSlice";
// function InstructorDashboard() {
//   const [loading, setLoading] = useState(true);
//     const { user } = useSelector((state) => state.profile);
//     // console.log(user.courses.length)
//     const navigate=useNavigate();
//     const dispatch=useDispatch()
//     console.log(user.courses)
//      function addCourse(){
//       dispatch(resetCourse()); 
//       navigate("/dashboard/add-courses")
//     }

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <header className="dashboard-header">
//         <h2>Welcome back, {user?.firstName} 👋</h2>
//         <div className="profile">
//           {/* <img src="/profile.png" alt="Profile" /> */}
//         <InstructorImageDashboard />

//         </div>
//       </header>

//       {/* Stats Section */}
//       <div className="stats-cards">
//         <div className="card"><VscBook size={25}/> <p>Courses: {user.courses.length}</p></div>
//         <div className="card"><VscMortarBoard size={25}/> <p>Students: 856</p></div>
//         <div className="card"><VscGraph size={25}/> <p>Revenue: $1,250</p></div>
//       </div>

//       {/* Main Content */}
//       <div className="main-section">
//         {/* <InstructorImageDashboard /> */}
        
//         <div className="recent-courses">
//           <h3>Recent Courses</h3>
//           <ul>
//             <li>React Mastery Bootcamp — 120 Students</li>
//             <li>Python for Data Science — 220 Students</li>
//           </ul>
//         </div>
//       </div>

//       {/* Create New Course */}
//       <button className="create-course-btn" onClick={addCourse}>+ Create New Course</button>
//       <div className="dot-loader">
//   <span></span>
//   <span></span>
//   <span></span>
// </div>

//     </div>
//   );
// }

// export default InstructorDashboard;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./InstructorDashboard.css";
import InstructorImageDashboard from "./InstructorImageDashboard";
import { toast } from "react-toastify";
import { showLoader,hideLoader } from "../../../slice/loaderSlice";
import { useNavigate } from "react-router-dom";
const InstructorDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
 const dispatch=useDispatch();
const navigate=useNavigate()
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [courseStats, setCourseStats] = useState([]);
  

  useEffect(() => {
    const fetchInstructorStats = async () => {
      try {
         dispatch(showLoader())

        const res = await axios.get(
          "http://localhost:4000/api/v1/profile/dashboard-stats-instructor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const data = res.data.data;
           
          setTotalCourses(data.totalCourses);
          setTotalStudents(data.totalStudents);
          setTotalRevenue(data.totalRevenue);
          setCourseStats(data.courseStats);
        }
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to load dashboard"
        );
        toast.warn("Server error")
        dispatch(hideLoader())

      } finally {
        dispatch(hideLoader())
      }
    };

    if (token) fetchInstructorStats();
  }, [token]);
 
  function addCourse(){
    navigate("/dashboard/add-courses")
  }


  return (
    <div className="dashboard-container">
        <InstructorImageDashboard />

 <h2>Welcome back, {user?.firstName} 👋</h2>

      {/* SUMMARY CARDS */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <p>Total Courses</p>
          <h3>{totalCourses}</h3>
        </div>

        <div className="dashboard-card">
          <p>Total Students</p>
          <h3>{totalStudents}</h3>
        </div>

        <div className="dashboard-card">
          <p>Total Revenue</p>
          <h3>₹{totalRevenue}</h3>
        </div>
      </div>

      {/* COURSE TABLE */}
      <div className="dashboard-table-container">
        <h3>Course Performance</h3>

        {courseStats.length === 0 ? (
          <p className="no-data">No courses found</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Price</th>
                <th>Students</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>₹{course.price}</td>
                  <td>{course.studentsCount}</td>
                  <td>₹{course.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button className="addCourse" onClick={addCourse}>+ Add Course</button>
    </div>
  );
};

export default InstructorDashboard;
