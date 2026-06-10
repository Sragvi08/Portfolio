type VaultShellProps = {
  children: React.ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl";
};

const maxWidthClasses = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export default function VaultShell({
  children,
  maxWidth = "6xl",
}: VaultShellProps) {
  return (
    <main className="min-h-screen bg-[#171713] text-[#e8dcc4]">
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 py-8 sm:px-6`}>
        {children}
      </div>
    </main>
  );
}
