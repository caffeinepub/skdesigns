import { Monitor } from "lucide-react";
import ServicePageTemplate from "../components/ServicePageTemplate";

const includes = [
  "Custom responsive website design from the ground up",
  "Mobile-first development with cross-browser compatibility",
  "SEO-optimized page structure and semantic HTML",
  "Performance-tuned for Core Web Vitals and page speed",
  "Conversion rate optimization (CRO) built into every page",
  "CMS integration (Webflow, WordPress, or headless solutions)",
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, audience, and goals to define what success looks like.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Sitemap, wireframes, and UX architecture — everything planned before a pixel is touched.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "High-fidelity visuals crafted with precision, feedback cycles, and brand alignment.",
  },
  {
    step: "04",
    title: "Delivery",
    description:
      "Pixel-perfect build with QA, launch support, and handoff documentation.",
  },
];

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      icon={Monitor}
      label="Service — Web Design"
      title="Web"
      subtitle="Websites that convert visitors into clients."
      description="We build strategic, performance-first websites that reflect the quality of your brand. From landing pages to complex platforms, every site we create is a precision instrument for business growth."
      includes={includes}
      process={process}
    />
  );
}
