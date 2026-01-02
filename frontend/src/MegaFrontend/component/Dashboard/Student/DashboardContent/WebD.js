import { useEffect, useState } from "react";
import axios from "axios";
 import { showLoader,hideLoader } from "../../../../slice/loaderSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function WebD() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [webdCourses, setWebdCourses] = useState([]);
 const dispatch=useDispatch()
  /* ================= GET CATEGORIES ================= */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/course/showCategory`)
      .then((res) => setCategories(res.data.allCategory || []))
      .catch((err) => console.error(err));
  }, []);
 
  /* ================= GET COURSES BY CATEGORY ================= */
  useEffect(() => {
    async function fetchWebdCourses() {
                dispatch(showLoader())
      
      try {
        const webdCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "web development"
        );
        console.log(categories)

        const requests = [];

        if (webdCategory) {
           
        const webd=await axios.post(
              `${process.env.REACT_APP_BASE_URL}/course/getCourseDetail`,
          // axios.post("http://localhost:4000/api/v1/course/getCourseDetail", { courseID: CATEGORY_IDS.cpp }),

              { courseID: webdCategory._id }
             
          );
// console.log(cpp.data.courseDetail)

          setWebdCourses(webd.data.courseDetail)
        }
          dispatch(hideLoader())

     
      } 
      catch (error) {
        console.error(error);
                  dispatch(hideLoader())
        
      }
    }
// console.log(cppCourses)
    if (categories.length > 0) {
      fetchWebdCourses();
    }
  }, [categories]);

  if (webdCourses.length === 0 ) return null;

  /* ================= UI ================= */
  const renderCourses = (title, courses) => (
    <div className="new-course-container">
      <h2> Web Development Courses</h2>
      {/* <p className="title" style={{ fontSize: 18 }}>{title}</p> */}

      <div className="course-grid">
        {courses.map((course) => (
          <div
            className="course-card"
            key={course._id}
            onClick={() => navigate(`/course-detail/${course._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="course-image"
            />
            <h3 className="course-name">{course.courseName}</h3>
            <p className="course-price">₹{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {webdCourses.length>0 &&renderCourses("Ai/Ml Courses", webdCourses)}
      
    </div>
  );
}

export default WebD;
