"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";
import { CheckIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-brand-dark placeholder:text-brand-dark/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-accent/40";

const labelClass = "block text-sm font-medium text-brand-dark";

export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // La confirmation n'est affichée qu'après une réponse positive du serveur.
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(
          payload?.message ??
            "L’envoi a échoué. Merci de réessayer dans un instant.",
        );
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Merci de réessayer.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl2 border border-line bg-white p-8 shadow-soft"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-lg font-semibold text-brand-dark">
            Merci, votre demande est bien reçue.
          </p>
          <p className="mt-1 text-brand-dark/70">
            Notre équipe vous recontacte rapidement pour organiser votre
            démonstration.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setStatus("idle")}
        >
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl2 border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${fieldClass}`}
            placeholder="Votre nom"
          />
        </div>
        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="email">
            Email professionnel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${fieldClass}`}
            placeholder="vous@entreprise.fr"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="company">
            Entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={`mt-2 ${fieldClass}`}
            placeholder="Nom de votre entreprise"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="need">
            Votre besoin
          </label>
          <textarea
            id="need"
            name="need"
            rows={4}
            required
            className={`mt-2 ${fieldClass} resize-y`}
            placeholder="Dites-nous en quelques mots ce que vous aimeriez automatiser."
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {errorMsg}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Envoi en cours…" : "Demander une démo"}
        </Button>
        <p className="text-xs text-brand-dark/60">
          Vos informations servent uniquement à traiter votre demande.
        </p>
      </div>
    </form>
  );
}
