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

const getMyOrders = async () => {
    const response = await axios.get(
        `${API_URL}/api/v1/orders/me`,
        { withCredentials: true, }
    );
    return response.data;
}

const getMySingleOrder = async (orderId: string) => {
    const response = await axios.get(
        `${API_URL}/api/v1/orders/me/${orderId}`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

export const orderService = {
    createOrder,
    getMyOrders,
    getMySingleOrder,
}