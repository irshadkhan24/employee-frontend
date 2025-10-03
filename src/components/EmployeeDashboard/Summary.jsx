import React from 'react'
import {FaUser} from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard = () => {
    const {user}   = useAuth()  // Display User name in Home screen
  return (
    <div className='p-6'>
    <div className="rounded flex bg-white shadow-md">
        <div className={"text-3xl flex justify-center items-center bg-[#0078D7] text-white px-4 py-2"}>
            <FaUser/>
        </div>
        <div className="pl-4 py-1">
            <p className="text-lg font-semibold">Welcom Back</p>
            <p className="text-xl font-bold">{user.name}</p>
        </div>
    </div>
    </div>
  )
}

export default SummaryCard
