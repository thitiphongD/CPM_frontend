import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthProvider";
import Footer from "./components/Footer";
import NavMenuButtom from "./components/NavMenuButtom";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Portfolio Manager",
  description:
    "Create a web application that allows users to manage their cryptocurrency portfolios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="hidden lg:block">
            <Navbar />
          </div>
          {children}
          <div className="hidden lg:block">
            <Footer />
          </div>
          <div className="block lg:hidden">
            <NavMenuButtom />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
