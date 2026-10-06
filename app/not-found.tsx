import { NotFoundState } from "@/components/NotFoundState";
import { getMessages, isLocale, type Locale, localizedPath } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function NotFound() {
    const value = (await headers()).get("x-locale");
    const locale: Locale = value && isLocale(value) ? value : "en";
    const copy = getMessages(locale);
  return (
    <NotFoundState
      locale={locale}
      title={copy.notFoundTitle}
      subtitle={copy.notFoundDescription}
      linkText={copy.returnHome}
      linkHref={localizedPath(locale)}
    />
  );
}
