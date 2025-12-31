
import { useEffect, useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "./AiMl.css";  

function Webd() {
   
  const [courses, setCourses] = useState([]);
const id='68cc524edcab91522536be7a';
const navigate=useNavigate();
  useEffect(() => {
    async function categoryData() {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/v1/course/getCourseDetail",
          { courseID: id }
        );
        // console.log(res.data.courseDetail);
        const courseData = res.data.courseDetail || [];
        setCourses(courseData); 
        

      }
       catch (err) {
        console.log(err);
        toast.warn("No course found");
      }
    }
     
    categoryData();
  }, [id]);
if (!courses || courses.length === 0) {
    return null;
}
  return (
    <div className="new-course-container">
      <h2>Web Development Courses </h2>
      {courses.length > 0 ? (
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" 
            key={course._id}
              onClick={() => navigate(`/course-detail/${course._id}`)} // ✅ navigate to detail page
              style={{ cursor: "pointer" }}
            >
              <img
                src={ course.thumbnail || "https://via.placeholder.com/200"}
                alt={course.name}
                className="course-image"
              />
              {/* <div className="Ai-info"> */}
                <h3 className="course-name">Course Name: {course.courseName}</h3>
                <p className="course-price">Price: ₹{course.price}</p>
                {/* <p className="Ai-instructor">
                  Instructor: {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p> */}
                {/* <p className="Ai-category">
                  Category: {course?.category?.name}
                </p> */}
              {/* </div> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found for this category</p>
      )}
    </div>
  );
}

export default Webd;
 