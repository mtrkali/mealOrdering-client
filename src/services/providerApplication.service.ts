import axios from "axios";

const API_URL = "/api/v1";

const getAllProviderApplications = async () => {
    const response = await axios.get(
        `${API_URL}/beprovider`,
        {
            withCredentials: true,
        }
    )
    return response.data;
}

export const providerApplicationService = {
    getAllProviderApplications,

}