import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "ireoluwacodes - software engineer",
  description: "portfolio of ireoluwa, a passionate software engineer specializing in full-stack development, scalable systems, and user-friendly solutions.",
  keywords: ["software engineer", "full stack developer", "ireoluwa", "portfolio", "web development", "mobile development"],
  authors: [{ name: "ireoluwa" }],
  creator: "ireoluwa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ireoluwa.dev",
    title: "ireoluwacodes - software engineer",
    description: "portfolio of ireoluwa, a passionate software engineer specializing in full-stack development, scalable systems, and user-friendly solutions.",
    siteName: "ireoluwacodes",
  },
  twitter: {
    card: "summary_large_image",
    title: "ireoluwacodes - software engineer",
    description: "portfolio of ireoluwa, a passionate software engineer specializing in full-stack development, scalable systems, and user-friendly solutions.",
    creator: "@ireoluwa_codes",
  },
  // icons: {
  //   icon: [
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  //   apple: [
  //     { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  //   ],
  //   other: [
  //     { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
  //     { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  //   ],
  // },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
