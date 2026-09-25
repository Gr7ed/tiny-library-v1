"use client";

import { useEffect } from "react";
import { directionFor, type Locale } from "@/app/i18n";

export function LocaleDocumentAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = directionFor(locale);
    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [locale]);

  return null;
}
