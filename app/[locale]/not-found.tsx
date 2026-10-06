import { headers } from "next/headers";
import { NotFoundState } from "@/components/NotFoundState";
import { getMessages, isLocale, localizedPath, type Locale } from "@/lib/i18n";

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
