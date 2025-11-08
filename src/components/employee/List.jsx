import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className='rounded-full'
                src={`${API_URL}/${emp.userId.profileImage}`} // ✅ fixed to use deployed base URL
                alt="Profile"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, [API_URL]);

  // ✅ Search filter by name
  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="px-4 py-1 border rounded-md"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-[#0078D7] hover:bg-[#1985DB] rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-6">
        {empLoading ? (
          <div>Loading employees...</div>
        ) : (
          <DataTable columns={columns} data={filteredEmployee} pagination />
        )}
      </div>
    </div>
  );
};

export default List;
