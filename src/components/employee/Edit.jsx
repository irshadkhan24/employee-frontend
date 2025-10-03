import React, {useEffect, useState} from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: '',
    });
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(() => {
        const getDepartments = async () => {         //fetch data in departments
         const departments = await fetchDepartments();
         setDepartments(departments)
         }
         getDepartments();
     }, []);


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
              const responnse = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                headers: {
                  Authorization : `Bearer ${localStorage.getItem('token')}`
                },
              })
              //console.log(responnse.data)    // Show data in console
              if(responnse.data.success) {
                const employee = responnse.data.employee
                setEmployee((prev) => ({...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus,
                    designation: employee.designation, salary: employee.salary,
                    department: employee.department
                }));
                
              }
            } catch(error) {
              if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
              }
            } 
          };
          fetchEmployee();
    }, []);

    const handleChange = (e) => {                  //handleChange function
        const {name, value, files} = e.target;
        setEmployee((prevData) => ({...prevData, [name] : value}));
    };

    const handleSubmit = async (e) => {           //handleSubmit function
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }

    };


  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                <label className='block text-sm font-medium text-gray-700'>Name</label> 
                <input 
                    type='text' 
                    name='name' 
                    value={employee.name}
                    onChange={handleChange}
                    placeholder='Insert Name' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                {/* Material */}
                <div>
                <label className='block text-sm font-medium text-gray-700'>Marital Status</label> 
                <select
                    name='maritalStatus' 
                    onChange={handleChange}
                    value={employee.maritalStatus}
                    placeholder='Marital Status' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                    required >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>
                </div>
                {/* Designation */}
                <div>
                <label className='block text-sm font-medium text-gray-700'>Designation</label> 
                <input 
                    type='text' 
                    name='designation'
                    value={employee.designation}
                    onChange={handleChange} 
                    placeholder='Designation' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                {/* Salary */}
                <div>
                <label className='block text-sm font-medium text-gray-700'>Salary</label> 
                <input 
                    type='number' 
                    name='salary' 
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder='Salary' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                {/* Department */}
                <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700'>Department</label> 
                <select
                    name='department' 
                    onChange={handleChange}
                    value={employee.department}
                    //placeholder='' 
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' 
                    required >
                    <option value="">Select Department</option>
                    {departments.map(dep => (            //fetch data in departments
                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                    ))}
                </select>
                </div>
            </div>
            <button 
            type="submit"
            className="w-full mt-6 bg-[#0078D7] hover:bg-[#1985DB] text-white font-bold py-2 px-4 row">
                 Edit Employee
            </button>
        </form>
    </div>
    ) : <div>Loading...</div>}</>
  );
}

export default Edit;
