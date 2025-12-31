import React, { useState, useEffect } from "react";

function TagInput({ label, value = [], onChange, disabled }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // sync parent → local ONLY
  useEffect(() => {
    if (Array.isArray(value)) {
      setTags(value);
    }
  }, [JSON.stringify(value)]);

  const handleKeyDown = (e) => {
    if (disabled) return;

    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();

      if (tags.includes(inputValue.trim())) return;

      const updatedTags = [...tags, inputValue.trim()];
      setTags(updatedTags);
      onChange?.(updatedTags); // ✅ send array only
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    if (disabled) return;
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange?.(updatedTags); // ✅ FIX
  };

  return (
    <div>
      <label>{label}</label>

      <div style={{ border: "1px solid #ccc", padding: "8px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                background: "yellow",
                padding: "6px 10px",
                borderRadius: "6px",
              }}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  style={{ marginLeft: "6px" }}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {!disabled && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter"
          />
        )}
      </div>
    </div>
  );
}

export default TagInput;
