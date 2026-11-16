import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: "EventKu",
  description: "Katalog dan Pemesanan Event",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${poppins.className} h-full antialiased`}>
      <body className={`${poppins.className} flex min-h-screen flex-col bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}