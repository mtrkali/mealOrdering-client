import axios from "axios";

const API_URL = "/api/v1";

const getAllProviders = async () => {
    const response = await axios.get(
        `${API_URL}/providers`
    );

    return response.data;
};

const getSingleProvider = async (providerId: string) => {
    const response = await axios.get(
        `${API_URL}/providers/${providerId}`
    );

    return response.data;
};

const getProviderMeals = async (providerId: string) => {
    const response = await axios.get(
        `${API_URL}/providers/${providerId}/meals`
    );

    return response.data;
};

const updateProviderStatus = async (providerId: string, status: string) => {
    const response = await axios.patch(
        `${API_URL}/providers/${providerId}`,
        { status },
        {
            withCredentials: true,
        }
    )
    return response.data;
}

export const providerService = {
    getAllProviders,
    getSingleProvider,
    getProviderMeals,
    updateProviderStatus
};