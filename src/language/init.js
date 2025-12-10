import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// импорт JSON с переводами
import enTranslations from "./en.json";
import ruTranslations from "./ru.json";
import uzTranslations from "./uz.json";

// берем сохраненный язык или ставим по умолчанию
const storedLang = localStorage.getItem("language") || "uz";

i18n
  .use(initReactI18next)
  .init({
    lng: storedLang.toLowerCase(),
    fallbackLng: "uz",
    resources: {
      en: { translation: enTranslations },
      ru: { translation: ruTranslations },
      uz: { translation: uzTranslations },
    },
    
    interpolation: { escapeValue: false },
  });

export default i18n;