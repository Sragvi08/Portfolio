import { blogPosts, focusAreas, projects } from "@/data/portfolio";
import Link from "next/link";

export default function Home() {
  return (
    <main className="vault-bg min-h-screen text-[#e8dcc4]">
      <div className="flex min-h-screen border border-[#2f2a23]">
        <aside className="vault-sidebar hidden w-72 shrink-0 border-r border-[#3d352b] p-6 xl:p-8 lg:block">
          <div className="mb-12">
            <div className="mb-5 text-3xl font-black uppercase leading-tight tracking-[0.12em] text-[#ead8b8] drop-shadow-[0_2px_0_rgba(0,0,0,0.45)] xl:text-4xl">
              SRAGVI&apos;S VAULT
            </div>
            <p className="text-base uppercase leading-7 tracking-[0.2em] text-[#c5ad88]">
              Cybersecurity & Technical Notebook
            </p>
          </div>

          <div className="vault-paper mb-10 mt-8 p-5">
            <div className="relative z-10 space-y-3">
              <p className="text-xs font-black uppercase leading-5 tracking-wide">
                Owner: Sragvi
              </p>
              <p className="text-xs font-black uppercase leading-5 tracking-wide">
                Role: Cybersecurity M.S. Student
              </p>
              <p className="text-xs font-black uppercase leading-5 tracking-wide">
                Focus: Blue Team / Defense
              </p>
              <p className="text-xs font-black uppercase leading-5 tracking-wide">
                Status: Learning + Building
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { label: "Overview", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
              { label: "GitHub", href: "https://github.com/Sragvi08" },
            ].map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className={`block border px-5 py-4 text-base uppercase tracking-[0.18em] transition ${
                  index === 0
                    ? "border-[#4a4034] bg-[#2a241d] text-[#f3a93b]"
                    : "border-transparent text-[#c5ad88] hover:border-[#4a4034] hover:bg-[#211d18] hover:text-[#e8dcc4]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 border border-[#4a4034] p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#a99b82]">
              Vault Status
            </p>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#8abf58]" />
              <span className="text-sm uppercase text-[#8abf58]">
                Operational
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#8f826d]">
              Last Updated
            </p>
            <p className="mt-2 text-xs text-[#c4b79d]">
              JUNE 8, 2026 • 21:43 UTC
            </p>
          </div>

          <div className="mt-10 border border-[#4a4034] p-5 text-[#bba98b]">
            <p>“Do NOT click on that link.” </p>
          </div>
        </aside>

        <section className="flex-1">
          <header className="border-b border-[#4a4034] px-6 py-5 md:px-10">
            <div className="flex items-center justify-between">
              <a
                href="/"
                className="font-mono text-lg text-[#e3a54b] md:text-xl"
              >
                Sragvi&apos;s Vault
              </a>

              <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#8abf58] md:flex">
                <span className="h-2 w-2 rounded-full bg-[#8abf58]" />
                Online
              </div>
            </div>

            <nav className="mt-5 flex flex-wrap gap-3 text-sm text-[#d6c6a8] md:mt-0 md:justify-end md:gap-10">
              <a
                href="/projects"
                className="border border-[#5b4d3c] px-4 py-2 transition hover:border-[#e3a54b] hover:text-[#e3a54b] md:border-0 md:px-0 md:py-0"
              >
                Projects
              </a>
              <a
                href="/blog"
                className="border border-[#5b4d3c] px-4 py-2 transition hover:border-[#e3a54b] hover:text-[#e3a54b] md:border-0 md:px-0 md:py-0"
              >
                Blog
              </a>
              <a
                href="/contact"
                className="border border-[#5b4d3c] px-4 py-2 transition hover:border-[#e3a54b] hover:text-[#e3a54b] md:border-0 md:px-0 md:py-0"
              >
                Contact
              </a>
            </nav>
          </header>

          <div className="px-4 py-7 sm:px-6 md:px-8 xl:px-10">
            <section className="grid gap-8 border-b border-[#4a4034] pb-10 lg:grid-cols-[1fr_260px]">
              <div>
                <p className="mb-5 font-mono text-sm uppercase tracking-[0.2em] text-[#e38b29]"></p>
                <h1 className="max-w-4xl font-mono text-3xl font-bold leading-tight text-[#eee1c8] sm:text-4xl md:text-3xl">
                  Practical security tools, learning notes, and secure systems
                  projects.
                </h1>
                <div className="mt-6 h-1 w-16 bg-[#e3a54b]" />
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c7bba3]">
                  Focused on blue team operations, threat detection, and secure
                  programming.
                </p>
              </div>

              <div className="border border-[#5b4d3c] p-5 text-sm">
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#e3a54b]">
                  Report Type
                </p>
                <p className="mb-5 uppercase">Portfolio Overview</p>

                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#8f826d]">
                  Author
                </p>
                <p className="mb-5 uppercase">Sragvi</p>

                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#8f826d]">
                  Version
                </p>
                <p>3.0.0</p>
              </div>
            </section>

            <section className="py-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-mono text-xl font-bold text-[#eee1c8]">
                  Featured Projects
                </h2>
                <a
                  href="/projects"
                  className="text-sm uppercase text-[#e3a54b]"
                >
                  View all projects →
                </a>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="vault-card block border border-[#5b4d3c] p-5 transition hover:-translate-y-1 hover:border-[#e3a54b]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <p className="font-mono text-sm uppercase text-[#d25f3d]">
                        {project.id}
                      </p>
                      <span className="text-[#8f826d]">▧</span>
                    </div>

                    <h3 className="mb-3 font-mono text-2xl font-bold text-[#eee1c8]">
                      {project.title}
                    </h3>
                    <p className="mb-6 text-sm leading-6 text-[#c7bba3] xl:min-h-20">
                      {project.description}
                    </p>

                    <div className="space-y-3 border-t border-[#4a4034] pt-4 text-xs uppercase tracking-[0.12em]">
                      <div className="grid grid-cols-[90px_1fr] gap-4">
                        <span className="text-[#8f826d]">Category</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="grid grid-cols-[90px_1fr] gap-4">
                        <span className="text-[#8f826d]">Status</span>
                        <span className="text-[#8abf58]">{project.status}</span>
                      </div>
                      <div className="grid grid-cols-[90px_1fr] gap-4">
                        <span className="text-[#8f826d]">Tools</span>
                        <span>{project.tools}</span>
                      </div>
                    </div>
                    <div className="mt-5 border-t border-[#4a4034] pt-4 text-sm uppercase tracking-[0.14em] text-[#e3a54b]">
                      Open case file →
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
              <div className="vault-card border border-[#5b4d3c]  p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-mono text-xl font-bold uppercase text-[#eee1c8]">
                    Learning Notes
                  </h2>
                  <a href="/blog" className="text-sm uppercase text-[#e3a54b]">
                    Read the blog →
                  </a>
                </div>

                <div className="divide-y divide-[#3c352d]">
                  {blogPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="grid gap-2 py-4 text-sm transition hover:text-[#e3a54b] md:grid-cols-[110px_1fr_auto] md:gap-3"
                    >
                      <span className="text-xs uppercase text-[#8f826d]">
                        {post.date}
                      </span>
                      <span>{post.title}</span>
                      <span className="w-fit rounded bg-[#2d3f45] px-3 py-1 text-xs text-[#b9d7dd]">
                        {post.tag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className=" vault-card border border-[#5b4d3c] bg-[#1c1b17] p-5">
                <h2 className="mb-5 font-mono text-xl font-bold uppercase text-[#eee1c8]">
                  Current Focus
                </h2>

                <div className="divide-y divide-[#3c352d]">
                  {focusAreas.map((area) => (
                    <div key={area.title} className="py-4">
                      <h3 className="font-mono text-base font-bold text-[#eee1c8]">
                        {area.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#a99b82]">{area.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="vault-card mt-8 border border-[#5b4d3c] bg-[#1c1b17] p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#e38b29]">
                    // Open Channel //
                  </p>

                  <p className="mt-4 max-w-2xl leading-7 text-[#c7bba3]">
                    I&apos;m building Sragvi&apos;s Vault as a place to document
                    projects, learning notes, and my growth into cybersecurity
                    and technical work.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <a
                    href="/contact"
                    className="border border-[#e3a54b] bg-[#e3a54b] px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#171713] transition hover:bg-transparent hover:text-[#e3a54b]"
                  >
                    Contact Me
                  </a>

                  <a
                    href="https://github.com/Sragvi08"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#5b4d3c] px-5 py-3 text-center text-sm uppercase tracking-[0.14em] text-[#d6c6a8] transition hover:border-[#e3a54b] hover:text-[#e3a54b]"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </section>
            <footer className="mt-8 border-t border-[#4a4034] py-6 text-sm text-[#8f826d]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p>
                  © 2026 Sragvi&apos;s Vault. Built with Next.js and Tailwind
                  CSS.
                </p>

                <div className="flex gap-5">
                  <a href="/projects" className="hover:text-[#e3a54b]">
                    Projects
                  </a>
                  <a href="/blog" className="hover:text-[#e3a54b]">
                    Blog
                  </a>
                  <a href="/contact" className="hover:text-[#e3a54b]">
                    Contact
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
