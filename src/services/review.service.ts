import axios from "axios";

const API_URL = "/api/v1";

const createReview = async (data: {
    mealId: string;
    orderId: string;
    rating: number;
    comment: string;
}) => {
    const response = await axios.post(
        `${API_URL}/reviews`,
        data,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const getMealReviews = async (mealId: string) => {
    const response = await axios.get(
        `${API_URL}/reviews/meal/${mealId}`
    );

    return response.data;
};

const getMyReviews = async () => {
    const response = await axios.get(
        `${API_URL}/reviews/my`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const updateReview = async (
    reviewId: string,
    data: {
        rating?: number;
        comment?: string;
    }
) => {
    const response = await axios.patch(
        `${API_URL}/reviews/${reviewId}`,
        data,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const deleteReview = async (reviewId: string) => {
    const response = await axios.delete(
        `${API_URL}/reviews/${reviewId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const reviewService = {
    createReview,
    getMealReviews,
    getMyReviews,
    updateReview,
    deleteReview,
};