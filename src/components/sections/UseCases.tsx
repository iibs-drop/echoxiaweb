import Container from "../Container";
import {
  CalendarIcon,
  DocumentIcon,
  SparkIcon,
  UserIcon,
} from "../icons";

const cases = [
  {
    icon: <SparkIcon className="h-5 w-5" />,
    title: "Écoles et organismes de formation",
    text: "Répondez aux questions sur les programmes et les inscriptions, qualifiez les candidats et proposez un rendez-vous d’information.",
    tags: ["Réponses instantanées", "Qualification", "Rendez-vous"],
  },
  {
    icon: <UserIcon className="h-5 w-5" />,
    title: "Entreprises de services",
    text: "Présentez vos prestations, recueillez les coordonnées des prospects et envoyez la facture une fois la mission confirmée.",
    tags: ["Présentation des services", "Qualification", "Factures"],
  },
  {
    icon: <CalendarIcon className="h-5 w-5" />,
    title: "Professionnels sur rendez-vous",
    text: "Laissez vos clients réserver un créneau au fil de la conversation et recevoir leur confirmation, sans échanges inutiles.",
    tags: ["Rendez-vous", "Confirmation", "Suivi"],
  },
];

export default function UseCases() {
  return (
    <section id="cas-d-usage" className="scroll-mt-24 bg-white py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="eyebrow">Cas d’usage</span>
          <h2 className="section-title mt-4">
            Pensé pour les activités qui échangent beaucoup.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-dark/75">
            Les mêmes fonctionnalités s’adaptent à des métiers différents. Voici
            trois exemples concrets.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-xl2 border border-line bg-surface p-7 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-accent">
                {c.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-brand-dark">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-brand-dark/70">
                {c.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-brand"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
