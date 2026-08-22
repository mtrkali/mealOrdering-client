import axios from "axios";

const API_URL = "/api/v1";

const getAllUsers = async () => {
    const response = await axios.get(
        `${API_URL}/users`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const getSingleUser = async (userId: string) => {
    const response = await axios.get(
        `${API_URL}/users/${userId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const updateUser = async (
    userId: string,
    updateData: {
        status?: string;
        role?: string;
        name?: string;
        phone?: string;
    }
) => {
    const response = await axios.patch(
        `${API_URL}/users/${userId}`,
        updateData,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const deleteUser = async (userId: string) => {
    const response = await axios.delete(
        `${API_URL}/users/${userId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};