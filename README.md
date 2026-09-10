# EchoXIA — Site vitrine

Site vitrine moderne et responsive pour **EchoXIA**, l’assistant IA qui automatise
les échanges entre les entreprises et leurs clients sur WhatsApp, Instagram,
Messenger et leur site internet.

Construit avec **Next.js (App Router)**, **React**, **TypeScript** et **Tailwind CSS**.

---

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

### Scripts

| Commande        | Rôle                                             |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Serveur de développement                         |
| `npm run build` | Build de production                              |
| `npm run start` | Sert le build de production (après `build`)      |
| `npm run lint`  | Analyse ESLint                                   |

---

## Structure du projet

```
public/
  animations/            Les 4 animations (MP4 + WebM + PNG) et l'aperçu
src/
  app/
    layout.tsx           Layout racine, police Inter, métadonnées SEO
    page.tsx             Page d'accueil (assemblage des sections)
    globals.css          Styles globaux + tokens Tailwind
    icon.svg             Favicon
    robots.ts / sitemap.ts
    api/demo/route.ts    Endpoint de réception du formulaire (configurable)
    mentions-legales/    Page légale
    confidentialite/     Politique de confidentialité
  components/
    AnimationPlayer.tsx  Lecteur vidéo réutilisable (voir plus bas)
    Navbar.tsx           Navigation + menu mobile accessible
    Footer.tsx
    Button.tsx           Bouton polymorphe (lien / bouton)
    Container.tsx        Conteneur centré (max ~1280px)
    Faq.tsx              Accordéon accessible
    DemoForm.tsx         Formulaire de demande de démo
    Logo.tsx             Wordmark [EchoIA]
    icons.tsx            Jeu d'icônes SVG
    LegalPage.tsx        Gabarit des pages légales
    sections/            Sections de la page d'accueil
  lib/
    site.ts              Contenu et coordonnées configurables
```

---

## Personnalisation

- **Textes, coordonnées, liens de navigation** : `src/lib/site.ts`.
- **Coordonnées du pied de page** (`email`, `phone`, `address`) : `src/lib/site.ts`.
  Les champs laissés vides sont automatiquement masqués.
- **Contenu des sections** : chaque fichier de `src/components/sections/`.
- **Pages légales** : `src/app/mentions-legales/` et `src/app/confidentialite/`.
  Les champs entre crochets `[…]` sont à compléter avec vos informations
  officielles avant la mise en ligne.
- **Charte graphique** (couleurs, ombres, rayons) : `tailwind.config.ts`.

### Couleurs de la marque

| Rôle              | Valeur    |
| ----------------- | --------- |
| Bleu principal    | `#2A4D85` |
| Cyan d’accent     | `#268AA6` |
| Texte principal   | `#14254A` |
| Fond secondaire   | `#F1F6FB` |
| Bordures          | `#E1E9F2` |

---

## Le composant `AnimationPlayer`

Composant réutilisable pour les quatre animations produit
(`src/components/AnimationPlayer.tsx`).

- Ratio **4:3** respecté, animation entièrement visible (`object-contain`).
- **PNG** utilisé comme image d’attente (poster).
- Sources **WebM + MP4** fournies.
- **Lecture au défilement** : démarrage quand la vidéo est visible à ≥ 55 %,
  **pause** à la sortie de l’écran.
- **Dernière image conservée** après lecture (pas de boucle).
- **Commandes accessibles** : pause / lecture et rejouer, atteignables au clavier.
- **`prefers-reduced-motion`** : image fixe et lecture uniquement manuelle.
- **Chargement différé** des médias situés plus bas dans la page.

Utilisation :

```tsx
<AnimationPlayer
  base="/animations/02-qualification-prospects"  // chemin sans extension
  title="Description accessible de l'animation"
  // priority               // pour le premier visuel (hero)
/>
```

Le composant déduit les sources `.webm`, `.mp4` et l’image `.png` à partir de `base`.

---

## Formulaire de demande de démo

Le formulaire poste vers `POST /api/demo`
(`src/app/api/demo/route.ts`). La confirmation n’est affichée côté client
**qu’après une réponse positive (200) du serveur**.

### Branchement configurable

Définissez la variable d’environnement `DEMO_WEBHOOK_URL` (voir `.env.example`)
pour transmettre chaque demande vers votre outil (CRM, Zapier, Make, Slack…) :

```bash
cp .env.example .env.local
# puis renseignez DEMO_WEBHOOK_URL
```

- **Avec** webhook : la demande y est transmise en `POST` JSON. Le serveur ne
  répond `200` que si la transmission réussit.
- **Sans** webhook : la demande est validée puis journalisée côté serveur
  (utile en développement). À remplacer par un envoi réel en production.

Charge utile transmise :

```json
{ "name": "...", "email": "...", "company": "...", "need": "...", "receivedAt": "ISO-8601" }
```

---

## Accessibilité & SEO

- Navigation clavier, lien d’évitement « Aller au contenu », états de focus visibles.
- HTML sémantique (`header`, `main`, `nav`, `section`, `footer`), accordéon FAQ ARIA.
- Respect de `prefers-reduced-motion`.
- Métadonnées Open Graph / Twitter, `sitemap.xml`, `robots.txt`, langue `fr`.

---

## Chorégraphie de défilement (GSAP + ScrollTrigger)

L’expérience de défilement est mise en scène avec **GSAP** et **ScrollTrigger**,
en conservant le défilement natif et en privilégiant les transformations et
l’opacité. Chaque composant animé crée un `gsap.context()` nettoyé au démontage
(`ctx.revert()`), et tous respectent `prefers-reduced-motion` (présentation
statique complète).

- **`HeroScroll`** — titre révélé ligne par ligne à l’ouverture ; au scroll, le
  titre remonte, le cadre de démonstration se redresse et grandit, et des
  éléments décoratifs défilent en parallaxe.
- **`FeaturesPinned`** — sur desktop, section **épinglée** sur ~3 hauteurs de
  fenêtre : colonne gauche (4 chapitres cliquables, texte, rail de progression)
  et cadre de démonstration stable à droite qui enchaîne les 4 animations en
  fondu. Le scroll pilote le chapitre actif, la progression et le fond
  (blanc ↔ bleu très clair) ; la vidéo active se lit, les autres sont en pause.
  Sur mobile et en mouvement réduit : pile verticale accessible (via
  `AnimationPlayer`).
- **`HowItWorksStacked`** — les 3 cartes se superposent au scroll (sticky) ;
  la carte recouverte se réduit et s’atténue.
- **`FinalCta`** — à l’arrivée : halo cyan qui s’élargit, titre puis formulaire
  qui entrent dans la composition.
- **`Navbar`** — barre compacte après le premier défilement + indicateur de
  progression de lecture.

Fondations : `src/lib/gsap.ts` (enregistrement du plugin) et `src/lib/hooks.ts`
(`useIsomorphicLayoutEffect`, `usePrefersReducedMotion`, `useMediaQuery`).

## Déploiement

Application Next.js standard, déployable sur toute plateforme compatible.

### Vercel (recommandé)

1. Importez le dépôt sur [Vercel](https://vercel.com).
2. Ajoutez, si besoin, la variable d’environnement `DEMO_WEBHOOK_URL`.
3. Vercel détecte Next.js et déploie automatiquement.

### Autre hébergement (Node.js)

```bash
npm run build
npm run start   # sert l'application sur le port 3000 (configurable via -p)
```

Pensez à définir l’URL de production dans `src/lib/site.ts` (`site.url`) pour des
métadonnées SEO correctes.

---

## Note sur les contenus

Conformément au brief, aucun chiffre de performance, tarif, témoignage,
référence client ou certification n’est affiché : ces éléments nécessitent des
données vérifiées à fournir. Les fonctionnalités présentées correspondent à
celles décrites dans le cahier des charges.
