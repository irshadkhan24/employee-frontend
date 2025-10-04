import axios from 'axios';
import { useNavigate } from "react-router-dom"

//Column Concepts
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
    //sortable: true,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    //sortable: true,
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
      center: "true"
  },
];

export const fetchDepartments = async () => {
    let departments
    try {
      const responnse = await axios.get('https://employee-api-41gx.vercel.app/api/department', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(responnse.data.success) {
        //console.log(responnse.data)
        departments = responnse.data.departments
      }
    } catch(error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } 
    return departments
  };

  // employees for salary form
  export const getEmployees = async (id) => {
    let employees;
    try {
      const responnse = await axios.get(`https://employee-api-41gx.vercel.app/api/employee/department/${id}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        },
      });
      console.log(responnse)
      if(responnse.data.success) {
        employees = responnse.data.employees;
      }
    } catch(error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } 
    return employees
  };


  // Button concepts
  export const EmployeeButtons = ({Id}) => {
      const navigate = useNavigate();

      return (
          <div className="flex space-x-3">
              <button 
              className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
              >View</button>
              <button 
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
              >Edit</button>
              <button className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white" 
              onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>Salary</button>
              <button className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leave</button>
          </div>
      )
  };