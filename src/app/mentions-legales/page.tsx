import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site EchoXIA.",
  robots: { index: false, follow: true },
};

// Les champs entre crochets sont à renseigner avec les informations
// officielles de l'éditeur avant la mise en ligne.
export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Éditeur du site</h2>
        <p>
          Le présent site est édité par {site.legalName}.
        </p>
        <ul className="list-disc pl-5">
          <li>Raison sociale : [à compléter]</li>
          <li>Forme juridique : [à compléter]</li>
          <li>Capital social : [à compléter]</li>
          <li>Siège social : [adresse à compléter]</li>
          <li>Numéro SIREN / SIRET : [à compléter]</li>
          <li>Numéro de TVA intracommunautaire : [à compléter]</li>
          <li>
            Contact :{" "}
            <a className="text-accent hover:text-brand" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">
          Directeur de la publication
        </h2>
        <p>[Nom du directeur ou de la directrice de la publication à compléter].</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Hébergement</h2>
        <p>
          Le site est hébergé par [nom de l’hébergeur], [adresse de l’hébergeur],
          [contact de l’hébergeur].
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">
          Propriété intellectuelle
        </h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, visuels,
          animations, logo) est protégé par le droit de la propriété
          intellectuelle. Toute reproduction ou représentation, totale ou
          partielle, sans autorisation préalable est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Responsabilité</h2>
        <p>
          {site.legalName} s’efforce d’assurer l’exactitude des informations
          diffusées sur ce site. Malgré tout le soin apporté, des erreurs ou
          omissions peuvent survenir ; l’éditeur ne saurait en être tenu pour
          responsable.
        </p>
      </section>
    </LegalPage>
  );
}
