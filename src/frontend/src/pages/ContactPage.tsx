import { Calendar, Loader2, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const projectTypes = [
  "Web Design",
  "Graphic Design",
  "UI/UX Design",
  "Video Creation",
  "Other",
];

export default function ContactPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (!actor) {
        toast.error("Connection not ready. Please try again.");
        setLoading(false);
        return;
      }
      await actor.submit(form.name, form.email, form.projectType, form.message);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", projectType: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.087 0 0)" }}>
      {/* Hero */}
      <div
        className="pt-40 pb-20 px-6 text-center relative overflow-hidden"
        style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, oklch(0.72 0.12 75 / 0.06), transparent)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="section-label mb-6">Get in Touch</p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: 300,
              color: "oklch(0.98 0 0)",
              letterSpacing: "0.06em",
              lineHeight: 0.95,
            }}
          >
            Let's Work{" "}
            <em
              style={{
                color: "var(--gold)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              Together
            </em>
          </h1>
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "1.375rem",
              fontStyle: "italic",
              color: "oklch(0.55 0 0)",
            }}
          >
            Based in India. Built for the world.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="section-label mb-6">Contact Info</p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                      color: "var(--gold)",
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        color: "oklch(0.45 0 0)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Email
                    </p>
                    <p
                      style={{
                        color: "oklch(0.78 0 0)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9375rem",
                      }}
                    >
                      hello@skdesigns.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                      color: "var(--gold)",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        color: "oklch(0.45 0 0)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Location
                    </p>
                    <p
                      style={{
                        color: "oklch(0.78 0 0)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9375rem",
                      }}
                    >
                      India — Remote Worldwide
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "oklch(0.5 0 0)" }}
                    >
                      Serving USA · UK · UAE · and beyond
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly block */}
            <div
              className="p-6 flex flex-col gap-4"
              style={{
                background: "oklch(0.108 0 0)",
                border: "1px solid oklch(0.18 0 0)",
                borderTop: "2px solid var(--gold)",
              }}
            >
              <div className="flex items-center gap-3">
                <Calendar size={16} style={{ color: "var(--gold)" }} />
                <p
                  className="text-sm font-medium tracking-wider uppercase"
                  style={{
                    color: "oklch(0.75 0 0)",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.12em",
                    fontSize: "0.75rem",
                  }}
                >
                  Schedule a Call
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                Prefer to talk first? Schedule a free 30-minute consultation.
              </p>
              <button
                type="button"
                className="btn-gold-outline text-center justify-center text-xs"
                style={{ padding: "0.625rem 1.25rem" }}
              >
                Book Free Consultation
              </button>
            </div>

            {/* Thin gold decorative line */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, var(--gold), transparent)",
              }}
            />

            <p
              className="text-sm italic leading-relaxed"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.1rem",
                color: "oklch(0.45 0 0)",
              }}
            >
              "Every great brand starts with a bold conversation. Let's have
              ours."
            </p>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <p className="section-label mb-8">Send a Message</p>

            {submitted ? (
              <div
                className="py-20 text-center"
                style={{
                  background: "oklch(0.108 0 0)",
                  border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                  style={{
                    border: "1px solid var(--gold)",
                    color: "var(--gold)",
                  }}
                >
                  <Mail size={24} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "oklch(0.98 0 0)",
                  }}
                >
                  Message Sent
                </h3>
                <p style={{ color: "oklch(0.55 0 0)" }}>
                  We'll be in touch within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn-gold-outline mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs tracking-widest uppercase"
                      style={{
                        color: "oklch(0.55 0 0)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none"
                      style={{
                        background: "oklch(0.108 0 0)",
                        border: "1px solid oklch(0.22 0 0)",
                        color: "oklch(0.9 0 0)",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.12 75 / 0.6)";
                        e.target.style.boxShadow =
                          "0 0 0 1px oklch(0.72 0.12 75 / 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "oklch(0.22 0 0)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs tracking-widest uppercase"
                      style={{
                        color: "oklch(0.55 0 0)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@yourcompany.com"
                      autoComplete="email"
                      className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none"
                      style={{
                        background: "oklch(0.108 0 0)",
                        border: "1px solid oklch(0.22 0 0)",
                        color: "oklch(0.9 0 0)",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor =
                          "oklch(0.72 0.12 75 / 0.6)";
                        e.target.style.boxShadow =
                          "0 0 0 1px oklch(0.72 0.12 75 / 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "oklch(0.22 0 0)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="projectType"
                    className="text-xs tracking-widest uppercase"
                    style={{
                      color: "oklch(0.55 0 0)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer"
                    style={{
                      background: "oklch(0.108 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      color: form.projectType
                        ? "oklch(0.9 0 0)"
                        : "oklch(0.45 0 0)",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.72 0.12 75 / 0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 1px oklch(0.72 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.22 0 0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option
                      value=""
                      disabled
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      Select a service
                    </option>
                    {projectTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        style={{
                          background: "oklch(0.108 0 0)",
                          color: "oklch(0.9 0 0)",
                        }}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs tracking-widest uppercase"
                    style={{
                      color: "oklch(0.55 0 0)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project — the vision, the timeline, the goals..."
                    rows={6}
                    className="w-full px-4 py-3 text-sm transition-all duration-200 outline-none resize-none"
                    style={{
                      background: "oklch(0.108 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      color: "oklch(0.9 0 0)",
                      fontFamily: "Inter, sans-serif",
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "oklch(0.72 0.12 75 / 0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 1px oklch(0.72 0.12 75 / 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "oklch(0.22 0 0)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <p
                    className="text-xs"
                    style={{
                      color: "oklch(0.4 0 0)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    We respond within 24 hours.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold-filled"
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
