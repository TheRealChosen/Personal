import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoekman-cafe.nl"),
  title: {
    default: "Banket & Koffiehuus Hoekman — Sinds jaar en dag · Raalte",
    template: "%s · Hoekman",
  },
  description:
    "Een traditioneel Hollands banket- en koffiehuus in hartje Raalte. Koffie, gebak, lunch en high tea — met liefde bereid, zoals het hoort.",
  keywords: [
    "Hoekman",
    "Raalte",
    "koffiehuus",
    "banket",
    "gebak",
    "lunch",
    "high tea",
    "Salland",
    "Hollandse bakker",
  ],
  authors: [{ name: "Familie Hoekman" }],
  openGraph: {
    title: "Banket & Koffiehuus Hoekman",
    description:
      "Koffie, gebak en lunch in hartje Raalte. Sinds 1937, met liefde bereid.",
    locale: "nl_NL",
    type: "website",
    siteName: "Hoekman",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banket & Koffiehuus Hoekman",
    description: "Sinds jaar en dag. Een kopje koffie dat smaakt zoals vroeger.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3ede0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-paper text-espresso grain min-h-dvh">
        <a
          href="#hoofd"
          className="
            sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999]
            focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-cream
          "
        >
          Naar de inhoud
        </a>
        <Nav />
        <main id="hoofd">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
