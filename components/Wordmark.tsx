export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none tracking-[-0.015em] ${className}`}>
      Revamp <span className="italic text-pine">Motors</span>
    </span>
  );
}
