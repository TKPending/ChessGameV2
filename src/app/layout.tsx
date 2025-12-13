import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/app/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Chess Game",
  description: "A simple local multiple Chess game.",
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
