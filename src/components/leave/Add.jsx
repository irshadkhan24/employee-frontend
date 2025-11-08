import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const { user } = useAuth();

  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const navigate = useNavigate();

  // ✅ Use environment variable for API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert("Leave request submitted successfully!");
        // Reset form after success
        setLeave({
          userId: user._id,
          leaveType: "",
          startDate: "",
          endDate: "",
          reason: "",
        });
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              placeholder="Reason for leave"
              className="w-full border border-gray-300 rounded-md mt-1 p-2"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#F59E0B] hover:bg-[#F6A723] text-white font-bold py-2 px-4 rounded-md"
        >
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
