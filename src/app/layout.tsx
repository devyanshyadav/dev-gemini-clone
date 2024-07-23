import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/utils/theme-providers";
const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Dev Gemini Clone",
  description: "A Gemini-inspired AI assistant built with Next.js",
  keywords: ["AI", "assistant", "Gemini", "clone", "Next.js"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name or Company",
  publisher: "Your Name or Company",
  openGraph: {
    title: "Dev Gemini Clone",
    description: "An advanced GEMINI Clone built with Next.js, featuring enhanced functionalities and faster response times.",
    url: "https://dev-gemini-clone.vercel.app",
    siteName: "Dev Gemini Clone",
    images: [
      {
        url: "/assets/gemini-logo.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Gemini Clone",
    description: "Experience the power of AI with our Gemini-inspired assistant",
    creator: "@yourTwitterHandle",
    images: ["/assets/gemini-banner.svg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OutfitFont.className} dark:bg-[#131314] h-dvh w-full overflow-hidden bg-white text-black dark:text-white`}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
