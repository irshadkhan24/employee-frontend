import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaTachometerAlt, FaUsers, FaCalendarAlt, FaMoneyBillWave, FaCogs, FaRegCalendarAlt} from 'react-icons/fa'
import {AiOutlineFileText} from 'react-icons/ai';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
        <div className='bg-[#0078D7] h-12 flex items-center justify-center'>
            {/*<h3 className='text-2x1 text-center font-pacific'>Employee MS</h3>*/}
        </div>
        <div className='px-4 space-y-2'>
        <NavLink 
          to="/admin-dashboard"
          className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
            <NavLink to="/admin-dashboard/employees"
               className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `}>
                <FaUsers />
                <span>Employee</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments"
                className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `} end>
                <FaBuilding />
                <span>Department</span>
            </NavLink>
            <NavLink to="/admin-dashboard/leaves"
                className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `}>
                <FaCalendarAlt />
                <span>Leave</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary/add"      //Link concepts Salary clicking
                className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `} end>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
               <NavLink to={`/admin-dashboard/attendance`}
                            className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `}>
                            <FaRegCalendarAlt />
                            <span>Attendance</span>
                        </NavLink>
                         <NavLink to={`/admin-dashboard/attendance-report`}
                            className={({ isActive }) => `${isActive ? "bg-[#0078D7]" : " "} flex items-center space-x-4  py-2.5 px-4 rounded `}>
                            <AiOutlineFileText />
                            <span>Attendance Report</span>
                        </NavLink>
            <NavLink to="/admin-dashboard/setting"
                className="flex items-center space-x-4  py-2.5 px-4 rounded">
                <FaCogs />
                <span>Setting</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar
