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

export const mealService = {
    getMyMeals,
    deleteMeal,
};