import axios from "axios";

const API_URL = "/api/v1";

const getMyMeals = async () => {
    const response = await axios.get(
        `${API_URL}/meals/self`
    );

    return response.data;
};

export const mealService = {
    getMyMeals,
};