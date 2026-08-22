import axios from "axios";

const API_URL = "/api/v1";

type CreateOrderPayload = {
    address: string;
    items: {
        mealId: string;
        quantity: number;
    }[];
};


//============
//orders fuctions
//==========

const createOrder = async (payload: CreateOrderPayload) => {
    const response = await axios.post(
        `${API_URL}/orders`,
        payload,
        {
            withCredentials: true,
        }
    );
    return response.data;
}

const getMyOrders = async () => {
    const response = await axios.get(
        `${API_URL}/orders/me`,
        { withCredentials: true, }
    );
    return response.data;
}

const getMySingleOrder = async (orderId: string) => {
    console.log("getMySingleOrder is called ")
    const response = await axios.get(
        `${API_URL}/orders/me/${orderId}`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}


//============
//users fuctions
//==========

const getAllUsers = async () => {
    const response = await axios.get(
        `${API_URL}/users`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

const getSingleUser = async (userId: string) => {
    const response = await axios.get(
        `${API_URL}/users/${userId}`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

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
    )
    return response.data;
}

const deleteUser = async (userId: string) => {
    const response = await axios.delete(
        `${API_URL}/users/${userId}`,
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
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}