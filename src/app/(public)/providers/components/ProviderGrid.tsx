import { Provider } from "@/types/provider";
import ProviderCard from "./ProviderCard";

interface Props {
    providers: Provider[];

}

export default function ProviderGrid({ providers }: Props) {
    return (
        <div
            className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-3
      "
        >
            {providers.map((provider, index) => (
                <ProviderCard
                    key={provider.id}
                    provider={provider}
                    index={index}
                />
            ))}
        </div>
    );
}