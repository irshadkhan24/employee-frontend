import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use environment variable for API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch all leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

          return {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days: daysDiff,
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          };
        });

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.error(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    fetchLeaves();
  }, []);

  // ✅ Search by Employee ID
  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(value)
    );
    setFilteredLeaves(data);
  };

  // ✅ Filter by status (Pending / Approved / Rejected)
  const filterByButton = (status) => {
    const data = leaves.filter(
      (leave) => leave.status.toLowerCase() === status.toLowerCase()
    );
    setFilteredLeaves(data);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by Emp Id"
          className="px-4 py-0.5 border"
          onChange={filterByInput}
        />
        <div className="space-x-3">
          <button
            className="px-2 py-1 bg-amber-500 text-white hover:bg-amber-600 shadow-md"
            onClick={() => filterByButton('Pending')}
          >
            Pending
          </button>
          <button
            className="px-2 py-1 bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"
            onClick={() => filterByButton('Approved')}
          >
            Approved
          </button>
          <button
            className="px-2 py-1 bg-rose-500 text-white hover:bg-rose-600 shadow-md"
            onClick={() => filterByButton('Rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={filteredLeaves} pagination />
        )}
      </div>
    </div>
  );
};

export default Table;
