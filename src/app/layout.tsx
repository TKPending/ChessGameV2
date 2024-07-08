import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess Game",
  description: "A simple chess game, by TK Studios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
