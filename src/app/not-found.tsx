import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-ink px-4 text-center">
      <h1 className="text-6xl sm:text-7xl font-bold font-bold-serif tracking-tight mb-2">404</h1>
      <h2 className="text-lg sm:text-xl font-bold font-bold-serif uppercase tracking-tight mb-3">Page Not Found</h2>
      <p className="text-warm/90 font-italic-serif text-sm sm:text-base leading-relaxed mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream hover:bg-surface-border transition-colors font-bold-serif uppercase tracking-[0.12em] font-semibold text-xs"
      >
        Return Home →
      </Link>
    </div>
  );
}
