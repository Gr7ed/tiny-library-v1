import { headers } from "next/headers";
import { NotFoundState } from "@/components/NotFoundState";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

export default async function NotFound() {
  const value = (await headers()).get("x-locale");
  const locale: Locale = value && isLocale(value) ? value : "en";
  return (
    <NotFoundState
      title={locale === "ar" ? "التصنيف غير موجود" : "Category not found"}
      subtitle={
        locale === "ar"
          ? "التصنيف الذي تبحث عنه غير موجود في مجموعتنا."
          : "The category you are looking for is not part of our collection."
      }
      linkText={locale === "ar" ? "تصفح كل الكتب" : "Browse all books"}
      linkHref={localizedPath(locale, "/books")}
    />
  );
}
