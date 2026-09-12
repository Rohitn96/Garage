export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[clamp(2.15rem,3.8vw,3.1rem)] leading-none tracking-[-0.015em] ${className}`}>
      Revamp <span className="italic text-accent">Motors</span>
    </span>
  );
}
