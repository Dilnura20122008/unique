export function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21.05 3.53 2.9 10.6c-1.24.5-1.23 1.2-.22 1.5l4.65 1.45 1.8 5.5c.22.6.11.83.75.83.5 0 .72-.23 1-.5l2.4-2.3 4.98 3.65c.92.5 1.58.24 1.82-.85l3.3-15.5c.34-1.35-.5-1.95-1.33-1.35Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
