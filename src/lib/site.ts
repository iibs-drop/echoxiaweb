/**
 * Contenu et configuration centralisés du site EchoXIA.
 * Modifiez ce fichier pour ajuster les textes, coordonnées et liens
 * sans toucher aux composants.
 */

export const site = {
  name: "EchoXIA",
  // URL de production — utilisée pour les métadonnées SEO. À adapter au déploiement.
  url: "https://www.echoxia.fr",
  description:
    "EchoXIA est un assistant IA qui répond à vos clients, qualifie vos prospects, prend des rendez-vous et envoie vos factures directement dans vos conversations WhatsApp, Instagram, Messenger et sur votre site.",
  // Coordonnées configurables (aucune donnée inventée : à renseigner avant mise en ligne).
  contact: {
    email: "contact@echoxia.fr",
    // Laisser vide si non communiqué ; le pied de page masque les champs vides.
    phone: "",
    address: "",
  },
  legalName: "EchoXIA",
};

export const nav = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Cas d’usage", href: "#cas-d-usage" },
  { label: "FAQ", href: "#faq" },
];

export const channels = [
  { name: "WhatsApp", key: "whatsapp" },
  { name: "Instagram", key: "instagram" },
  { name: "Messenger", key: "messenger" },
  { name: "Site web", key: "web" },
] as const;
