import { blogPosts } from "@/data/portfolio";
import VaultShell from "@/components/VaultShell";
import { notFound } from "next/navigation";
import Link from "next/link";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <VaultShell maxWidth="4xl">
      <article className="mx-auto max-w-4xl px-6 py-8">
        <header className="mb-8 border-b border-[#4a4034] pb-8">
          <Link
            href="/blog"
            className="text-sm uppercase tracking-[0.14em] text-[#e3a54b]"
          >
            ← Back to Blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase text-[#8f826d]">
              {post.date}
            </span>
            <span className="rounded bg-[#2d3f45] px-3 py-1 text-xs text-[#b9d7dd]">
              {post.tag}
            </span>
          </div>

          <h1 className="mt-5 font-mono text-4xl font-bold leading-tight text-[#eee1c8] md:text-6xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#c7bba3]">
            {post.summary}
          </p>
        </header>

        <section className="space-y-6 text-lg leading-9 text-[#c7bba3]">
          {post.content
            .trim()
            .split("\n\n")
            .map((block, index) => {
              const trimmedBlock = block.trim();
              if (trimmedBlock.startsWith("## ")) {
                return (
                  <h2
                    key={`heading-${index}`}
                    className="pt-8 font-mono text-3xl font-bold leading-tight text-[#eee1c8]"
                  >
                    {trimmedBlock.replace("## ", "")}
                  </h2>
                );
              }
              return <p key={`paragraph-${index}`}>{trimmedBlock}</p>;
            })}
        </section>

        <footer className="mt-12 border-t border-[#4a4034] pt-6">
          <Link
            href="/blog"
            className="text-sm uppercase tracking-[0.14em] text-[#e3a54b]"
          >
            Read more notes →
          </Link>
        </footer>
      </article>
    </VaultShell>
  );
}
