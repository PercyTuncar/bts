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
        title: `Entradas BTS ${country.name}`,
        description: `Entradas BTS en ${country.name}. Fecha confirmada: ${country.dates[0]}. Precios, zonas y entradas garantizadas para el concierto en ${country.venue}. ¡Asegura tu lugar con RaveHub!`,
        openGraph: {
            title: `Entradas BTS ${country.name}`,
            description: `¡El Army llega a ${country.name}! Compra segura y verificada para el concierto en ${country.venue}.`,
            url: `https://entradasbts.com/${country.id}`,
            siteName: 'Entradas BTS Tour 2026',
            images: [
                {
                    url: `https://entradasbts.com${country.openGraphImage}`,
                    width: 1200,
                    height: 630,
                    alt: `Entradas Concierto BTS ${country.name} 2026`
                },
            ],
            locale: 'es_LA',
            type: 'website',
        },
        alternates: {
            canonical: `https://entradasbts.com/${country.id}/`,
        }
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
