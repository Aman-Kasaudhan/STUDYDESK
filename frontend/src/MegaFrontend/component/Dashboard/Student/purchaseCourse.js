import React, { useEffect, useState } from "react";
import axios from "axios";

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:4000/api/v1/course/purchase",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (loading) {
    return <h3>Loading purchase history...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 Purchase History</h2>

      {history.length === 0 ? (
        <p>No purchases found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          width="100%"
          style={{ marginTop: "15px" }}
        >
          <thead>
            <tr>
              <th>Course</th>
              <th>Price (₹)</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.courseName}</td>
                <td>{item.price}</td>
                <td>
                  {new Date(item.purchasedAt).toLocaleDateString("en-IN")}
                </td>
                <td>
                  {new Date(item.purchasedAt).toLocaleTimeString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchaseHistory;
