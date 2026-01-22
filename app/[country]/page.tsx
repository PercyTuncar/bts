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

    const minPrice = Math.min(...country.prices.map(p => p.price));
    const formattedPrice = country.currencySymbol + minPrice;

    // Localization for Mexico ("Boletos" vs "Entradas")
    const ticketKeyword = country.id === 'mexico' ? 'Boletos' : 'Entradas';
    const buyAction = country.id === 'mexico' ? 'Compra tus boletos' : 'Compra tus entradas';

    return {
        title: `${ticketKeyword} BTS ${country.name} 2026 | Desde ${formattedPrice}`,
        description: `¡${buyAction} para BTS en ${country.name} 2026! Precios desde ${formattedPrice} en ${country.venue}. Compra segura, zonas VIP y mapa del escenario aquí.`,
        openGraph: {
            title: `${ticketKeyword} BTS ${country.name} 2026`,
            description: `¡El Army llega a ${country.name}! Compra segura y verificada para el concierto en ${country.venue}.`,
            url: `https://entradasbts.com/${country.id}`,
            siteName: `${ticketKeyword} BTS Tour 2026`,
            images: [
                {
                    url: `https://entradasbts.com${country.openGraphImage}`,
                    width: 1200,
                    height: 630,
                    alt: `${ticketKeyword} Concierto BTS ${country.name} 2026`
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
