import VaultPageHeader from "@/components/VaultPageHeader";
import VaultShell from "@/components/VaultShell";
import { blogPosts } from "@/data/portfolio";
import Link from "next/link";

export default function BlogPage() {
  return (
    <VaultShell>
      <VaultPageHeader
        eyebrow="Blog"
        title="Learning Notes"
        description="Notes from projects, cybersecurity concepts, debugging sessions, technical rabbit holes, and things I’m learning along the way."
      />

      <section className="grid gap-5">
        {blogPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="grid gap-5 border border-[#5b4d3c] bg-[#1c1b17] p-6 transition hover:-translate-y-1 hover:border-[#e3a54b] md:grid-cols-[120px_1fr_150px]"
          >
            <div>
              <p className="font-mono text-xs uppercase text-[#8f826d]">
                {post.date}
              </p>
            </div>

            <div>
              <h2 className="font-mono text-2xl font-bold text-[#eee1c8]">
                {post.title}
              </h2>
              <p className="mt-3 leading-7 text-[#c7bba3]">{post.summary}</p>
            </div>

            <div className="flex items-start justify-start md:justify-end">
              <span className="rounded bg-[#2d3f45] px-3 py-1 text-xs text-[#b9d7dd]">
                {post.tag}
              </span>
            </div>
          </a>
        ))}
      </section>
    </VaultShell>
  );
}
