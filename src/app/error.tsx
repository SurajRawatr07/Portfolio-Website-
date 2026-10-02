'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-ink px-4 text-center">
      <h1 className="text-6xl sm:text-7xl font-bold font-bold-serif tracking-tight mb-2">500</h1>
      <h2 className="text-lg sm:text-xl font-bold font-bold-serif uppercase tracking-tight mb-3">Something went wrong</h2>
      <p className="text-warm/90 font-italic-serif text-sm sm:text-base leading-relaxed mb-6 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 rounded-full bg-ink text-cream hover:bg-surface-border transition-colors font-bold-serif uppercase tracking-[0.12em] font-semibold text-xs cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-full border border-ink text-ink hover:bg-ink hover:text-cream transition-colors font-bold-serif uppercase tracking-[0.12em] font-semibold text-xs"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
