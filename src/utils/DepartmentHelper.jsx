import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/department/${id}`, // ✅ use env variable
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );

            if (response.data.success) {
                onDepartmentDelete(); // refresh list
            }
        } catch (error) {
            console.error("Delete error:", error);
            if (error.response && error.response.data && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleDelete(Id)}
            >
                Delete
            </button>
        </div>
    );
};
