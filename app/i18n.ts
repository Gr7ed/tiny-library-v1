export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function directionFor(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export const messages = {
  en: {
    siteName: "Tiny Library",
    home: "Home",
    collection: "Collection",
    about: "About",
    contact: "Contact",
    explore: "Explore the collection",
    ourStory: "Our story",
    welcome: "Welcome to Tiny Library",
    heroTitle: "Find your next favourite book",
    heroDescription: "Tiny Library is a cosy corner of the web where readers discover hand-picked titles across every genre, from timeless classics to hidden indie gems.",
    highlights: ["hand-picked books", "genres to explore", "reader-first browsing"],
    browseByCategory: "Browse by category",
    searchBooks: "Search books",
    searchBooksPlaceholder: "Title, author, or category",
    noSearchResults: (query: string) => `No books found for “${query}”.`,
    allBooks: "All books",
    collectionEyebrow: "The collection",
    collectionTitle: "Find a story worth keeping close.",
    collectionDescription: "Browse hand-picked books across fiction, romance, fantasy, biographies, and more.",
    categoryEyebrow: "Category collection",
    categoryDescription: (category: string) => `A focused shelf of ${category} stories selected for curious readers.`,
    readyToExplore: (count: number) => `${count} ${count === 1 ? "book" : "books"} ready to explore`,
    viewDetails: "View details",
    backToCollection: "Back to collection",
    readersLikeThis: (count: number) => `${count} readers like this`,
    discoverAnother: "Discover another book",
    aboutEyebrow: "About Tiny Library",
    aboutTitle: "Small shelf, big impact.",
    contactEyebrow: "Get in touch",
    contactTitle: "Let's talk books.",
    browseCollection: "Browse collection",
    contactTeam: "Contact the team",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    switchLanguage: "العربية",
  },
  ar: {
    siteName: "المكتبة الصغيرة",
    home: "الرئيسية",
    collection: "المجموعة",
    about: "عن المكتبة",
    contact: "تواصل معنا",
    explore: "استكشف المجموعة",
    ourStory: "قصتنا",
    welcome: "مرحبًا بك في المكتبة الصغيرة",
    heroTitle: "اعثر على كتابك المفضل",
    heroDescription: "المكتبة الصغيرة هي زاوية مريحة على الإنترنت حيث يكتشف القراء عناوين مختارة بعناية عبر كل نوع أدبي، من الكلاسيكيات الخالدة إلى الجواهر المستقلة المخفية.",
    highlights: ["كتابًا منتقى", "تصنيفات للاستكشاف", "تجربة تضع القارئ أولًا"],
    browseByCategory: "تصفح حسب التصنيف",
    searchBooks: "ابحث عن الكتب",
    searchBooksPlaceholder: "العنوان أو المؤلف أو التصنيف",
    noSearchResults: (query: string) => `لم يتم العثور على كتب تطابق «${query}».`,
    allBooks: "كل الكتب",
    collectionEyebrow: "المجموعة",
    collectionTitle: "اعثر على قصة تستحق أن تبقى قريبة.",
    collectionDescription: "تصفح كتبًا منتقاة بعناية في الأدب والرومانسية والفانتازيا والسير الذاتية وغيرها.",
    categoryEyebrow: "مجموعة التصنيف",
    categoryDescription: (category: string) => `رفّ مركز من قصص ${category} المختارة للقراء الفضوليين.`,
    readyToExplore: (count: number) => `${count} ${count === 1 ? "كتاب جاهز" : "كتابًا جاهزًا"} للاستكشاف`,
    viewDetails: "عرض التفاصيل",
    backToCollection: "العودة إلى المجموعة",
    readersLikeThis: (count: number) => `${count} قارئًا أعجبهم هذا الكتاب`,
    discoverAnother: "اكتشف كتابًا آخر",
    aboutEyebrow: "عن المكتبة الصغيرة",
    aboutTitle: "رف صغير، تأثير كبير.",
    contactEyebrow: "تواصل معنا",
    contactTitle: "لنتحدث عن الكتب.",
    browseCollection: "تصفح المجموعة",
    contactTeam: "تواصل مع الفريق",
    themeLight: "التبديل إلى الوضع الفاتح",
    themeDark: "التبديل إلى الوضع الداكن",
    openMenu: "فتح قائمة التنقل",
    closeMenu: "إغلاق قائمة التنقل",
    switchLanguage: "English",
  },
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function categoryLabel(locale: Locale, category: string) {
  if (locale === "en") return category.replace("-", " ");
  const labels: Record<string, string> = {
    fiction: "أدب",
    "non-fiction": "غير خيالي",
    romance: "رومانسية",
    fantasy: "فانتازيا",
    thriller: "تشويق",
    horror: "رعب",
    historical: "تاريخي",
    biography: "سيرة ذاتية",
    "self-help": "تطوير الذات",
  };
  return labels[category] ?? category;
}

export function localizedPath(locale: Locale, path = "/") {
  return `/${locale}${path === "/" ? "" : path}`;
}
