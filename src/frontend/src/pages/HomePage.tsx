import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Film,
  Monitor,
  Palette,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: Monitor,
    title: "Web Design",
    description: "Conversion-focused websites that command attention.",
    to: "/web-design",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Visual identities that resonate across every touchpoint.",
    to: "/graphic-design",
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description: "Digital experiences engineered for engagement and clarity.",
    to: "/ui-ux-design",
  },
  {
    icon: Film,
    title: "Video Creation",
    description: "Cinematic content that moves audiences and drives action.",
    to: "/video-creation",
  },
];

const projects = [
  {
    title: "LuxeStay",
    category: "Real Estate Platform",
    image: "/assets/generated/project-realestate.dim_800x500.jpg",
  },
  {
    title: "Noir Fashion",
    category: "E-Commerce",
    image: "/assets/generated/project-fashion.dim_800x500.jpg",
  },
  {
    title: "Vertex",
    category: "Brand Identity",
    image: "/assets/generated/project-branding.dim_800x500.jpg",
  },
  {
    title: "Aria UI",
    category: "Mobile App",
    image: "/assets/generated/project-uiux.dim_800x500.jpg",
  },
  {
    title: "Prestige Films",
    category: "Video Campaign",
    image: "/assets/generated/project-video.dim_800x500.jpg",
  },
  {
    title: "Meridian",
    category: "Web Platform",
    image: "/assets/generated/project-web-design.dim_800x500.jpg",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3", label: "Continents Served" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function HomePage() {
  const workRef = useRef<HTMLElement>(null);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Intersection observer for scroll reveals
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.087 0 0)" }}
      >
        {/* Hero background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1920x1080.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          {/* Layered dark overlay — heavier at bottom for clean text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, oklch(0 0 0 / 0.15) 0%, oklch(0 0 0 / 0.55) 45%, oklch(0.087 0 0) 100%)",
            }}
          />
        </div>

        {/* Grain texture — tactile luxury print quality */}
        <div className="grain-overlay" />

        {/* Ghosted editorial background number — signature detail */}
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ zIndex: 1 }}
        >
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              fontSize: "clamp(14rem, 30vw, 28rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: "oklch(0.98 0 0 / 0.025)",
              display: "block",
              transform: "translateX(8%)",
              userSelect: "none",
            }}
          >
            SK
          </span>
        </div>

        {/* Content — slightly above center for optical weight */}
        <div
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
          style={{ marginTop: "-5vh" }}
        >
          {/* Pre-headline label */}
          <p className="section-label animate-fade-in mb-10">
            Premium Design Studio — India
          </p>

          {/* Main headline — light weight is the luxury tell */}
          <h1
            className="animate-slide-up animation-delay-200"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 300,
              color: "oklch(0.98 0 0)",
              letterSpacing: "0.06em",
              lineHeight: 0.95,
              marginBottom: "2rem",
            }}
          >
            Bold Design.
            <br />
            <em
              style={{
                color: "var(--gold)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              Global Impact.
            </em>
          </h1>

          {/* Gold animated accent line */}
          <div className="flex justify-center mb-8">
            <div
              className="h-px animate-gold-line"
              style={{ background: "var(--gold)", width: "6rem" }}
            />
          </div>

          {/* Subheadline */}
          <p
            className="animate-slide-up animation-delay-400 mb-12"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.7rem, 1.5vw, 0.8125rem)",
              fontWeight: 400,
              color: "oklch(0.5 0 0)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Web
            Design&nbsp;&nbsp;·&nbsp;&nbsp;Branding&nbsp;&nbsp;·&nbsp;&nbsp;UI/UX&nbsp;&nbsp;·&nbsp;&nbsp;Creative
            Media
          </p>

          {/* CTA buttons */}
          <div className="animate-slide-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              type="button"
              className="btn-gold-outline"
              onClick={scrollToWork}
            >
              View Portfolio
            </button>
            <Link to="/contact" className="btn-gold-outline">
              Book a Consultation
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-scroll-bounce"
          style={{ zIndex: 10 }}
        >
          <div
            className="h-10 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.72 0.12 75 / 0.6))",
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "oklch(0.4 0 0)",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section
        className="pt-28 pb-32 lg:pt-36 lg:pb-40"
        style={{ background: "oklch(0.087 0 0)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-20">
            <p className="section-label mb-5">Our Expertise</p>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                  fontWeight: 600,
                  color: "oklch(0.98 0 0)",
                  letterSpacing: "0.01em",
                }}
              >
                What We Do
              </h2>
              <div
                className="h-px flex-1 max-w-xs"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.72 0.12 75 / 0.25), transparent)",
                  minWidth: "4rem",
                }}
              />
            </div>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  to={service.to}
                  className="service-card group block"
                >
                  <div
                    className="mb-5 w-12 h-12 flex items-center justify-center transition-colors duration-300"
                    style={{
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                      color: "var(--gold)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="mb-3 transition-colors duration-300 group-hover:text-[oklch(0.72_0.12_75)]"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.375rem",
                      fontWeight: 600,
                      color: "oklch(0.98 0 0)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    {service.description}
                  </p>
                  <div
                    className="mt-5 flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-[oklch(0.72_0.12_75)]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "oklch(0.45 0 0)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Learn More
                    <ArrowRight size={10} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Work Section ── */}
      <section
        ref={workRef}
        className="pt-32 pb-36 lg:pt-40 lg:pb-44"
        style={{ background: "oklch(0.075 0 0)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-20">
            <p className="section-label mb-5">Portfolio</p>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                  fontWeight: 600,
                  color: "oklch(0.98 0 0)",
                  letterSpacing: "0.01em",
                }}
              >
                Selected Work
              </h2>
              <div
                className="h-px flex-1 max-w-xs"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.72 0.12 75 / 0.25), transparent)",
                  minWidth: "4rem",
                }}
              />
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card group aspect-[8/5] rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(0.18 0 0)" }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay absolute inset-0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="w-8 h-px mb-3 transition-all duration-300 group-hover:w-12"
                      style={{ background: "var(--gold)" }}
                    />
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        color: "var(--gold)",
                        letterSpacing: "0.18em",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {project.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "oklch(0.98 0 0)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section
        className="pt-32 pb-36 lg:pt-40 lg:pb-44"
        style={{ background: "oklch(0.087 0 0)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div>
              <p className="section-label mb-6">Who We Are</p>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(2.75rem, 5vw, 4rem)",
                  fontWeight: 600,
                  color: "oklch(0.98 0 0)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.05,
                }}
              >
                About{" "}
                <em
                  style={{
                    color: "var(--gold)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  SKdesigns
                </em>
              </h2>

              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.0625rem",
                  color: "oklch(0.6 0 0)",
                  lineHeight: 1.8,
                }}
              >
                We are a strategic design studio redefining how brands
                communicate in a global market. From India, we craft
                conversion-focused digital experiences trusted by clients in the
                USA, UK, and UAE. Every pixel is intentional. Every interaction
                is designed to convert.
              </p>

              <Link to="/contact" className="btn-gold-outline inline-flex">
                Start a Project
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: Stats with vertical gold divider */}
            <div className="relative">
              {/* Vertical gold line on desktop */}
              <div
                className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--gold), transparent)",
                }}
              />

              <div className="lg:pl-12 flex flex-col gap-12">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-start gap-6">
                    <span
                      className="text-xs tracking-widest"
                      style={{
                        color: "oklch(0.35 0 0)",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.1em",
                        minWidth: "1.5rem",
                        paddingTop: "0.75rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "3.5rem",
                          fontWeight: 600,
                          color: "var(--gold)",
                          lineHeight: 1.0,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="text-sm tracking-widest uppercase"
                        style={{
                          color: "oklch(0.5 0 0)",
                          fontFamily: "Inter, sans-serif",
                          letterSpacing: "0.15em",
                          marginTop: "0.25rem",
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA Section ── */}
      <section
        className="pt-28 pb-32 lg:pt-36 lg:pb-40 text-center relative overflow-hidden"
        style={{ background: "oklch(0.075 0 0)" }}
      >
        {/* Decorative background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.72 0.12 75 / 0.04), transparent)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="section-label mb-6">Let's Collaborate</p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 600,
              color: "oklch(0.98 0 0)",
              letterSpacing: "0.01em",
              lineHeight: 1.0,
            }}
          >
            Start a{" "}
            <em
              style={{
                color: "var(--gold)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              Project
            </em>
          </h2>
          <p
            className="mb-10 text-lg"
            style={{
              color: "oklch(0.55 0 0)",
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
            }}
          >
            Tell us about your vision.
          </p>

          {/* Gold line decoration */}
          <div className="flex justify-center mb-10">
            <div
              className="h-px w-24"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--gold), transparent)",
              }}
            />
          </div>

          <Link to="/contact" className="btn-gold-outline">
            Get in Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
