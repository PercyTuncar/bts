import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra Exitosa - BTS Chile 2026",
  description: "Gracias por tu compra. Por favor envía captura de pantalla al WhatsApp para recibir tu entrada.",
};

export default function CompraExitosaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
