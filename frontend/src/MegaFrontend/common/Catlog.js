import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Catlog.css";
import { showLoader,hideLoader } from "../slice/loaderSlice";
import { useDispatch } from "react-redux";

function CatalogPage() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(() => {
     dispatch(showLoader())

    const fetchCategoryData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/course/getCourseDetail`,
          { courseID: id }
        );

        setCourses(res.data?.courseDetail || []);
                dispatch(hideLoader())

      } catch (error) {
        console.error(error);
        toast.warn("No course found");
                dispatch(hideLoader())

      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  return (
    <div className="catalog-container">
      <h2>All {courses[0]?.category?.name} Courses</h2>

      {courses.length > 0 ? (
        <div className="course-list">
          {courses.map((course) => (
           <div className="course-card"
             key={course._id} 
             onClick={() => navigate(`/course-detail/${course._id}`)}
             style={{ cursor: "pointer" }}
             >
              <img
                src={course.thumbnail || "https://via.placeholder.com/200"}
                alt={course.name}
                className="course-thumbnail"
              />

              <div className="course-info">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-price">₹{course.price}</p>

                <p className="course-instructor">
                  Instructor: {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>

                <p className="course-category">
                  Category: {course?.category?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found for this category</p>
      )}
    </div>
  );
}

export default CatalogPage;
