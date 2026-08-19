import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type CreateOrderPayload = {
    address: string;
    items: {
        mealId: string;
        quantity: number;
    }[];
};

const createOrder = async (payload: CreateOrderPayload) => {
    const response = await axios.post(
        `${API_URL}/api/v1/orders`,
        payload,
        {
            withCredentials: true,
        }
    );
    return response.data;
}

export const orderService = {
    createOrder,
}