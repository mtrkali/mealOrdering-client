export default async function ProviderHero({ provider }: { provider: any }) {
    console.log("provider in ProviderHero", provider);

    return (
        <div className="relative">
            <div className="h-56 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500" />

            <div className="absolute -bottom-12 left-8 h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg ">
                <span className="text-black animate animate-pulse font-bold text-5xl flex items-center justify-center h-full w-full">
                    {provider?.user?.name?.charAt(0).toUpperCase()}
                </span>
            </div>

            <div className="mt-16 px-8">
                <h1 className="text-3xl font-bold text-red-500">
                    {provider?.businessName}
                </h1>

                <p className="text-gray-500">
                    {provider?.user?.email}
                </p>

                <span className="badge badge-success mt-3 bordet">
                    ACTIVE
                </span>
            </div>
        </div>
    )
}
