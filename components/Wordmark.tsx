export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.35rem] leading-none tracking-[-0.01em] ${className}`}>
      Revamp <span className="italic text-pine">Motors</span>
    </span>
  );
}
