import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Web Design", to: "/web-design" },
  { label: "Graphic Design", to: "/graphic-design" },
  { label: "UI/UX Design", to: "/ui-ux-design" },
  { label: "Video Creation", to: "/video-creation" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally triggers on path change only
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.087 0 0)"
            : "linear-gradient(to bottom, oklch(0 0 0 / 0.6), transparent)",
          borderBottom: scrolled
            ? "1px solid oklch(0.72 0.12 75 / 0.35)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/generated/sk-logo-mark-transparent.dim_200x200.png"
                alt="SKdesigns mark"
                className="h-10 w-10 object-contain"
              />
              <span
                className="text-xl font-semibold tracking-widest uppercase"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "oklch(0.98 0 0)",
                }}
              >
                SK<span style={{ color: "var(--gold)" }}>designs</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = currentPath === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`gold-underline text-sm tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? "active" : ""
                    }`}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      color: isActive ? "var(--gold)" : "oklch(0.75 0 0)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 transition-colors"
              style={{ color: "var(--gold)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        {/* Backdrop */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click-to-dismiss is supplementary */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0 0 0 / 0.7)" }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className="absolute top-0 right-0 h-full w-72 flex flex-col pt-24 pb-8 px-8 transition-transform duration-300"
          style={{
            background: "oklch(0.087 0 0)",
            borderLeft: "1px solid oklch(0.72 0.12 75 / 0.25)",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Gold top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "var(--gold)" }}
          />

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 group"
                  style={{
                    color: isActive ? "var(--gold)" : "oklch(0.8 0 0)",
                  }}
                >
                  {isActive && (
                    <span
                      className="w-4 h-px"
                      style={{ background: "var(--gold)" }}
                    />
                  )}
                  <span
                    className="text-sm tracking-widest uppercase transition-colors duration-200 group-hover:text-[oklch(0.72_0.12_75)]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: isActive ? 500 : 400,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.4 0 0)", letterSpacing: "0.2em" }}
            >
              Bold Design.
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
            >
              Global Impact.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
