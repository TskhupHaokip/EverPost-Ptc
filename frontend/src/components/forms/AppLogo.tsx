
export default function AppLogo() {
  return (
    <svg
      viewBox="0 0 120 120"
      width="108"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="App logo"
    >
      <defs>
        <linearGradient id="appLogoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect
        x="9"
        y="9"
        width="102"
        height="102"
        rx="27"
        fill="url(#appLogoGradient)"
      />
      <path
        d="M37 29 H62 C81 29 93 41 93 60 S81 91 62 91 H37 Z"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M37 54 L49 65 L72 42"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="39" y="70" width="9" height="10" rx="3" fill="#f8fafc" />
      <rect x="53" y="63" width="9" height="17" rx="3" fill="#f8fafc" />
      <rect x="67" y="53" width="9" height="27" rx="3" fill="#f8fafc" />
    </svg>
  );
}
