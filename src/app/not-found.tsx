import VaultShell from "@/components/VaultShell";
import Link from "next/link";

export default function NotFound() {
  return (
    <VaultShell maxWidth="5xl">
      <section className="border border-[#5b4d3c] bg-[#1c1b17] p-8 md:p-10">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#d25f3d]">
          // Error 404 //
        </p>

        <h1 className="mt-5 font-mono text-4xl font-bold leading-tight text-[#eee1c8] md:text-6xl">
          Case file not found.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c7bba3]">
          The page you’re looking for either moved, was archived, or does not
          exist in the vault yet.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="border border-[#e3a54b] bg-[#e3a54b] px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#171713] transition hover:bg-transparent hover:text-[#e3a54b]"
          >
            Return Home
          </Link>

          <Link
            href="/projects"
            className="border border-[#5b4d3c] px-5 py-3 text-center text-sm uppercase tracking-[0.14em] text-[#d6c6a8] transition hover:border-[#e3a54b] hover:text-[#e3a54b]"
          >
            View Projects
          </Link>

          <Link
            href="/blog"
            className="border border-[#5b4d3c] px-5 py-3 text-center text-sm uppercase tracking-[0.14em] text-[#d6c6a8] transition hover:border-[#e3a54b] hover:text-[#e3a54b]"
          >
            Read Blog
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          {
            label: "Status",
            value: "Missing route",
          },
          {
            label: "Suggested action",
            value: "Return to vault index",
          },
          {
            label: "Archive note",
            value: "No matching file found",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-[#5b4d3c] bg-[#1c1b17] p-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[#8f826d]">
              {item.label}
            </p>
            <p className="mt-3 text-[#eee1c8]">{item.value}</p>
          </div>
        ))}
      </section>
    </VaultShell>
  );
}
