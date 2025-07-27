import type { Metadata } from "next";

import "./globals.css";




export const metadata: Metadata = {
  title: "SWAG MUSIC ONLY",
  description: "swag music only store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-helvetica font-regular bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
