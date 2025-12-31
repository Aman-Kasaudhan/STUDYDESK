import { removeFromCart } from "../../../slice/cartSlice";

import "./CartItem.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CartItems() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate=useNavigate();
     const {totalItems}=useSelector( (state)=>state.cart)
const dispatch=useDispatch();
  // Load cart data on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const savedTotal = savedCart.reduce((sum, c) => sum + c.price, 0);
    setTotal(savedTotal);
  }, []);

  // ✅ Remove a specific course
  const handleRemove = (id) => {
    const updatedCart = cart.filter((course) => course._id !== id);
    setCart(updatedCart);
    const newTotal = updatedCart.reduce((sum, c) => sum + c.price, 0);
    setTotal(newTotal);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("total", JSON.stringify(newTotal));
    // localStorage.setItem("totalItems", JSON.stringify(cart.length));
    dispatch(removeFromCart(id));
    toast.success("Course removed from cart!");
    // Optional: refresh page
    // window.location.reload();
  };

  // ✅ Checkout a single course
  const handleSingleCheckout = (course) => {
    toast.info(`Proceeding to checkout for: ${course.courseName} course`);
    // Here you can redirect to checkout page
         navigate(`/single-payment/${course._id}`)
  };

  // ✅ Checkout all courses in the cart
  const handleAllCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success(`Proceeding to checkout for ${cart.length} course(s)!`);
     navigate("/all-payment")
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">My Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          {cart.map((course) => (
            <div key={course._id} className="cart-card">
              <div className="cart-thumbnail">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="cart-image"
                />
              </div>

              <div className="cart-details">
                <h3>Course Name: {course.courseName}</h3>
                <p className="cart-desc">
                 <strong>Category : </strong> {course?.category?.name }
                </p>
                <p>
                  <strong>Instructor:</strong>{" "}
                  {typeof course.instructor === "object"
                    ? `${course.instructor.firstName} ${course.instructor.lastName}`
                    : course.instructor || "N/A"}
                </p>
                <p className="price">₹{course.price}</p>

                <div className="cart-actions">
                  <button
                    className="checkout-btn"
                    onClick={() => handleSingleCheckout(course)}
                  >
                    Checkout
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(course._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Checkout all courses at once */}
          <div className="cart-summary">
            <h3 className="totalValue">Total cart price : ₹{total}</h3>
            <button className="checkout-all-btn" onClick={handleAllCheckout}>
              Checkout All Courses
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItems;
