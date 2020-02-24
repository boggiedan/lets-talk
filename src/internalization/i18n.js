import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Enter your message": "Enter your message",
        "User name": "User name",
        "Enter your new user name": "Enter your new user name",
        "Interface color": "Interface color",
        Light: "Light",
        Dark: "Dark",
        "Clock display": "Clock display",
        "12 Hours": "12 Hours",
        "24 Hours": "24 Hours",
        "Send messages on CTRL+ENTER": "Send messages on CTRL+ENTER",
        Language: "Language",
        English: "English",
        French: "French",
        "Reset to default": "Reset to default",
        Welcome: "Welcome",
        Settings: "Settings",
        "Go to chat": "Go to chat"
      }
    },
    fr: {
      translations: {
        "Enter your message": "Entrez votre message",
        "User name": "Nom d'utilisateur",
        "Enter your new user name": "Entrez votre nouveau nom d'utilisateur",
        "Interface color": "Couleur de l'interface",
        Light: "Clair",
        Dark: "Sombre",
        "Clock display": "Affichage de l'horloge",
        "12 Hours": "12 Heures",
        "24 Hours": "24 Heures",
        "Send messages on CTRL+ENTER": "Envoyer les messages avec CTRL+ENTER",
        Language: "Langue",
        English: "Anglais",
        French: "Français",
        "Reset to default": "Remettre les paramètres par défaut",
        Welcome: "Bienvenue",
        Settings: "Paramètres",
        "Go to chat": "Retourner au chat"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
