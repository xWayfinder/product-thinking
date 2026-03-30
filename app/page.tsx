import Link from "next/link";
import { modelHref, models } from "@/lib/models";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Product Thinking</p>
        <h1>Turn abstract product strategy into visual, shareable thinking.</h1>
        <p className="hero-copy">
          This static site is powered by Next.js and published on GitHub Pages.
          Add diagrams, model walkthroughs, and narrative explanations as your
          toolkit evolves.
        </p>
      </section>

      <section className="grid" aria-label="Visualization templates">
        {models.map((model) => (
          <Link
            href={modelHref(model.slug)}
            key={model.slug}
            className="card card-link"
          >
            <article>
              <div className="card-header">
                <h2>{model.title}</h2>
                <span>{model.status}</span>
              </div>
              <p>{model.description}</p>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
