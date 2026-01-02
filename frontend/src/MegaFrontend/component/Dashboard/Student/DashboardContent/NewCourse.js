import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './NewCourses.css'
import { useNavigate } from "react-router-dom";
import { showLoader,hideLoader } from "../../../../slice/loaderSlice";
import { useDispatch } from "react-redux";
function NewCourse(){
const [courses,setCourses]=useState([]);
const navigate=useNavigate();
const dispatch=useDispatch()
    useEffect(() => {
        async function topCourse() {
                    dispatch(showLoader())
          
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/course/getCourseDetail`,
              {}
            );
            // console.log(res.data.courseDetail);
            const courseData = res.data.topCourses ;
            setCourses(courseData); 
                      dispatch(hideLoader())
            
    
          }
           catch (err) {
            console.log(err);
                      dispatch(hideLoader())
            
            // toast.warn("");
          }
        }
         
        topCourse();
    },[]);
    // console.log(courses);
    if (!courses || courses.length === 0) {
    return null;
  }
    return (
       <div className="new-course-container">
      <h2 className="title">Top Courses</h2>
      <div className="course-grid">
        {courses.map((course,index) => (
          <div className="course-card" key={course._id} 
          onClick={() => navigate(`/course-detail/${course._id}`)} // ✅ navigate to detail page
              style={{ cursor: "pointer" }}> 
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="course-image"
            />
            <h3 className="course-name">Course Name: {course.courseName}</h3>
            <p className="course-price">Price :₹{course.price}</p>
          </div>
        )
        )}
      </div>
    </div>
    )
}

export default NewCourse;