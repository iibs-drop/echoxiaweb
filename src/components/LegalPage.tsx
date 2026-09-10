import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";

export default function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <Container className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <a
              href="/"
              className="text-sm font-medium text-accent hover:text-brand"
            >
              ← Retour à l’accueil
            </a>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              {title}
            </h1>
            {updatedAt && (
              <p className="mt-2 text-sm text-brand-dark/60">
                Dernière mise à jour : {updatedAt}
              </p>
            )}
            <div className="prose-legal mt-8 space-y-6 text-brand-dark/80">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
