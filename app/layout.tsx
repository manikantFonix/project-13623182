import type { Metadata } from "next";
import { Archivo, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "../components/settings/theme/ThemeProvider";
import { ConsoleErrorFilter } from "../components/ConsoleErrorFilter";
import "./globals.css";

const archivo = Archivo({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-archivo',
})

const playfair = Playfair_Display({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "CraftsmanAI",
  description: "Turn stock photographs into catalogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${archivo.variable} ${playfair.variable} antialiased`}
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <ConsoleErrorFilter />
      </body>
    </html>
  );
}