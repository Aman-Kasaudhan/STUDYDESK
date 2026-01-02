import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
import { useNavigate } from "react-router-dom";
function CreateCategory() {
  const token = useSelector((state) => state.auth.token);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
const dispatch=useDispatch()
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      toast.warn("All fields are required");
      return;
    }

    try {
dispatch(showLoader())
setLoading(true)
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/course/createCategory`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category created successfully");
      setName("");
      setDescription("");
      navigate("/admin/dashboard")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create category"
      );
    } finally {
      dispatch(hideLoader())
      setLoading(false)
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px" }}>
      <h2>Create Category</h2>

      <form onSubmit={handleCreateCategory}>
        <div style={{ marginBottom: "15px" }}>
          <label>Category Name</label>
          <input
            type="text"
            placeholder="e.g. C++, Java, Web Development"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            placeholder="Category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
