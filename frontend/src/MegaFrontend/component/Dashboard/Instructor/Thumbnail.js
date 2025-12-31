import React, { useEffect, useState } from "react";

function ThumbnailUpload({ label, value, onChange, disabled }) {
  const [preview, setPreview] = useState(null);

  /* ================= SYNC VALUE → PREVIEW ================= */
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    // Existing thumbnail URL (edit mode)
    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    // New file
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e) => {
    if (disabled) return;

    const file = e.target.files[0];
    if (!file) return;

    onChange?.(file); // ✅ notify parent ONLY here
  };

  /* ================= REMOVE THUMBNAIL ================= */
  const handleCancel = () => {
    if (disabled) return;
    onChange?.(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label>{label}</label>

      <div
        style={{
          width: "200px",
          height: "150px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Thumbnail Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#aaa" }}>Upload Thumbnail</span>
        )}

        {!disabled && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
        )}

        {preview && !disabled && (
          <button
            type="button"
            onClick={handleCancel}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default ThumbnailUpload;
