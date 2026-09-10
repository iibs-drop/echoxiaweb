import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const b = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  ...props,
});

export function CheckIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={2} />
      <path
        d="M4 20a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M3 9h18M8 3v4m8-4v4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M14 2v4h4M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M12 3v4M12 17v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M8 5h3v14H8zM13 5h3v14h-3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ReplayIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --- Canaux --- */

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5c.2 2.5 2 4.3 4.5 4.5.6 0 1-.5 1-1v-.6l-1.6-.7-.8.8a4 4 0 0 1-1.9-1.9l.8-.8-.7-1.6H9c-.6 0-1 .5-1 1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth={2}
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={2} />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function MessengerIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <path
        d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.9 3.3 6.4V22l3-1.7c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.4C21 6.7 17 3 12 3Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="m7.5 14 2.8-3 2 1.6 2.4-2.6-2.8 3-2-1.6L7.5 14Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...b(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
      <path
        d="M3 12h18M12 3c2.5 2.4 3.9 5.6 4 9-.1 3.4-1.5 6.6-4 9-2.5-2.4-3.9-5.6-4-9 .1-3.4 1.5-6.6 4-9Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
