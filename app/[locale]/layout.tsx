import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLangDir } from "rtl-detect";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const din = localFont({
  src: "../fonts/DINN.ttf",
  variable: "--font-din",
  display: "swap",
  weight: "400",
});
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const dir = getLangDir(locale);
  return (
    <html lang={locale} dir={dir}>
      <body className={`${din.variable} ${inter.variable} antialiased`}>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
         
             {children}
             <Toaster />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
