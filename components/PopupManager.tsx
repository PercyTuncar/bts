"use client";

import { usePathname } from "next/navigation";
import { AutoPopup } from "./AutoPopup";
import { BlogPromoPopup } from "./BlogPromoPopup";
import { countries } from "@/lib/data/countries";

type Props = {
    userCountryCode?: string;
};

export function PopupManager({ userCountryCode }: Props) {
    const pathname = usePathname();
    const isBlog = pathname?.startsWith('/blog');

    // Find country name if code matches one of our event countries
    const targetCountry = countries.find(c => c.isoCode === userCountryCode);
    
    if (isBlog) {
        return <BlogPromoPopup />;
    }

    return (
        <>
            <AutoPopup />
        </>
    );
}
