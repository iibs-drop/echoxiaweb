"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "./icons";

export type FaqItem = {
  question: string;
  answer: string;
};

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-base font-semibold text-brand-dark sm:text-lg">
            {item.question}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 flex-none text-accent transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5 pr-8 text-brand-dark/75"
      >
        <p className="leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="rounded-xl2 border border-line bg-white p-2 shadow-soft sm:p-4">
      {items.map((item, i) => (
        <FaqRow key={i} item={item} />
      ))}
    </div>
  );
}
