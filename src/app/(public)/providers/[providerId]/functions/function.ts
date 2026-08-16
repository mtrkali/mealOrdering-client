// const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers/${providerId}`, {
        // cache: "no-store",
// });
// if (!res.ok) {
    // throw new Error("Failed to fetch provider");
// }
// const provider = await res.json();

export const getProviderData = async (providerId: string, meals: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers/${meals? providerId + '/meals' : providerId}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch provider");
    }
    const data = await res.json();
    return data;
};