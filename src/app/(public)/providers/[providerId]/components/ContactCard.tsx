import {
    Mail,
    MapPin,
    Phone,
    CircleCheckBig,
} from "lucide-react";

import { Provider } from "@/types/provider";

interface Props {
    provider: Provider;
}

export default function ContactCard({ provider }: Props) {
    return (
        <aside className="rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-6 text-xl font-semibold text-stone-700">
                Contact Information
            </h2>

            <div className="space-y-5">
                {/* Phone */}
                <div className="flex gap-4">
                    <Phone className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-gray-800">Phone</p>
                        <p className="font-medium text-stone-400">{provider.phone}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                    <Mail className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-gray-800">Email</p>
                        <p className="font-medium text-stone-400 break-all">
                            {provider?.user?.email}
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                    <MapPin className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-gray-800">Address</p>
                        <p className="font-medium text-stone-400">
                            {provider.address}
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div className="flex gap-4">
                    <CircleCheckBig className="mt-1 h-5 w-5 text-green-600" />

                    <div>
                        <p className="text-sm text-gray-800">Status</p>

                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium text-stone-400 ${provider.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {provider.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t pt-6">
                <button className="w-full rounded-xl bg-orange-500 py-3 font-medium text-white transition hover:bg-orange-600">
                    Contact Provider
                </button>
            </div>
        </aside>
    );
}