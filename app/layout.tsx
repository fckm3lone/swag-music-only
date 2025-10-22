import type { Metadata } from "next";

import "./globals.css";
import {Providers} from "@/app/providers";




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
    <body>
    <Providers>
        {children}
    </Providers>
    </body>
    </html>
  );
}
