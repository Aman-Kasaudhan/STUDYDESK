// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "./EnrolledCourse.css";

// function EnrolledCourse() {
//   const token = useSelector((state) => state.auth.token);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) return;

//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/v1/profile/getEnrolledCourses",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log(res)
//         setCourses(res.data?.data || []);
//       } catch (error) {
//         console.error(
//           error.response?.data?.message || "Failed to fetch courses"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrolledCourses();
//   }, [token]);

//   if (loading) return <p className="loading-text">Loading...</p>;
//   return (
//     <div className="enrolled-container">
//       <h2 className="page-title">Enrolled Courses</h2>

//       {courses.length === 0 ? (
//         <p className="empty-text">You have not enrolled any course</p>
//       ) : (
//         <div className="course-grid">
//           {courses.map((course) => (
//             <div key={course._id} className="course-card">
//               <img
//                 src={course.thumbnail}
//                 alt={course.courseName}
//                 className="course-thumbnail"
//               />

//               <div className="course-content">
//                 <h3 className="course-title">Course Name : {course.courseName}</h3>
                 
//                 <p className="course-description">
//                 <b>Course Description : </b>  {course.courseDescription}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default EnrolledCourse;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EnrolledCourse.css";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
function EnrolledCourse() {
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const dispatch=useDispatch()
  useEffect(() => {
    if (!token) return;

    const fetchEnrolledCourses = async () => {
            dispatch(showLoader())
    
      try {
        const res = await axios.get(
         `${process.env.REACT_APP_BASE_URL}/profile/getEnrolledCourses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(res.data?.data || []);
                dispatch(hideLoader())
        
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch courses");
        dispatch(hideLoader())
      } finally {
        setLoading(false);
                dispatch(hideLoader())
        
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="enrolled-container">
      <h2 className="page-title">Enrolled Courses</h2>

      {courses.length === 0 ? (
        <p className="empty-text">You have not enrolled any course</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course-card clickable"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="course-thumbnail"
              />

              <div className="course-content">
                <h3 className="course-title"><strong>Course Name:</strong> {course.courseName}</h3>
                <p className="course-description">
                 Course Description:  {course.courseDescription}
                </p>

                <p className="access-text">▶ Continue Learning</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourse;
