
import RegisterForm from "./components/register-form";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden bg-green-600 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-green-600">
                                    F
                                </div>

                                <span className="text-2xl font-bold">FoodHub</span>
                            </div>

                            <div className="mt-20">
                                <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
                                    Join FoodHub
                                    <br />
                                    today.
                                </h1>

                                <p className="mt-6 max-w-md text-base leading-7 text-green-50">
                                    Create your account and discover delicious meals from
                                    different food providers.
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-green-100">
                            © {new Date().getFullYear()} FoodHub. All rights reserved.
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-14">
                        <div className="w-full max-w-md">

                            {/* Mobile Logo */}
                            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
                                    F
                                </div>

                                <span className="text-2xl font-bold text-gray-900">
                                    FoodHub
                                </span>
                            </div>

                            <div className="mb-8 text-center lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Join FoodHub and start ordering delicious meals.
                                </p>
                            </div>

                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

