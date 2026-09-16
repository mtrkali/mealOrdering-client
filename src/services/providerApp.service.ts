import axios from "axios";

const API_URL = "/api/v1";

const createProviderApplication = async (data: {
    businessName: string;
    phone: string;
    address: string;
}) => {
    const response = await axios.post(
        `${API_URL}/beprovider`,
        data,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

const getMyProviderApplication = async () => {
    const response = await axios.get(
        `${API_URL}/beprovider/me`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const providerAppService = {
    createProviderApplication,
    getMyProviderApplication,
};