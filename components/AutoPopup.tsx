"use client";

import { useEffect, useRef, useState } from "react";
import { CommunityModal } from "./CommunityModal";

type AutoPopupProps = {
    userCountryCode?: string;
};

export function AutoPopup({ userCountryCode }: AutoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen || openCount >= 1) {
            return;
        }

        const initialTimer = setTimeout(() => {
            setIsOpen(true);
            setOpenCount(1);
        }, 2000);

        return () => clearTimeout(initialTimer);
    }, [isOpen, openCount]);

    useEffect(() => {
        if (wasOpenRef.current && !isOpen && openCount === 1) {
            const reOpenTimer = setTimeout(() => {
                setIsOpen(true);
                setOpenCount(2);
            }, 15000);

            return () => clearTimeout(reOpenTimer);
        }

        wasOpenRef.current = isOpen;
    }, [isOpen, openCount]);

    return (
        <CommunityModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            userCountryCode={userCountryCode}
        />
    );
}
