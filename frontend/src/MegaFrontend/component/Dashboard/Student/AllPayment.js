import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoader,hideLoader } from "../../../slice/loaderSlice";
// Payment page for ALL courses in cart (same style as SinglePayment)
export default function CartPayment() {
  const [cart, setCart] = useState([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const token=useSelector((state)=>state.auth.token);
  const {user}=useSelector((state)=>state.profile);
  const dispatch=useDispatch()
  const VALID_CODES = ["FREE-COURSE", "DISCOUNT-100%", "ALL-FREE"];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
// console.log(cart)


  async function handlePayAll  () {
    if (!code.trim()) return toast.error("Please enter a payment code");
    const isValid = VALID_CODES.includes(code.trim().toUpperCase());
    if (!isValid) return toast.error("Invalid payment code.");

    if (cart.length === 0) return toast.error("Your cart is empty.");

    setLoading(true);

try {
  dispatch(showLoader());

  await axios.post(
   `${process.env.REACT_APP_BASE_URL}/course/enrollMultipleCourseStudent`,
    {
      courseIds: cart.map((c) => c._id),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("Courses enrolled successfully");
} catch (error) {
  toast.error(error.response?.data?.message );
  dispatch(hideLoader());

  return;
} 
finally {
  dispatch(hideLoader());
}




    try{
    await axios.post(
  `${process.env.REACT_APP_BASE_URL}/course/enroll-multiple`,
  { courseIds: cart.map((c) => c._id),
    userId:user?._id
   },   // array
  {
    headers: {
      Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data"

    },
  }
);
    }
    catch (err) {
            console.error("Error adding course:", err);
            toast.error("Unable to add course in enrolled dection");
            setLoading(false);
            return;
          }

    setTimeout(() => {
      setLoading(false);

      const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];

      const purchasedItems = cart.map((c) => ({
        ...c,
        purchasedAt: new Date().toISOString(),
      }));

      localStorage.setItem(
        "purchasedCourses",
        JSON.stringify([...purchasedCourses, ...purchasedItems])
      );

      // Clear cart
      localStorage.removeItem("cart");
      localStorage.removeItem("totalItems");
      localStorage.removeItem("total");

      toast.success(`Payment b successful for ${cart.length} courses!`);
      setTimeout(() => navigate("/dashboard/enrolled-courses"), 1200);
    }, 1000);
  };

  return (
    <div
      style={{
        maxWidth: 750,
        margin: "40px auto",
        padding: 20,
        background: "#f5f7fb",
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Checkout - All Courses</h2>

      {cart.length === 0 ? (
        <div style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
          Your cart is empty.
        </div>
      ) : (
        <>
          {cart.map((course) => (
            <div
              key={course._id}
              style={{
                background: "white",
                padding: 14,
                borderRadius: 10,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <img
                src={course.thumbnail || "https://via.placeholder.com/100x70?text=Course"}
                alt={course.courseName}
                style={{ width: 120, height: 70, borderRadius: 8, objectFit: "cover" }}
              />

              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{course.courseName}</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>
                  {course.instructor?.firstName || "Instructor"}
                </div>
              </div>

              <div style={{ fontWeight: 700 }}>₹{course.price}</div>
            </div>
          ))}

          <input
            type="text"
            placeholder="Enter payment code (FREE-COURSE)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              width: "100%",
              marginTop: 16,
              marginBottom: 12,
            }}
          />

          <button
            onClick={handlePayAll}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 20px",
              cursor: "pointer",
              width: "100%",
              fontSize: 16,
            }}
          >
            {loading ? "Processing..." : `Pay for ${cart.length} Course(s)`}
          </button>

          <div style={{ marginTop: 20, fontSize: 13, color: "#94a3b8" }}>
            Valid demo codes: <strong>{VALID_CODES.join(", ")}</strong>
          </div>
        </>
      )}
    </div>
  );
}