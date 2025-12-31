import React, { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setStep } from "../../../slice/courseSlice";
import { showLoader, hideLoader } from "../../../slice/loaderSlice";
import "./BuilderForm.css";

function BuilderForm() {
  const dispatch = useDispatch();
  const { course } = useSelector((s) => s.course);
  const { token } = useSelector((s) => s.auth);

  const [sections, setSections] = useState([]);

  useEffect(() => {
  async function fetchCourseContent() {
    try {
      dispatch(showLoader());

      const res = await axios.get(`http://localhost:4000/api/v1/course/getCourseDetailByCourseId/${course._id}`,  
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const fetchedSections =
      // console.log( )
      res.data.courseDetail.courseContent.map((sec) => ({
          tempId: sec._id,
          _id: sec._id,
          sectionName: sec.sectionName,
          lectures: sec.subSections.map((lec) => ({
            tempId: lec._id,
            _id: lec._id,
            title: lec.title,
            description: lec.description,
            timeDuration: lec.timeDuration,
            videoFile: null,
            showUploaded: false,
            isOpen: false, // collapsed by default
          })),
        }));
 
      setSections(fetchedSections);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load course content");
    } finally {
      dispatch(hideLoader());
    }
  }

  if (course?._id) fetchCourseContent();
}, [course?._id]);


  /* ================= SECTION ================= */

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        tempId: Date.now(),
        _id: null,
        sectionName: "New Section",
        lectures: [],
      },
    ]);
  };

  const saveSection = async (i) => {
    try {
      dispatch(showLoader());
      const res = await axios.post(
        "http://localhost:4000/api/v1/course/createSection",
        { sectionName: sections[i].sectionName, courseID: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = [...sections];
      updated[i]._id = res.data.section._id;
      setSections(updated);
      toast.success("Section created");
    } finally {
      dispatch(hideLoader());
    }
  };

  const updateSection = async (i) => {
    await axios.put(
      "http://localhost:4000/api/v1/course/updateSection",
      {
        sectionID: sections[i]._id,
        sectionName: sections[i].sectionName,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Section updated");
  };

  const deleteSection = async (i) => {
    const sec = sections[i];
    setSections((prev) => prev.filter((_, idx) => idx !== i));

    if (sec._id) {
      await axios.post(
        "http://localhost:4000/api/v1/course/deleteSection",
        { sectionID: sec._id, courseID: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  /* ================= LECTURE ================= */

  const addLecture = (i) => {
    const updated = [...sections];
    updated[i].lectures.push({
      tempId: Date.now(),
      _id: null,
      title: "",
      description: "",
      timeDuration: "",
      videoFile: null,
      showUploaded: false,
      isOpen: true, // 👈 drawer open by default
    });
    setSections(updated);
  };

  const toggleLecture = (si, li) => {
    const updated = [...sections];
    updated[si].lectures[li].isOpen =
      !updated[si].lectures[li].isOpen;
    setSections(updated);
  };

  const uploadLecture = async (si, li) => {
    const sec = sections[si];
    const lec = sec.lectures[li];
    if(!sec._id) return toast.error("Save section first")
    if (!lec.title) return toast.error("Select video title");
    if (!lec.timeDuration) return toast.error("Select video timeDuration");
    if (!lec.description) return toast.error("Select video description");
    if (!lec.videoFile) return toast.error("Select video");

    const fd = new FormData();
    fd.append("title", lec.title);
    fd.append("description", lec.description);
    fd.append("timeDuration", lec.timeDuration);
    fd.append("sectionID", sec._id);
    fd.append("videoFile", lec.videoFile);

    dispatch(showLoader());
    const res = await axios.post(
      "http://localhost:4000/api/v1/course/createSubSection",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updated = [...sections];
    updated[si].lectures[li] = {
      ...lec,
      _id: res.data.subsection._id,
      videoFile: null,
      showUploaded: true,
      isOpen: false, // 👈 AUTO MINIMIZE AFTER UPLOAD
    };
    setSections(updated);

    setTimeout(() => {
      setSections((prev) => {
        const copy = [...prev];
        copy[si].lectures[li].showUploaded = false;
        return copy;
      });
    }, 2000);

    dispatch(hideLoader());
  };

  const updateLecture = async (si, li) => {
    const lec = sections[si].lectures[li];
    const fd = new FormData();
dispatch(showLoader())
    fd.append("subSectionId", lec._id);
    fd.append("title", lec.title);
    fd.append("description", lec.description);
    fd.append("timeDuration", lec.timeDuration);
    if (lec.videoFile) fd.append("videoFile", lec.videoFile);

    await axios.put(
      "http://localhost:4000/api/v1/course/updateSubSection",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Lecture updated");
    dispatch(hideLoader())
  };

  const deleteLecture = async (si, li) => {
    const lec = sections[si].lectures[li];
    const sec = sections[si];

    setSections((prev) =>
      prev.map((s, idx) =>
        idx === si
          ? { ...s, lectures: s.lectures.filter((_, j) => j !== li) }
          : s
      )
    );

    if (lec._id) {
      await axios.post(
        "http://localhost:4000/api/v1/course/deleteSubSection",
        { subSectionId: lec._id, sectionId: sec._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  return (
    <div className="builder-container">
      <h2 className="builder-title">Course Builder</h2>

      {sections.map((sec, i) => (
        <div key={sec.tempId} className="section-card">
          {/* SECTION HEADER */}
          <div className="section-header">
            <input
              className="section-input"
              value={sec.sectionName}
              onChange={(e) => {
                const u = [...sections];
                u[i].sectionName = e.target.value;
                setSections(u);
              }}
            />

            {!sec._id ? (
              <button className="btn btn-save" onClick={() => saveSection(i)}>
                Save
              </button>
            ) : (
              <button className="btn btn-update1" onClick={() => updateSection(i)}>
                Update
              </button>
            )}

            <button className="btn btn-delete1" onClick={() => deleteSection(i)}>
              Delete
            </button>
          </div>

          {/* LECTURES */}
          {sec.lectures.map((lec, j) => (
            <div key={lec.tempId} className="lecture-card">
              {/* HEADER */}
              <div className="lecture-header">
                <span className="lecture-title">
                  {lec.title || "New Lecture"}
                </span>

                <div className="lecture-header-actions">
                  {lec.showUploaded && (
                    <span className="lecture-uploaded">✔ Uploaded</span>
                  )}

                  <button
                    className="btn btn-toggle"
                    onClick={() => toggleLecture(i, j)}
                  >
                    {lec.isOpen ? "-" : "+"}
                  </button>
                </div>
              </div>

              {/* DRAWER BODY */}
              {lec.isOpen && (
                <div className="lecture-body">
                  <input
                    className="lecture-input"
                    placeholder="Lecture Title"
                    value={lec.title}
                    onChange={(e) => {
                      const u = [...sections];
                      u[i].lectures[j].title = e.target.value;
                      setSections(u);
                    }}
                  />

                  <input
                    className="lecture-input"
                    placeholder="Duration (e.g. 10:30)"
                    value={lec.timeDuration}
                    onChange={(e) => {
                      const u = [...sections];
                      u[i].lectures[j].timeDuration = e.target.value;
                      setSections(u);
                    }}
                  />

                  <textarea
                    className="lecture-textarea"
                    placeholder="Lecture description"
                    value={lec.description}
                    onChange={(e) => {
                      const u = [...sections];
                      u[i].lectures[j].description = e.target.value;
                      setSections(u);
                    }}
                  />

                  <input
                    type="file"
                    accept="video/*"
                    className="lecture-file"
                    onChange={(e) => {
                      const u = [...sections];
                      u[i].lectures[j].videoFile = e.target.files[0];
                      setSections(u);
                    }}
                  />

                  <div className="lecture-actions">
                    {!lec._id ? (
                      <button
                        className="btn btn-upload"
                        onClick={() => uploadLecture(i, j)}
                      >
                        Upload Lecture
                      </button>
                    ) : (
                      <button
                        className="btn btn-update"
                        onClick={() => updateLecture(i, j)}
                      >
                        Update Lecture
                      </button>
                    )}

                    <button
                      className="btn btn-delete"
                      onClick={() => deleteLecture(i, j)}
                    >
                      Delete Lecture
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button className="btn btn-add-lecture" onClick={() => addLecture(i)}>
            + Add Lecture
          </button>
        </div>
      ))}

      <button className="btn btn-add-section" onClick={addSection}>
        + Add Section
      </button>

      <button className="btn btn-next" onClick={() => dispatch(setStep(3))}>
        Next
      </button>
    </div>
  );
}

export default BuilderForm;
