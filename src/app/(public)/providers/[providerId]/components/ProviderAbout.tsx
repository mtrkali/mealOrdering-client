import { Provider } from "@/types/provider";
import { Building2, CalendarDays, Mail, User } from "lucide-react";

interface Props {
    provider: Provider;
}

export default function ProviderAbout({ provider }: Props) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-stone-700">
                About Provider
            </h2>

            <div className="space-y-5">

                <div className="flex items-start gap-4">
                    <User className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-black">Owner</p>
                        <p className="font-medium text-stone-400">{provider?.user?.name}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-black">Email</p>
                        <p className="font-medium text-stone-400">{provider?.user?.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Building2 className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-black">Business</p>
                        <p className="font-medium text-stone-400">
                            {provider.businessName}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <CalendarDays className="mt-1 h-5 w-5 text-orange-500" />

                    <div>
                        <p className="text-sm text-black">Joined</p>
                        <p className="font-medium text-stone-400">
                            {new Date(provider.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}