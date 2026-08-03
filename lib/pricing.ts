// Single source of truth for the per-ticket service fee added on top of the
// base zone price for a cash (non-installment) purchase.
//
// This value MUST stay identical to whatever CountryClient.tsx charges the
// user by default (isInstallment === false), because the same number feeds
// the Offer.price emitted in JSON-LD (app/[country]/page.tsx). Google's Event
// structured data guidelines require offers.price to be "the lowest available
// price ... including service charges and fees", and to be a true
// representation of what's shown on the page — so the visible total and the
// JSON-LD price must never diverge.
export const SERVICE_FEE_PER_TICKET: Record<string, number> = {
    peru: 0,
    chile: 50,
    argentina: 50,
    colombia: 50,
    mexico: 0,
    brasil: 0,
    madrid: 0,
};

export function getServiceFeePerTicket(countryId: string): number {
    return SERVICE_FEE_PER_TICKET[countryId] ?? 0;
}

// The total a buyer pays for a single ticket at `basePrice`, in cash (no
// installments) — base zone price plus the flat per-ticket service fee.
export function getZoneTotalPrice(countryId: string, basePrice: number): number {
    return basePrice + getServiceFeePerTicket(countryId);
}
