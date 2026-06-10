import VaultPageHeader from "@/components/VaultPageHeader";
import VaultShell from "@/components/VaultShell";
import { projects } from "@/data/portfolio";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <VaultShell>
      <VaultPageHeader
        eyebrow="Project Archive"
        title="Project Archive"
        description="Security tools, software projects, systems programming work, and technical builds documented as case files."
      />

      <section className="grid gap-5">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="grid gap-5 border border-[#5b4d3c] bg-[#1c1b17] p-6 transition hover:border-[#e3a54b] lg:grid-cols-[180px_1fr_220px]"
          >
            <div>
              <p className="font-mono text-sm uppercase text-[#d25f3d]">
                {project.id}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                {project.type}
              </p>
            </div>

            <div>
              <h2 className="font-mono text-2xl font-bold text-[#eee1c8]">
                {project.title}
              </h2>
              <p className="mt-3 leading-7 text-[#c7bba3]">
                {project.description}
              </p>
            </div>

            <div className="text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Status
              </p>
              <p className="mt-1 text-[#8abf58]">{project.status}</p>

              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#8f826d]">
                Tools
              </p>
              <p className="mt-1 leading-6 text-[#eee1c8]">{project.tools}</p>
            </div>
          </a>
        ))}
      </section>
    </VaultShell>
  );
}
