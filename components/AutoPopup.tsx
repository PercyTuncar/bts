"use client";

import { useEffect, useState } from "react";
import { CommunityModal } from "./CommunityModal";

type AutoPopupProps = {
    userCountryCode?: string;
};

export function AutoPopup({ userCountryCode }: AutoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            if (openCount < 2) {
                setIsOpen(true);
                setOpenCount((count) => count + 1);
            }
        }, 2000);

        const reOpenTimer = setTimeout(() => {
            if (openCount < 2) {
                setIsOpen(true);
                setOpenCount((count) => count + 1);
            }
        }, 15000);

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(reOpenTimer);
        };
    }, [openCount]);

    return (
        <CommunityModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            userCountryCode={userCountryCode}
        />
    );
}
