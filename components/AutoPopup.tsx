"use client";

import { useEffect, useState } from "react";
import { CommunityModal } from "./CommunityModal";

type AutoPopupProps = {
    userCountryCode?: string;
};

export function AutoPopup({ userCountryCode }: AutoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpened) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [hasOpened]);

    return (
        <CommunityModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            userCountryCode={userCountryCode}
        />
    );
}
