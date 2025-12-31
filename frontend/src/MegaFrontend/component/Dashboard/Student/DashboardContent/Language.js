import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './NewCourses.css'
import { useNavigate } from "react-router-dom";
function Language(){
// const [courses,setCourses]=useState([]);

const navigate=useNavigate();
const [cppCourses, setCppCourses] = useState([]);
  const [javaCourses, setJavaCourses] = useState([]);
//   const [pythonCourses, setPythonCourses] = useState([]);

  // Replace these with your actual MongoDB category IDs
  const CATEGORY_IDS = {
    cpp: "68e81189ce705713a0282c14",
    java: "68e81195ce705713a0282c16",
    // python: "6705f4c12d4e1234abcd3333"
  };


    useEffect(() => {
        async function LanguageCourses() {
          try {
           const [cppRes, javaRes] = await Promise.all([
          axios.post("http://localhost:4000/api/v1/course/getCourseDetail", { courseID: CATEGORY_IDS.cpp }),
        //   axios.post("http://localhost:4000/api/v1/course/getCourseDetail", { courseID: CATEGORY_IDS.java }),
        //   axios.post("http://localhost:4000/api/v1/course/getCourseDetail", { courseID: CATEGORY_IDS.python }),
        ]);

        setCppCourses(cppRes.data.courseDetail || []);
        setJavaCourses(javaRes.data.courseDetail || []);
        // setPythonCourses(pythonRes.data.courseDetail || []);
          }
           catch (err) {
            console.log(err);
            // toast.warn("");
          }
        }
         
        LanguageCourses();
    },[]);
    // console.log(cppCourses);
    if ((cppCourses.length==0) && (javaCourses.length==0)) 
    return null;

    const renderCourses = (title, courses) => (
    <div className="new-course-container">
        <h2>Language Booster</h2>
      <p className="title" style={{fontSize:18}}> {title}</p>
      <div className="course-grid">
        {courses.map(course => (
          <div className="course-card" key={course._id}
          onClick={() => navigate(`/course-detail/${course._id}`)} // ✅ navigate to detail page
              style={{ cursor: "pointer" }}>
            <img src={course.thumbnail} alt={course.courseName} className="course-image" />
            <h3 className="course-name">{course.courseName}</h3>
            <p className="course-price">₹{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
      <div>
      {renderCourses("C++ Courses", cppCourses)}
      {/* {renderCourses("Java Courses", javaCourses)} */}
      {/* {renderCourses("Python Courses", pythonCourses)} */}
    </div>
  );
}


export default Language;