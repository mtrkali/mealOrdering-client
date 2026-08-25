import axios from "axios";

const API_URL = "/api/v1";

const getAllCategories = async () => {
    const response = await axios.get(
        `${API_URL}/category`
    );

    return response.data;
};

export const categoryService = {
    getAllCategories,
};