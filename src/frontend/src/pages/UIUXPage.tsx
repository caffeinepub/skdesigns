import { Smartphone } from "lucide-react";
import ServicePageTemplate from "../components/ServicePageTemplate";

const includes = [
  "User research, personas, and journey mapping",
  "Information architecture and user flow diagrams",
  "Low and high-fidelity wireframes for all key screens",
  "Interactive prototypes for user testing and stakeholder review",
  "Design system creation — components, tokens, and documentation",
  "Usability testing, iteration, and design handoff to developers",
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Research your users, map pain points, and define the experience vision.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Information architecture, user flows, and interaction principles.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Wireframes to polished UI with a complete, scalable design system.",
  },
  {
    step: "04",
    title: "Delivery",
    description:
      "Clickable prototype, design tokens, and developer-ready Figma files.",
  },
];

export default function UIUXPage() {
  return (
    <ServicePageTemplate
      icon={Smartphone}
      label="Service — UI/UX Design"
      title="UI/UX"
      subtitle="Experiences engineered for clarity and conversion."
      description="We design digital products that users love and businesses depend on. From research to pixel-perfect interfaces, our UI/UX process is grounded in data, refined by empathy, and built for scale."
      includes={includes}
      process={process}
    />
  );
}
