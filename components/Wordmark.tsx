export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-wordmark uppercase ${className}`}>
      Rudra<span className="text-rust">.</span>Motors
    </span>
  );
}
