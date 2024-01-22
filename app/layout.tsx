import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const openSans = Playfair_Display({subsets: ['latin']})

export const metadata: Metadata = {
  title: "trydo",
  description: "trydo - Creative agency for brand identity and design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body style={{ fontFamily: `${openSans}` }} className="max-w-6xl mx-auto lg:bg-slate-200">
        {children}
      </body>
    </html>
  );
}
