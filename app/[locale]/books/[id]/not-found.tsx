import { headers } from "next/headers";
import { NotFoundState } from "@/components/NotFoundState";
import { getMessages, isLocale, localizedPath, type Locale } from "@/lib/i18n";

export default async function NotFound() {
  const value = (await headers()).get("x-locale");
  const locale: Locale = value && isLocale(value) ? value : "en";
  const copy = getMessages(locale);

  return (
    <NotFoundState
      title={locale === "ar" ? "الكتاب غير موجود" : "Book not found"}
      subtitle={
        locale === "ar"
          ? "الكتاب الذي تبحث عنه غير موجود أو لم يعد متاحًا."
          : "The book you are looking for does not exist or is no longer available."
      }
      linkText={copy.backToCollection}
      linkHref={localizedPath(locale, "/books")}
    />
  );
}
