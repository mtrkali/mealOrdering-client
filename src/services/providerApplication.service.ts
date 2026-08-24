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

const approveProviderApplicaton = async (applicationId: string) => {
    const response = await axios.patch(
        `${API_URL}/beprovider`,
        { applicationId },
        {
            withCredentials: true
        }
    )
    return response.data;
}

export const providerApplicationService = {
    getAllProviderApplications,
    approveProviderApplicaton,

}