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
  title: "software engineer | nestjs, react, python & go expert – ireoluwa",
  description:
    "ireoluwa is a results-driven software engineer specializing in nestjs, react, python, and go. i build scalable, efficient applications that solve real problems and drive business results.",
  keywords: ["software engineer", "full stack developer", "ireoluwa", "portfolio", "nestjs", "react", "python", "go", "web development"],
  authors: [{ name: "ireoluwa" }],
  creator: "ireoluwa",
  metadataBase: new URL("https://www.ireoluwa.dev"),
  openGraph: {
    title: "software engineer | nestjs, react, python & go expert – ireoluwa",
    description:
      "i create high-performing, scalable applications using nestjs, react, python, and go. let's build something impactful together.",
    url: "https://www.ireoluwa.dev",
    siteName: "ireoluwa.ssh",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.ireoluwa.dev/og.jpg",
        width: 512,
        height: 512,
        alt: "ireoluwa software engineer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "software engineer | nestjs, react, python & go expert – ireoluwa",
    description:
      "i create high-performing, scalable applications using nestjs, react, python, and go. let's build something impactful together.",
    creator: "@ireoluwa_codes",
    site: "https://www.ireoluwa.dev",
    images: ["https://www.ireoluwa.dev/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
