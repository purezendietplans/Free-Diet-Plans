import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import AnnouncementBar from "@/components/AnnouncementBar";
import {
  Montserrat,
  Open_Sans,
  Playfair_Display,
  Raleway,
  Poppins,
  Lora,
  Roboto,
  Lato,
  Merriweather,
  Source_Sans_3,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-openSans",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-sourceSans",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diet Plans - Download Your Perfect Diet Plan",
  description:
    "Browse and download personalized diet plans for your health goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${openSans.variable} 
                 ${playfair.variable} ${raleway.variable} 
                 ${poppins.variable} ${lora.variable}
                 ${roboto.variable} ${lato.variable}
                 ${merriweather.variable} ${sourceSans.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <AnnouncementBar />
          <main className="flex-1">
            <SessionProvider>
              {children}
              <Toaster position="top-center" />
            </SessionProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
