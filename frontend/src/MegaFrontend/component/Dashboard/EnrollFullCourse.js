import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EnrollFullCourse.css";
import { toast } from "react-toastify";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
function EnrollFullCourse() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch=useDispatch()
  useEffect(() => {
    const fetchCourse = async () => {
              dispatch(showLoader())
      
      try {
        const res = await axios.get(
         `${process.env.REACT_APP_BASE_URL}/course/getCourseDetailByCourseId/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data.courseDetail);
        // console.log(data.courseContent[0].subSections[0].videourl)
                dispatch(hideLoader())
        
      } catch (error) {
        toast.error("Failed to load course");
                dispatch(hideLoader())
        
      } finally {
        setLoading(false);
                dispatch(hideLoader())
        
      }
    };

    fetchCourse();
  }, [id, token]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!data) return <p>Course not found</p>;

  return (
    <div className="course-layout">
      {/* LEFT SIDE */}
      <div className="left-panel">
        {/* COURSE NAME */}
        <h1 className="course-title">Course Name : {data.courseName}</h1>

        {/* INSTRUCTOR */}
        <p className="instructor">
          Created by {" "}
          <b>
            {data.instructor?.firstName} {data.instructor?.lastName}
          </b>
        </p>

        {/* TAGS */}
        <div className="tags"> Tags :
          {data.tag?.map((tag, i) => (
            <span key={i} className="tag">
              { tag}
            </span>
          ))}
        </div>

        {/* REQUIREMENTS */}
        <div className="requirements">
          <h3>Requirements</h3>
          <ul>
            {data.instruction?.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        {/* COURSE CONTENT */}
        <div className="course-content">
          <h2>Course Content</h2>

          {data.courseContent?.map((section) => (
            <div key={section._id} className="section">
              <div
                className="section-header"
                onClick={() =>
                  setOpenSection(
                    openSection === section._id ? null : section._id
                  )
                }
              >
                <span>{section.sectionName}</span>
                <span>{openSection === section._id ? "−" : "+"}</span>
              </div>

              {openSection === section._id && (
                <div className="lectures">
                  {section.subSections.map((sub) => (
                    <div key={sub._id} className="lecture">
                      <div className="lecture-title">
                        ▶ {sub.title}
                        <span className="duration">
                          {sub.timeDuration}
                        </span>
                      </div>

                      <video src={sub.videourl} controls controlsList="nodownload"/>
{/* <video
  controls
  src={`http://localhost:4000/api/v1/profile/stream/${sub.videourl}`}
/> */}

                      {/* <a
                        className="download-btn"
                        href={`http://localhost:4000/api/v1/profile/download-video/${sub.videourl}`}
                      >
                        ⬇ Download Video
                      </a> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">
        <img src={data.thumbnail} alt="Course Thumbnail" />
      </div>
    </div>
  );
}

export default EnrollFullCourse;
