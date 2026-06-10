import VaultPageHeader from "@/components/VaultPageHeader";
import VaultShell from "@/components/VaultShell";
import Link from "next/link";
const contactLinks = [
  {
    label: "GitHub",
    description: "View my code, projects, and technical experiments.",
    action: "Open GitHub →",
    href: "https://github.com/Sragvi08",
  },
  {
    label: "LinkedIn",
    description: "Connect with me professionally and view my experience.",
    action: "Open LinkedIn →",
    href: "https://www.linkedin.com/in/sragvi-shetty-143143229/",
  },
  {
    label: "Email",
    description: "Reach out about opportunities, projects, or collaboration.",
    action: "Send Email →",
    href: "mailto:sragvishetty21@gmail.com",
  },
];

const interests = [
  "Cybersecurity internships",
  "Blue team / SOC operations",
  "Threat detection projects",
  "Application security",
  "Cloud security labs",
  "Secure systems programming",
];

export default function ContactPage() {
  return (
    <VaultShell>
      <VaultPageHeader
        eyebrow="Contact"
        title="Let’s connect."
        description="I’m a Cybersecurity Master’s student building projects around security tooling, secure systems, and technical learning. I’m open to internships, project collaborations, and entry-level cybersecurity opportunities."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 md:grid-cols-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="border border-[#5b4d3c] bg-[#1c1b17] p-6 transition hover:-translate-y-1 hover:border-[#e3a54b]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#e3a54b]">
                {link.label}
              </p>

              <p className="mt-4 min-h-16 text-base leading-7 text-[#c7bba3]">
                {link.description}
              </p>

              <p className="mt-6 text-sm uppercase tracking-[0.14em] text-[#e3a54b]">
                {link.action}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 border border-[#5b4d3c] bg-[#1c1b17] p-6">
        <div className="mb-6 flex items-center justify-between border-b border-[#4a4034] pb-4">
          <h2 className="font-mono text-2xl font-bold text-[#eee1c8]">
            Current Interests
          </h2>

          <span className="text-xs uppercase tracking-[0.14em] text-[#8f826d]">
            Open to learning
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((item) => (
            <div
              key={item}
              className="border border-[#3c352d] bg-[#171713] px-4 py-3 text-[#c7bba3]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border border-[#5b4d3c] bg-[#1c1b17] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[#e3a54b]">
          Contact Note
        </p>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c7bba3]">
          The best way to reach me is through email or LinkedIn. I&apos;m
          especially interested in conversations around cybersecurity projects,
          blue team learning, application security, and early-career security
          opportunities.
        </p>
      </section>
    </VaultShell>
  );
}
