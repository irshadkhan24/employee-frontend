import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredAttendance, setFiltereAttendance] = useState([])

  const statusChange = () => {
    fetchAttendance();
  }

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange = {statusChange} />,
        }));
        setAttendance(data);
        setFiltereAttendance(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  //search any name and show in screen concepts
  const handleFilter = (e) => {
    const records = attendance.filter((emp) => (
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFiltereAttendance(records)
  }
  if (!filteredAttendance) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Attendance</h3>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <input type="text" placeholder='Search by Dep Name'
          className='px-4 py-0.5 border'
          onChange={handleFilter}
        />
        <p className='text-2xl'>
          Mark Employees for <span className='font-bold underline'> {new Date().toISOString().split("T")[0]}{" "} </span>
        </p>
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-[#0078D7] hover:bg-[#1985DB] rounded text-white'>
          Attendance Report</Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>
  )
}

export default Attendance