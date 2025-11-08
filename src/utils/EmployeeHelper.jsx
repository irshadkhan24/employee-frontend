import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Column Concepts
export const columns = [
  {
      name: "S No",
      selector: (row) => row.sno,
      width: "80px"
  },
  {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "120px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
      name: "Action",
      selector: (row) => row.action,
      center: true
  },
];

// fetch departments
export const fetchDepartments = async () => {
    let departments;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.data.success) {
        departments = response.data.departments;
      }
    } catch(error) {
      console.error(error);
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } 
    return departments;
};

// employees for salary form
export const getEmployees = async (id) => {
    let employees;
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee/department/${id}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        },
      });
      if(response.data.success) {
        employees = response.data.employees;
      }
    } catch(error) {
      console.error(error);
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } 
    return employees;
};

// Employee Buttons
export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button 
              className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
              View
            </button>
            <button 
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >
              Edit
            </button>
            <button className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white" 
              onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
              Salary
            </button>
            <button className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >
              Leave
            </button>
        </div>
    )
};
