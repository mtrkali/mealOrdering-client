import ProviderGrid from "./components/ProviderGrid";

export default async function ProvidersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }
  const providers = await res.json();


  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Food Providers
        </h1>

        <p className="text-gray-500">
          Browse all registered food providers.
        </p>
      </div>

      <ProviderGrid providers={providers.data} />
    </section>
  );
}