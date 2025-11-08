import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  let sno = 1;

  // ✅ Use Environment Variable (Backend API Base URL)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // ✅ Fetch All Leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leave/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error(error);
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []); // ✅ Run once on load

  if (!leaves) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* 🔹 Header Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      {/* 🔹 Search & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Leave Type"
          className="px-4 py-1 border rounded"
          // Optional search filter
          // onChange={handleFilter}
        />

        {/* ✅ Show Add Button only for Employees */}
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-[#0078D7] hover:bg-[#1985DB] rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>

      {/* 🔹 Table Section */}
      <table className="w-full text-sm text-left text-gray-500 mt-6 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3">S.No</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Reason</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className="bg-white border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td
                className={`px-6 py-3 font-semibold ${
                  leave.status === "Approved"
                    ? "text-green-600"
                    : leave.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
