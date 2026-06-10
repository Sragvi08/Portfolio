type VaultPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export default function VaultPageHeader({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back to Vault",
}: VaultPageHeaderProps) {
  return (
    <header className="mb-10 border-b border-[#4a4034] pb-8">
      <a
        href={backHref}
        className="text-sm uppercase tracking-[0.14em] text-[#e3a54b] hover:text-[#f0b45b]"
      >
        ← {backLabel}
      </a>

      <p className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-[#e38b29]">
        // {eyebrow} //
      </p>

      <h1 className="mt-4 font-mono text-4xl font-bold leading-tight text-[#eee1c8] sm:text-5xl md:text-6xl">
        {title}
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#c7bba3]">
        {description}
      </p>
    </header>
  );
}
