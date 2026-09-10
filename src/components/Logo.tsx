import Link from "next/link";

type LogoProps = {
  /** Taille du texte (classe utilitaire Tailwind), ex. "text-2xl". */
  className?: string;
  /** Si true, rend un simple wordmark sans lien (utile dans le pied de page). */
  asPlainText?: boolean;
};

/**
 * Wordmark EchoXIA : [Echo IA] avec crochets d'accent,
 * « Echo » en bleu profond et « IA » en cyan, reprenant les visuels produit.
 */
function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex select-none items-center font-bold tracking-tight ${className ?? "text-2xl"}`}
      aria-hidden="true"
    >
      <span className="mr-[0.08em] font-normal text-accent">[</span>
      <span className="text-brand-dark">EchoX</span>
      <span className="text-accent">IA</span>
      <span className="ml-[0.08em] font-normal text-accent">]</span>
    </span>
  );
}

export default function Logo({ className, asPlainText = false }: LogoProps) {
  if (asPlainText) {
    return (
      <span className="inline-flex items-center">
        <Wordmark className={className} />
        <span className="sr-only">EchoXIA</span>
      </span>
    );
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-md"
      aria-label="EchoXIA — accueil"
    >
      <Wordmark className={className} />
    </Link>
  );
}
