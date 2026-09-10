import axios from "axios";

const API_URL = "/api/v1";

const getMyMeals = async () => {
    const response = await axios.get(
        `${API_URL}/meals/self`
    );

    return response.data;
};

const deleteMeal = async (mealId: string) => {
    const response = await axios.delete(
        `${API_URL}/meals/${mealId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const updateMeal = async (
    mealId: string,
    data: any
) => {
    const response = await axios.patch(
        `${API_URL}/meals/${mealId}`,
        data,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const createMeal = async (data: any) => {
    const response = await axios.post(
        `${API_URL}/meals`,
        data,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

const adminUpdateMeal = async (
    mealId: string,
    data: any
) => {
    const response = await axios.patch(
        `${API_URL}/meals/admin/${mealId}`,
        data,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const adminDeleteMeal = async (mealId: string) => {
    const response = await axios.delete(
        `${API_URL}/meals/admin/${mealId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const getAllMeals = async () => {
    const response = await axios.get(
        `${API_URL}/meals`
    );

    return response.data;
};
export const mealService = {
    getAllMeals,
    getMyMeals,
    deleteMeal,
    updateMeal,
    createMeal,
    adminUpdateMeal,
    adminDeleteMeal,
};