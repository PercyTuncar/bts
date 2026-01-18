import { Metadata } from "next";
import { countries } from "@/lib/data/countries";
import { notFound } from "next/navigation";
import CountryClient from "./CountryClient";

type Props = {
    params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countryId } = await params;
    const country = countries.find(c => c.id === countryId);

    if (!country) return { title: 'País no encontrado' };

    return {
        title: `Entradas BTS ${country.name} 2026 | Venta Oficial`,
        description: `Compra tus entradas para BTS en ${country.name} 2026. ${country.venue}.`,
    };
}

export default async function CountryPage({ params }: Props) {
    const { country: countryId } = await params;
    const country = countries.find(c => c.id === countryId);

    if (!country) {
        return notFound();
    }

    return <CountryClient country={country} />;
}

export async function generateStaticParams() {
    return countries.map((country) => ({
        country: country.id,
    }));
}
