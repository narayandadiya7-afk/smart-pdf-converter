import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdRegistry from "@/components/AntdRegistry";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartPDFUtility - Professional PDF Tools for Everyone",
  description: "Convert, compress, merge, split, edit, and secure your PDFs with our fast, reliable, and completely free online tools. 100% secure, no registration required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <AntdRegistry>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}
