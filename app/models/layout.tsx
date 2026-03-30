import Link from "next/link";
import type { ReactNode } from "react";

export default function ModelsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="model-nav" aria-label="Model section">
        <Link href="/" className="model-nav-link">
          ← Back to home
        </Link>
      </nav>
      {children}
    </>
  );
}
