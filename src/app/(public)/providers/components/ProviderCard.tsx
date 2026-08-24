"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, Mail, MapPin, Phone, User } from "lucide-react";
import { Provider } from "@/types/provider";


interface Props {
    provider: Provider;
    index?: number;
}

export default function ProviderCard({ provider, index }: Props) {
    return (
        <div data-aos="zoom-in" data-aos-delay={index !== undefined ? index * 100 : undefined} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border bg-gray-100">
                    {provider.user.image ? (
                        <Image
                            src={provider.user.image}
                            alt={provider.user.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <User className="h-8 w-8 text-gray-400" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-bold">
                        {provider.businessName}
                    </h2>

                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <User size={16} />
                        {provider.user.name}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
            ${provider.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {provider.status}
                </span>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-600">

                <div className="flex gap-2">
                    <Building2 size={18} />
                    <span>{provider.user?.role}</span>
                </div>

                <div className="flex gap-2">
                    <Mail size={18} />
                    <span>{provider.user.email}</span>
                </div>

                <div className="flex gap-2">
                    <Phone size={18} />
                    <span>{provider.phone}</span>
                </div>

                <div className="flex gap-2">
                    <MapPin size={18} className="mt-0.5" />
                    <span>{provider.address}</span>
                </div>
            </div>

            <Link
                href={`/providers/${provider.id}`}
                className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-black text-white transition hover:bg-gray-800"
            >
                View Profile
            </Link>
        </div>
    );
}