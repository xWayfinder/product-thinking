export default function Home() {
  const models = [
    {
      title: "Opportunity Solution Tree",
      description:
        "Map outcomes to opportunities and experiments so your team can prioritize by impact.",
      status: "Planned",
    },
    {
      title: "North Star Breakdown",
      description:
        "Break your North Star metric into leading indicators and initiative bets.",
      status: "In Progress",
    },
    {
      title: "Risk Radar",
      description:
        "Track product, technical, and adoption risks with explicit mitigation actions.",
      status: "Draft",
    },
  ];

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
          <article className="card" key={model.title}>
            <div className="card-header">
              <h2>{model.title}</h2>
              <span>{model.status}</span>
            </div>
            <p>{model.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
