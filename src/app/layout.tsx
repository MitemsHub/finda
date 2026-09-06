import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Finda — Discover & Book Trusted Local Businesses",
    template: "%s · Finda",
  },
  description:
    "Find verified local businesses near you, book services instantly, and leave reviews you can trust. Finda connects neighborhoods with the shops, salons, and services worth knowing.",
  keywords: [
    "local business directory Nigeria",
    "book appointments Lagos",
    "verified businesses Nigeria",
    "local services Lagos",
    "finda",
  ],
  icons: { icon: "/finda-logo.svg" },
  openGraph: {
    title: "Finda — Discover & Book Trusted Local Businesses",
    description:
      "Find verified local businesses near you, book services instantly, and leave reviews you can trust.",
    type: "website",
    siteName: "Finda",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
