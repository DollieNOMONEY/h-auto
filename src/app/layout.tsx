import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from '../lib/edgestore';
import LenisProvider from '@/components/LenisProvider';
import ControlPanel from '@/components/Access/ControlPanel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H Auto",
  description: "Check out the cars at H Auto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EdgeStoreProvider>
          <LenisProvider />
          {children}
          <ControlPanel/>
        </EdgeStoreProvider> 
      </body>
    </html>
  );
}
