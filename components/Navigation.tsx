'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-light text-gray-900">
          Qala
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

