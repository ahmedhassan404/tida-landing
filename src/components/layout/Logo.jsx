import { useId } from "react";

export default function Logo({ className, label }) {
  const titleId = useId();

  return (
    <svg
      direction="ltr"
      className={className}
      viewBox="0 0 245 76"
      role="img"
      aria-labelledby={titleId}
      translate="no"
    >
      <title id={titleId}>{label}</title>
      <path
        d="M18 32C24 20 34 12 47 9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M38 6L51 7L47 20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <text className="logo-word" direction="ltr" textAnchor="start" x="10" y="53">
        TIDA
      </text>
      <text className="logo-sub" direction="ltr" textAnchor="start" x="14" y="70">
        BUSINESS SOLUTIONS
      </text>
    </svg>
  );
}
