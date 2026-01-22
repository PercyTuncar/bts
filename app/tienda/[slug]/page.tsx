import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Metadata } from "next";
import { products } from "@/lib/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) return { title: 'Producto no encontrado' };

    return {
        title: `${product.name} | Tienda Oficial BTS`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        }
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": `https://entradasbts.com${product.image}`,
        "description": product.description,
        "brand": { "@type": "Brand", "name": "BTS Official Merch" },
        "offers": {
            "@type": "Offer",
            "price": product.price.toString(),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": `https://entradasbts.com/tienda/${product.slug}`
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toString(),
            "reviewCount": product.reviewCount.toString()
        }
    };

    return (
        <div className="py-20 container mx-auto px-4 text-slate-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mb-8">
                <Link href="/tienda" className="text-slate-500 hover:text-slate-900 transition-colors uppercase text-xs font-bold tracking-widest">
                    ← Volver a la Tienda
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 relative overflow-hidden group">
                        {/* Placeholder for now if image fails, but ideally Image comp */}
                        <div className="text-9xl group-hover:scale-110 transition-transform duration-500 select-none">
                            {product.category === 'Light Stick' ? '💣' : '👕'}
                        </div>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 leading-none text-slate-900">{product.name}</h1>
                        <p className="text-xl text-primary font-serif italic">{product.category}</p>
                        <div className="flex items-center gap-2 mt-4 text-secondary">
                            ★★★★★ <span className="text-slate-400 text-sm">({product.reviewCount} Reviews)</span>
                        </div>
                    </div>

                    <div className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</div>

                    <GlassCard className="space-y-6 bg-slate-50/50 border-slate-200">
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                        <ul className="list-disc list-inside text-slate-500 space-y-2 font-medium">
                            {product.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </GlassCard>

                    <div className="flex gap-4 sticky bottom-4 z-50 md:static">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}
