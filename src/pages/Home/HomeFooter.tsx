import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
} from "react-icons/fa"
export default function HomeFooter() {
    return (
        <footer data-aos="fade-left" className="bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Food<span className="text-orange-500">Hub</span>
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                            Discover delicious meals from trusted food
                            providers and enjoy an easy ordering experience.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition hover:bg-orange-500 hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition hover:bg-orange-500 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition hover:bg-orange-500 hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition hover:bg-orange-500 hover:text-white"
                            >
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Meals
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Categories
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Support
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Contact Us
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    Terms & Conditions
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-orange-500">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <p className="flex gap-3">
                                <MapPin
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                />
                                Feni, Bangladesh
                            </p>

                            <p className="flex gap-3">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                />
                                +880 1XXX-XXXXXX
                            </p>

                            <p className="flex gap-3">
                                <Mail
                                    size={18}
                                    className="shrink-0 text-orange-500"
                                />
                                support@foodhub.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} FoodHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}