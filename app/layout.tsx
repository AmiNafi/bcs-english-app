import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "BCS English Master — Vocabulary, Writing & Translation",
  description: "World-class BCS English preparation: vocabulary, free-hand writing, English to Bangla translation, and mock tests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex">
        <Navigation />
        <main className="flex-1 md:ml-64 pt-16 md:pt-0 p-4 md:p-8 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
