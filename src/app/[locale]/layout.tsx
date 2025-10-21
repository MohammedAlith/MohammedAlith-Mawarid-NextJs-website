// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import React from "react";
import Header from "../components/Header/Header";
import requestConfig from "../../i18n/request";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import BaseFooter from "../components/BaseFooter";
import FooterBottom from "../components/Footer";


interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {

  let locale = params.locale;

  
  if (!locale) locale = "ar";

  const isRtl = ["ar", "he"].includes(locale);

  // Fetch translation messages
  const messages = await requestConfig({ requestLocale: Promise.resolve(locale) });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div dir={isRtl ? "rtl" : "ltr"}>
        <Header />
        <MenuHeader/>
        <main>{children}</main>
         <BaseFooter/>
      <FooterBottom/>
      </div>
     
    </NextIntlClientProvider>
  );
}
