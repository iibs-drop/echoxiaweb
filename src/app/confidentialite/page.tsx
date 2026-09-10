import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données du site EchoXIA.",
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <p>
          Cette politique décrit la manière dont {site.legalName} traite les
          données personnelles collectées via ce site, notamment lors d’une
          demande de démonstration. Les éléments entre crochets doivent être
          adaptés à votre organisation avant la mise en ligne.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">
          Données collectées
        </h2>
        <p>
          Lorsque vous demandez une démonstration, nous collectons les
          informations que vous renseignez dans le formulaire : nom, email
          professionnel, entreprise et description de votre besoin.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Finalité</h2>
        <p>
          Ces données sont utilisées uniquement pour traiter votre demande,
          organiser votre démonstration et vous recontacter. Elles ne sont pas
          cédées à des tiers à des fins commerciales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Conservation</h2>
        <p>
          Vos données sont conservées pour la durée nécessaire au traitement de
          votre demande, puis [durée de conservation à préciser].
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">Vos droits</h2>
        <p>
          Conformément à la réglementation applicable (RGPD), vous disposez d’un
          droit d’accès, de rectification, d’effacement et d’opposition
          concernant vos données. Pour l’exercer, écrivez-nous à{" "}
          <a className="text-accent hover:text-brand" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-dark">
          Responsable du traitement
        </h2>
        <p>
          Le responsable du traitement est {site.legalName}, [coordonnées à
          compléter].
        </p>
      </section>
    </LegalPage>
  );
}
