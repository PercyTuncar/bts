import JoinClient from "./JoinClient";
import { headers } from "next/headers";

export const metadata = {
    title: 'Paso 1: Verificación de Usuario | BTS World Tour 2026',
    description: 'Paso requerido para acceder a la pasarela de pago. Únete al grupo oficial.',
};

export default async function JoinPage() {
    const headersList = await headers();
    const userCountryCode = headersList.get('x-user-country') || undefined;

    return <JoinClient userCountryCode={userCountryCode} />;
}
