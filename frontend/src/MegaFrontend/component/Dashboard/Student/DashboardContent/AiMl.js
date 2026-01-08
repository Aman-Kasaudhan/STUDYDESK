import { useEffect, useState } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";
import { showLoader,hideLoader } from "../../../../slice/loaderSlice";
import { useDispatch } from "react-redux";
function Aiml() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [aimlCourses, setAimlCourses] = useState([]);
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
    async function fetchAimlCourses() {
                dispatch(showLoader())
      
      try {
        const aimlCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "ai/ml"
        );
        
// console.log(cppCategory._id)
        // if (!cppCategory && !javaCategory) return;

        const requests = [];

        if (aimlCategory) {
          // requests.push(
        const aiml=await axios.post(
              `${process.env.REACT_APP_BASE_URL}/course/getCourseDetail`,
          // axios.post("http://localhost:4000/api/v1/course/getCourseDetail", { courseID: CATEGORY_IDS.cpp }),

              { courseID: aimlCategory._id }
            // )
          );
// console.log(cpp.data.courseDetail)

          setAimlCourses(aiml.data.courseDetail)
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
      fetchAimlCourses();
    }
  }, [categories]);

  if (aimlCourses.length === 0 ) return null;

  /* ================= UI ================= */
  const renderCourses = (title, courses) => (
    <div className="new-course-container">
      <h2> AI/ML Courses</h2>
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
             <h3 className="course-name">Course Name: {course.courseName}</h3>
            <p className="course-price">Price :₹{course.price}</p>
      
               </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {aimlCourses.length>0 &&renderCourses("Ai/Ml Courses", aimlCourses)}
      
    </div>
  );
}

export default Aiml;
