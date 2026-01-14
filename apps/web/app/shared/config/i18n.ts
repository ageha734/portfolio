import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			welcome: "Welcome",
		},
	},
	ja: {
		translation: {
			welcome: "ようこそ",
		},
	},
};

const i18n = i18next.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
