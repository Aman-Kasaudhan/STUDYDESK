import React from "react";

export default function LectureEditForm({
  lectureForm,
  onChange,
  onFileChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="lecture-edit-box">

      <input
        name="title"
        placeholder="Lecture Title"
        value={lectureForm.title}
        onChange={onChange}
      />

      <input
        name="timeDuration"
        placeholder="Duration"
        value={lectureForm.timeDuration}
        onChange={onChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={lectureForm.description}
        onChange={onChange}
      />

      {/* SHOW PREVIOUS VIDEO */}
      {lectureForm.videourl && !lectureForm.videoPreview && (
  <video
    src={lectureForm.videourl}
    controls
    width="100%"
    style={{ marginBottom: "10px", borderRadius: "8px" }}
  />
)}

{lectureForm.videoPreview && (
  <video
    src={lectureForm.videoPreview}
    controls
    width="100%"
    style={{ marginBottom: "10px", borderRadius: "8px" }}
  />
)}


      <input type="file" accept="video/*" onChange={onFileChange} />

      <div>
        <button onClick={onSave}>Save Lecture</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
