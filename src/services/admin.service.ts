import axios from "axios"

const API_URL = "/api/v1"
const getDashBoardStats = async () => {
    const response = await axios.get(
        `${API_URL}/admin/dashboard-stats`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

export const adminService = {
    getDashBoardStats,
}