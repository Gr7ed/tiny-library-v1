import { headers } from "next/headers";
import { NotFoundState } from "@/components/NotFoundState";
import { getMessages, isLocale, localizedPath } from "@/lib/i18n";
import type { Locale } from "@/types";

export default async function NotFound() {
  const value = (await headers()).get("x-locale");
  const locale: Locale = value && isLocale(value) ? value : "en";
  const copy = getMessages(locale);

  return (
    <NotFoundState
      title={copy.notFoundTitle}
      subtitle={copy.notFoundDescription}
      linkText={copy.returnHome}
      linkHref={localizedPath(locale)}
    />
  );
}
