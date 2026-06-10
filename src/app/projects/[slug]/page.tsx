import VaultShell from "@/components/VaultShell";
import { projects } from "@/data/portfolio";
import { notFound } from "next/navigation";
import Link from "next/link";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function SeverityBadge({ severity }: { severity: string }) {
  const styles =
    severity === "High"
      ? "border-[#b8503c] text-[#ff8a70]"
      : severity === "Medium"
        ? "border-[#b88738] text-[#f0b45b]"
        : "border-[#6c8b4f] text-[#a8c77d]";

  return (
    <span
      className={`border px-3 py-1 text-xs uppercase tracking-[0.14em] ${styles}`}
    >
      {severity} Priority
    </span>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <VaultShell>
      <header className="mb-8 flex items-center justify-between border-b border-[#4a4034] pb-6">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.14em] text-[#e3a54b]"
        >
          ← Back to Vault
        </Link>

        <a
          href={project.repoUrl}
          target="_blank"
          className="group relative overflow-hidden border border-[#f0b45b] bg-[#dca85b] px-3 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-[#171713] shadow-[0_0_24px_rgba(240,180,91,0.22)] transition hover:-translate-y-0.5 hover:bg-[#171713] hover:text-[#f0b45b] hover:shadow-[0_0_32px_rgba(240,180,91,0.35)]"
        >
          View GitHub →
        </a>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="border border-[#5b4d3c] bg-[#1c1b17] p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm uppercase text-[#d25f3d]">
              {project.id}
            </p>
            <SeverityBadge severity={project.severity} />
          </div>

          <h1 className="font-mono text-4xl font-bold leading-tight text-[#eee1c8] md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#c7bba3]">
            {project.overview}
          </p>
        </div>

        <aside className="border border-[#5b4d3c] bg-[#1c1b17] p-6">
          <p className="mb-5 text-xs uppercase tracking-[0.16em] text-[#e3a54b]">
            Case Metadata
          </p>

          <div className="space-y-5 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Type
              </p>
              <p className="mt-1 text-[#eee1c8]">{project.type}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Category
              </p>
              <p className="mt-1 text-[#eee1c8]">{project.category}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Status
              </p>
              <p className="mt-1 text-[#8abf58]">{project.status}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Tools
              </p>
              <p className="mt-1 leading-6 text-[#eee1c8]">{project.tools}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-6 border border-[#5b4d3c] bg-[#1c1b17] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[#e3a54b]">
          Objective
        </p>
        <p className="mt-3 text-lg leading-8 text-[#c7bba3]">
          {project.objective}
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <ReportPanel title="Security Focus" items={project.securityFocus} />
        <ReportPanel
          title="Technical Details"
          items={project.technicalDetails}
        />
        <ReportPanel title="Findings" items={project.findings} />
        <ReportPanel
          title="Defensive Takeaways"
          items={project.defensiveTakeaways}
        />
      </section>
    </VaultShell>
  );
}

function ReportPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-[#5b4d3c] bg-[#1c1b17] p-6">
      <h2 className="font-mono text-2xl font-bold text-[#eee1c8]">{title}</h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-[#c7bba3]">
            <span className="mt-1 text-[#e3a54b]">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
