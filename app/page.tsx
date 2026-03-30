import Link from "next/link";
import { modelHref, models } from "@/lib/models";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Product Thinking</p>
        <h1>Product Principles & Mental Models</h1>
        <p className="hero-copy">
        A collection of helpful product principles and mental models to help you make better product decisions faster.
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
