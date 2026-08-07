"use client";

import { usePathname } from "next/navigation";
import { AutoPopup } from "./AutoPopup";
import { BlogPromoPopup } from "./BlogPromoPopup";

type Props = {
    userCountryCode?: string;
};

export function PopupManager({ userCountryCode }: Props) {
    const pathname = usePathname();
    const isBlog = pathname?.startsWith('/blog');
    const isEventos = pathname === '/eventos' || pathname === '/eventos/';

    if (isBlog) {
        return <BlogPromoPopup />;
    }

    if (isEventos) {
        return null;
    }

    return (
        <>
            <AutoPopup userCountryCode={userCountryCode} />
        </>
    );
}
