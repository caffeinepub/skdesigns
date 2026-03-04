import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Web Design", to: "/web-design" },
  { label: "Graphic Design", to: "/graphic-design" },
  { label: "UI/UX Design", to: "/ui-ux-design" },
  { label: "Video Creation", to: "/video-creation" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-0"
      style={{
        background: "oklch(0.087 0 0)",
        borderTop: "1px solid oklch(0.72 0.12 75 / 0.3)",
      }}
    >
      {/* Gold top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.72 0.12 75 / 0.6), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/sk-logo-mark-transparent.dim_200x200.png"
                alt="SKdesigns"
                className="h-10 w-10 object-contain"
              />
              <span
                className="text-lg font-semibold tracking-widest uppercase"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "oklch(0.98 0 0)",
                }}
              >
                SK<span style={{ color: "var(--gold)" }}>designs</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "oklch(0.65 0 0)",
              }}
            >
              Bold Design. Global Impact.
            </p>
            <p
              className="text-xs tracking-wider"
              style={{ color: "oklch(0.4 0 0)", letterSpacing: "0.08em" }}
            >
              Strategic design studio from India,
              <br />
              serving global brands.
            </p>
          </div>

          {/* Center: Nav */}
          <div className="flex flex-col gap-4">
            <p className="section-label mb-2">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm tracking-wider uppercase transition-colors duration-200 w-fit gold-underline"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    color: "oklch(0.55 0 0)",
                    letterSpacing: "0.1em",
                    fontSize: "0.75rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Location + attribution */}
          <div className="flex flex-col gap-4">
            <p className="section-label mb-2">Location</p>
            <p className="text-sm" style={{ color: "oklch(0.65 0 0)" }}>
              Based in India.
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>
              Serving the World.
            </p>
            <p className="text-xs mt-2" style={{ color: "oklch(0.45 0 0)" }}>
              USA · UK · UAE · and beyond
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid oklch(0.18 0 0)" }}
        >
          <p
            className="text-xs tracking-wider"
            style={{ color: "oklch(0.4 0 0)", letterSpacing: "0.08em" }}
          >
            © {year} SKdesigns. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.35 0 0)" }}>
            Built with <span style={{ color: "var(--gold)" }}>♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-[oklch(0.72_0.12_75)]"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
