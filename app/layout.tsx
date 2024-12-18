// /app/layout.js
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react"; // Import React for type support

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'GWMP',
  description: 'Ground Water Management Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Explicitly type 'children'
}) {
  return (
    <html lang="en">
      <head>
        {/* Add the viewport meta tag for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Apply the font styles globally
        >
        {children}
      </body>
    </html>
  );
}
