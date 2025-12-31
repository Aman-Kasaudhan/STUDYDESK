import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import RequireMent from "./RequireMent";
import TagInput from "./TagInput";
import ThumbnailUpload from "./Thumbnail";

import { setCourse, setStep } from "../../../slice/courseSlice";
import './CourseData.css';

import {showLoader,hideLoader} from '../../../slice/loaderSlice'
function CreateCourseForm() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const { course } = useSelector((state) => state.course)
  
  // Form state
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    category: "",
    tag: [],
    instruction: [],
    thumbnailImage: null,
  });
 
  // Saved form state for toggling edit/save
  const [savedForm, setSavedForm] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
 
  
  // Fetch categories once on mount
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/course/showCategory")
      .then(response => setCategories(response.data.allCategory || []))
      .catch(console.error);
  }, []);

  const normalizeArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};
 
//  console.log("FINAL INSTRUCTION:", savedForm.instruction);
// console.log("IS ARRAY:", Array.isArray(savedForm.instruction));
 
  useEffect(() => {

  if (course?._id) {
  
     
    setForm({
      courseName: course.courseName || "",
      courseDescription: course.courseDescription || "",
      whatYouWillLearn: course.whatYouWillLearn || "",
      price: course.price || "",
      category: course.category?._id  || "",

      tag: normalizeArray(course.tag),

      instruction: normalizeArray(course.instruction),

      thumbnailImage: course.thumbnailImage || null,
    });
    setSavedForm({
      ...course,
      tag: normalizeArray(course.tag),

      instruction: normalizeArray(course.instruction),

    thumbnailImage: course.thumbnailImage,
    });
    setIsSaved(true);   // so fields are locked initially

  }
}, [course]);
 
  // Form change handler - only allow changes if not saved
  function handleChange(e) {
    if (isSaved) return; // Prevent editing when saved
    const { name, value, type, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } 
    else if (name === "tag") {
      setForm({ ...form, tag: value.split(",") });
    } else if (name === "instructions") {
      setForm({ ...form, instructions: value.split(",") });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  // Save button toggles saving the form data locally
  function handleSave() {
    setSavedForm(form);
    setIsSaved(true);
    toast.success("Form saved successfully!");
  }

  // Edit button to allow editing again
  function handleEdit() {
  // if (savedForm) {
  //   setForm(savedForm);   // 🔥 restore saved data
  // }
  setIsSaved(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}


  // Next button submits saved form to backend and move step
  async function handleNext(e) {
    if (!isSaved) {
      toast.error("Please save the form before proceeding.");
      return;
    }
    if (!savedForm.category || typeof savedForm.category !== "string") {
  toast.error("Please select a valid category");
  dispatch(hideLoader());
  return;
}
    dispatch(showLoader());

    const allowedFields = [
  "courseName",
  "courseDescription",
  "whatYouWillLearn",
  "price",
  "category",
  "tag",
  "instruction",
  "thumbnailImage",
];
const formData = new FormData();

// primitives
formData.append("courseName", savedForm.courseName);
formData.append("courseDescription", savedForm.courseDescription);
formData.append("whatYouWillLearn", savedForm.whatYouWillLearn);
formData.append("price", savedForm.price);
 

// ALWAYS append category ID
formData.append("category", savedForm.category);

// console.log(a)
// 🔥 stringify ONLY ONCE
formData.append("tag", JSON.stringify(savedForm.tag));
formData.append("instruction", JSON.stringify(savedForm.instruction));

// file
if (savedForm.thumbnailImage instanceof File) {
  formData.append("thumbnailImage", savedForm.thumbnailImage);
}


// console.log(formData)
   try {
     
    let response;
    if (course?._id) {
      // Update existing course
      response = await axios.put(
        `http://localhost:4000/api/v1/course/updateCourse/${course?._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
    }
     else {
      // Create new course
      response = await axios.post(
        "http://localhost:4000/api/v1/course/createCourse",
        formData,
        { 
          headers:
           { Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
           } 
        }
      );
    }
    dispatch(setCourse(response.data.course));
    dispatch(setStep(2));
    toast.success("Course saved successfully!");
    // setIsSaved(true);
    // setSavedForm(form);
    dispatch(hideLoader());
  } catch (err) {
    toast.error(err.response?.data?.message || "Course creation failed");
  }
  finally{
    dispatch(hideLoader());
  }

  }

  return (
    <form>     
      {/* <GlobalLoader show={loading1} /> */}
      <div>
  
        <label>Course Name:</label>
        <input
          type="text"
          name="courseName"
          required
          onChange={handleChange}
          value={form.courseName}
          disabled={isSaved}
           
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="courseDescription"
          required
          onChange={handleChange}
          value={form.courseDescription}
          disabled={isSaved}
        />
      </div>
      <div>
        <label>What You Will Learn:</label>
        <input
          type="text"
          name="whatYouWillLearn"
          required
          onChange={handleChange}
          value={form.whatYouWillLearn}
          disabled={isSaved}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          required
          onChange={handleChange}
          value={form.price}
          disabled={isSaved}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          required
          onChange={handleChange}
          value={form.category}
          disabled={isSaved}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option value={cat._id} key={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <TagInput
          label="Tags"
          // onChange={(tags) => !isSaved && setForm({ ...form, tag: tags })}
          onChange={(tags) => {
  if (isSaved) return;
  setForm((prev) => ({ ...prev, tag: tags }));
}}
          required
          value={form.tag}
          name="tag"
          disabled={isSaved}
        />
      </div>
      <div>
        <RequireMent
          label="Requirements/Instruction"
          // onChange={instructions => !isSaved && setForm({ ...form, instruction: instructions })}
         onChange={(instructions) => {
    if (isSaved) return;
    setForm((prev) => ({
      ...prev,
      instruction: instructions,
    }));
  }}
          required
          value={form.instruction}
          name="instruction"
          disabled={isSaved}
        />

      </div>
      <div>
        <ThumbnailUpload
          label="Thumbnail Image"
          // onChange={(file) => !isSaved && setForm({ ...form, thumbnailImage: file })}
          onChange={(file) => {
    if (isSaved) return;
    setForm((prev) => ({
      ...prev,
      thumbnailImage: file,
    }));
  }}
          disabled={isSaved}
          value={form.thumbnailImage || course?.thumbnailImage}
          name="ThumbnailImage"
          

        />
      </div>

      {!isSaved ? (
        <button type="button" onClick={handleSave} className="buttonSave all">
          Save
        </button>
      ) : (
        <button type="button" onClick={handleEdit} className="buttonEdit all">
          Edit
        </button>
      )}
   

      <button 
      type="button" 
      onClick={handleNext} 
      disabled={!isSaved} 
      className="buttonNext all">
        Next
      </button>
   

    </form>
  );
}

export default CreateCourseForm;
