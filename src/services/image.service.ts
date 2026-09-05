import axios from "axios";

const uploadImageToImgBB = async (image: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) throw new Error("ImgBB API key is not confilgured.");

    const formData = new FormData();

    formData.append("key", apiKey);
    formData.append("image", image);

    const response = await axios.post("https://api.imgbb.com/1/upload",
        formData
    )
    return response.data.data.url;
}


export const imageService = {
    uploadImageToImgBB,
}