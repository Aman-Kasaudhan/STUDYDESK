
import React, { useEffect, useState } from "react";

function RequireMent({ label, value = [], onChange, disabled }) {
  const [items, setItems] = useState([]);

  // sync parent → local (ONLY)
  useEffect(() => {
    if (Array.isArray(value)) {
      setItems(value);
    }
  }, [JSON.stringify(value)]);

  const addItem = (e) => {
    if (disabled) return;
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newItems = [...items, e.target.value.trim()];
      setItems(newItems);
      onChange?.(newItems); // ✅ ARRAY ONLY
      e.target.value = "";
    }
  };

  const removeItem = (index) => {
    if (disabled) return;
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems); // ✅ ARRAY ONLY
  };

  return (
    <div>
      <label>{label}</label>

      <div style={{ border: "1px solid #ccc", padding: "8px" ,margin:"3px"}}>
        {items.map((item, i) => (
          <div key={i}>
            {item}
            {!disabled && (
              <button type="button" onClick={() => removeItem(i)} style={{margin:"4px"}}>×</button>
            )}
          </div>
        ))}

        {!disabled && (
          <input
            type="text"
            placeholder="Press Enter"
            onKeyDown={addItem}
          />
        )}
      </div>
    </div>
  );
}

export default RequireMent;
