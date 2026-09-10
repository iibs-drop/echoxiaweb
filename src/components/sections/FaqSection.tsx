import Container from "../Container";
import Faq, { FaqItem } from "../Faq";

const items: FaqItem[] = [
  {
    question: "Sur quels canaux fonctionne EchoXIA ?",
    answer:
      "EchoXIA échange avec vos clients sur WhatsApp, Instagram, Messenger et directement sur votre site internet. Les conversations issues de ces canaux sont regroupées au même endroit.",
  },
  {
    question: "Peut-on personnaliser ses réponses ?",
    answer:
      "Oui. Vous renseignez les informations de votre activité, votre offre et le ton souhaité. L’assistant s’appuie sur ces éléments pour répondre à votre manière et présenter vos services.",
  },
  {
    question: "Comment fonctionne la prise de rendez-vous ?",
    answer:
      "Au fil de la conversation, le client choisit un créneau parmi ceux proposés et reçoit sa confirmation. Le rendez-vous est acté sans quitter la discussion.",
  },
  {
    question: "EchoXIA peut-il envoyer des factures ?",
    answer:
      "Oui. Une fois la prestation confirmée, la facture est transmise automatiquement dans le fil de conversation, sous forme de document que le client peut retrouver facilement.",
  },
  {
    question: "Quel rôle conserve mon équipe ?",
    answer:
      "Votre équipe garde la main. EchoXIA prend en charge les échanges courants et centralise les informations utiles ; vos collaborateurs peuvent reprendre contact et assurer le suivi à tout moment.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-surface-soft py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-4">Questions fréquentes</h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-dark/75">
            Vous ne trouvez pas votre réponse ? Demandez une démo, nous
            reviendrons vers vous avec les précisions utiles.
          </p>
        </div>
        <Faq items={items} />
      </Container>
    </section>
  );
}
