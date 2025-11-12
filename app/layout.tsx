import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spain Digital Nomad Visa - Expert Assistance",
  description: "Get expert help with your Spain digital nomad visa application. Work with specialized immigration lawyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
