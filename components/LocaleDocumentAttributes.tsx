"use client";

import { useEffect } from "react";
import { directionFor } from "@/lib/i18n";
import type { Locale } from "@/types";

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
