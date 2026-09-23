import type { Metadata } from "next";
import { Lato, Nunito_Sans } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Books",
  description: "A collection of tiny books",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="w-full flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
