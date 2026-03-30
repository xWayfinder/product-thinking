import { modelBySlug } from "@/lib/models";

type ModelPlaceholderProps = {
  slug: string;
};

export function ModelPlaceholder({ slug }: ModelPlaceholderProps) {
  const m = modelBySlug(slug);
  if (!m) {
    return null;
  }

  return (
    <main className="page-shell model-page">
      <header className="model-header">
        <p className="eyebrow">{m.status}</p>
        <h1>{m.title}</h1>
        <p className="hero-copy">{m.description}</p>
        <p className="hero-copy model-placeholder-note">Walkthrough coming soon.</p>
      </header>
    </main>
  );
}
