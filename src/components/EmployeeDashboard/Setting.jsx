import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import axios from "axios";
import { Eye, EyeOff } from 'lucide-react'; // If you're using lucide-react (you can replace with any icon lib)

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    //const [showConfirm, setShowConfirm] = useState(false);
    
    const API_URL = import.meta.env.VITE_API_URL; // 👈 Add this line for api not locally

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not matched");
        } else {
            try {
                const response = await axios.put(`${API_URL}/api/setting/change-password`, setting, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div className="relative mb-4">
                    <label className="text-sm font-medium text-gray-700">Old Password</label>
                    <input
                        type={showOld ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Old Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md pr-10"
                        required
                    />
                    <span
                        onClick={() => setShowOld(!showOld)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    >
                        {showOld ? <EyeOff size={26} /> : <Eye size={26} />}
                    </span>
                </div>

                {/* New Password */}
                <div className="relative mb-4">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md pr-10"
                        required
                    />
                    <span
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    >
                        {showNew ? <EyeOff size={26} /> : <Eye size={26} />}
                    </span>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        /* type={showConfirm ? "text" : "password"} */
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md pr-10"
                        required
                    />
                    { /*
                    <span
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span> */}
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-[#0078D7] hover:bg-[#1985DB] text-white font-bold py-2 px-4 rounded-md shadow-md"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Setting;
