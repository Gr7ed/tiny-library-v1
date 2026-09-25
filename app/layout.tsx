import type { Metadata } from "next";
import { headers } from "next/headers";
import { Lato, Noto_Kufi_Arabic, Nunito_Sans } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { directionFor, type Locale } from "./i18n";
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

const arabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tiny Books",
  description: "A collection of tiny books",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = (await headers()).get("x-locale") === "ar" ? "ar" : "en";
  const activeLocale: Locale = locale;

  return (
    <html
      lang={activeLocale}
      dir={directionFor(activeLocale)}
      className={`${lato.variable} ${nunitoSans.variable} ${arabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col bg-background text-foreground ${
          activeLocale === "ar" ? "font-arabic" : ""
        }`}
      >
        <Header locale={activeLocale} />
        <div className="w-full flex-1">{children}</div>
        <Footer locale={activeLocale} />
      </body>
    </html>
  );
}
