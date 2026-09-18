import axios from "axios";

const API_URL = "/api/v1";

const getAllCategories = async () => {
    const response = await axios.get(
        `${API_URL}/category`
    );

    return response.data;
};

const getSingleCategory = async (categoryId: string) => {
    const response = await axios.get(
        `${API_URL}/category/${categoryId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const createCategory = async (name: string) => {
    const response = await axios.post(
        `${API_URL}/category`,
        { name },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const updateCategory = async (
    categoryId: string,
    name: string
) => {
    const response = await axios.patch(
        `${API_URL}/category/${categoryId}`,
        { name },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const deleteCategory = async (categoryId: string) => {
    const response = await axios.delete(
        `${API_URL}/category/${categoryId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const categoryService = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};