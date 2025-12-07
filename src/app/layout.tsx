import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/app/redux/ReduxProvider";

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
      <ReduxProvider>
        <body className={`h-screen max-h-screen max-w-screen overscroll-none`}>
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
