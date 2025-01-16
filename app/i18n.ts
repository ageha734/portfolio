import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            // 他の翻訳キーと値を追加
        },
    },
    ja: {
        translation: {
            welcome: "ようこそ",
            // 他の翻訳キーと値を追加
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;