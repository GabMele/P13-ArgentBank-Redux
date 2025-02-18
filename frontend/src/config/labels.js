// src/config/labels.js

// Dynamically import language and assets
import iconChat from "@/assets/icon-chat.png";
import iconMoney from "@/assets/icon-money.png";
import iconSecurity from "@/assets/icon-security.png";

// Set the default language, which could be dynamically changed (e.g., via user settings)
const LANGUAGE = "en";

const LABELS_TRANSLATIONS = {
  en: {
    featuresSection: {
      heading: "Features",
      feature: [
        {
          icon: iconChat,
          title: "You are our #1 priority",
          description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
          icon: iconMoney,
          title: "More savings means higher rates",
          description: "The more you save with us, the higher your interest rate will be!"
        },
        {
          icon: iconSecurity,
          title: "Security you can trust",
          description: "We use top-of-the-line encryption to make sure your data and money are always safe."
        }
      ]
    },
    hero: {
      subtitle: ["No fees.", "No minimum deposit.", "High interest rates."],
      text: "Open a savings account with Argent Bank today!",
      srOnly: "Promoted Content"
    }
  },
  fr: {
    featuresSection: {
      heading: "Fonctionnalités",
      feature: [
        {
          icon: iconChat,
          title: "Vous êtes notre priorité n°1",
          description: "Besoin de parler à un représentant ? Vous pouvez nous contacter via notre chat 24/7 ou par téléphone en moins de 5 minutes."
        },
        {
          icon: iconMoney,
          title: "Plus d'économies signifie des taux plus élevés",
          description: "Plus vous épargnez avec nous, plus votre taux d'intérêt sera élevé !"
        },
        {
          icon: iconSecurity,
          title: "Une sécurité de confiance",
          description: "Nous utilisons un chiffrement de pointe pour garantir que vos données et votre argent sont toujours en sécurité."
        }
      ]
    },
    hero: {
      subtitle: ["Aucuns frais.", "Pas de dépôt minimum.", "Taux d'intérêt élevés."],
      text: "Ouvrez un compte d'épargne chez Argent Bank aujourd'hui !",
      srOnly: "Contenu promu"
    }
  }
};

// Export the labels based on the selected language
export const LABELS = LABELS_TRANSLATIONS[LANGUAGE];
