import { NextResponse } from "next/server";

/**
 * Point d'entrée configurable pour les demandes de démo.
 *
 * Branchement : définissez la variable d'environnement DEMO_WEBHOOK_URL
 * (ex. un webhook CRM, Zapier, Make, Slack…). La requête y est transmise
 * en POST JSON. Sans webhook configuré, la demande est journalisée côté
 * serveur et acceptée (utile en développement).
 *
 * La réponse n'est positive (200) qu'en cas de succès réel : le client
 * n'affiche la confirmation qu'après ce statut.
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  need?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { message: "Requête invalide." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const need = body.need?.trim() ?? "";

  if (!name || !email || !company || !need) {
    return NextResponse.json(
      { message: "Merci de compléter tous les champs." },
      { status: 422 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { message: "Merci de saisir un email professionnel valide." },
      { status: 422 },
    );
  }

  const record = {
    name,
    email,
    company,
    need,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.DEMO_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        // On ne renvoie un succès que si la transmission a réussi.
        return NextResponse.json(
          { message: "Le service de réception est indisponible." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Impossible de transmettre la demande pour le moment." },
        { status: 502 },
      );
    }
  } else {
    // Pas de webhook configuré : journalisation (à remplacer en production).
    console.info("[demo] nouvelle demande :", record);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
