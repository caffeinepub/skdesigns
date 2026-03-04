import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServicePageTemplateProps {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  process: ProcessStep[];
}

export default function ServicePageTemplate({
  icon: Icon,
  label,
  title,
  subtitle,
  description,
  includes,
  process,
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.087 0 0)" }}>
      {/* Hero */}
      <div
        className="relative pt-40 pb-24 px-6 overflow-hidden"
        style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
      >
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 50%, oklch(0.72 0.12 75 / 0.05), transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Icon + label */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                  color: "var(--gold)",
                }}
              >
                <Icon size={20} />
              </div>
              <p className="section-label">{label}</p>
            </div>

            <h1
              className="mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 300,
                color: "oklch(0.98 0 0)",
                letterSpacing: "0.06em",
                lineHeight: 1.0,
              }}
            >
              {title}{" "}
              <em
                style={{
                  color: "var(--gold)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Design
              </em>
            </h1>

            {/* Gold line */}
            <div
              className="h-px w-20 mb-6"
              style={{ background: "var(--gold)" }}
            />

            <p
              className="text-lg mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.375rem",
                fontStyle: "italic",
                color: "oklch(0.6 0 0)",
              }}
            >
              {subtitle}
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                color: "oklch(0.55 0 0)",
                lineHeight: 1.75,
                maxWidth: "36rem",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-6">What's Included</p>
            <h2
              className="mb-8"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                fontWeight: 600,
                color: "oklch(0.98 0 0)",
                letterSpacing: "0.01em",
              }}
            >
              Everything You Need to{" "}
              <em
                style={{
                  color: "var(--gold)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Succeed
              </em>
            </h2>

            <ul className="flex flex-col gap-4">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      border: "1px solid var(--gold)",
                      color: "var(--gold)",
                    }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span
                    style={{
                      color: "oklch(0.7 0 0)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative card */}
          <div
            className="p-8 relative"
            style={{
              background: "oklch(0.108 0 0)",
              border: "1px solid oklch(0.18 0 0)",
              borderTop: "2px solid var(--gold)",
            }}
          >
            <p className="section-label mb-6">Why SKdesigns?</p>

            <div className="flex flex-col gap-6">
              {[
                {
                  n: "01",
                  text: "Conversion-first mindset — every design decision drives results.",
                },
                {
                  n: "02",
                  text: "Global aesthetic sensibility with deep cultural understanding.",
                },
                {
                  n: "03",
                  text: "Rigorous quality control and pixel-perfect execution.",
                },
                {
                  n: "04",
                  text: "Transparent communication and on-time delivery.",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-4">
                  <span
                    className="text-xs font-medium flex-shrink-0 mt-1"
                    style={{
                      color: "var(--gold)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.n}
                  </span>
                  <p
                    style={{
                      color: "oklch(0.6 0 0)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section
        className="py-24"
        style={{
          background: "oklch(0.075 0 0)",
          borderTop: "1px solid oklch(0.18 0 0)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <p className="section-label mb-5">How We Work</p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
                fontWeight: 600,
                color: "oklch(0.98 0 0)",
                letterSpacing: "0.01em",
              }}
            >
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.72 0.12 75 / 0.4), transparent)",
                      width: "calc(100% - 2rem)",
                    }}
                  />
                )}

                <div
                  className="relative z-10 p-6"
                  style={{
                    background: "oklch(0.108 0 0)",
                    border: "1px solid oklch(0.18 0 0)",
                  }}
                >
                  {/* Step number */}
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-5"
                    style={{
                      border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                      color: "var(--gold)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.step}
                  </div>

                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.375rem",
                      fontWeight: 600,
                      color: "oklch(0.98 0 0)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.5 0 0)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{
          background: "oklch(0.087 0 0)",
          borderTop: "1px solid oklch(0.18 0 0)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, oklch(0.72 0.12 75 / 0.04), transparent)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="section-label mb-6">Ready to Begin?</p>
          <h2
            className="mb-4"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
              fontWeight: 600,
              color: "oklch(0.98 0 0)",
              letterSpacing: "0.01em",
            }}
          >
            Start Your{" "}
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
              color: "oklch(0.5 0 0)",
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
            }}
          >
            Let's turn your vision into reality.
          </p>
          <Link to="/contact" className="btn-gold-outline">
            Get in Touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
