

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] py-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-text-secondary)] font-mono">
          © 2026 MCP OPTIMIZER. ALL RIGHTS RESERVED.
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] font-mono">
          BUILT WITH KINETIC PRECISION.
        </p>
      </div>
    </footer>
  );
}
