import Container from "./Container";
import Logo from "./Logo";
import { channels, nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-soft">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo asPlainText className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-dark/70">
              L’assistant IA qui répond à vos clients et fait avancer votre
              activité, conversation après conversation.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {channels.map((c) => (
                <li
                  key={c.key}
                  className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-brand-dark/70"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className="text-sm font-semibold text-brand-dark">Le produit</h2>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-dark/70 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#demo"
                  className="text-sm text-brand-dark/70 transition-colors hover:text-brand"
                >
                  Demander une démo
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-brand-dark">Contact & légal</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-sm text-brand-dark/70 transition-colors hover:text-brand"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.contact.phone && (
                <li className="text-sm text-brand-dark/70">
                  {site.contact.phone}
                </li>
              )}
              {site.contact.address && (
                <li className="text-sm text-brand-dark/70">
                  {site.contact.address}
                </li>
              )}
              <li>
                <a
                  href="/mentions-legales"
                  className="text-sm text-brand-dark/70 transition-colors hover:text-brand"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="/confidentialite"
                  className="text-sm text-brand-dark/70 transition-colors hover:text-brand"
                >
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-brand-dark/60">
          © {new Date().getFullYear()} {site.legalName}. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}
