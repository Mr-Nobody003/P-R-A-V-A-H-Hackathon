import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Initialize i18next
i18n
  .use(HttpApi) // Load translations from external files
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Initializes with React
  .init({
    supportedLngs: ["en", "ko", "hi", "bn","as"], // Add more languages
    fallbackLng: "en", // Default language
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Language detection order
      caches: ["localStorage", "cookie"], // Save language choice
    },
    interpolation: { escapeValue: false }, // React already escapes values
    backend: { loadPath: "/locales/{{lng}}.json" } // Path for translation files
  });

export default i18n;
