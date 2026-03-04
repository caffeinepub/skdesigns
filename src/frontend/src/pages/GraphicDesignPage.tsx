import { Palette } from "lucide-react";
import ServicePageTemplate from "../components/ServicePageTemplate";

const includes = [
  "Brand identity design — logo, color system, typography",
  "Visual brand guidelines and usage documentation",
  "Marketing collateral: brochures, presentations, flyers",
  "Social media templates and digital asset kits",
  "Packaging design and product visualization",
  "Print-ready files in all standard formats",
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understanding your brand values, audience, and competitive landscape thoroughly.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Mood boards, concept directions, and creative briefs to align on vision.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Multiple creative concepts with refinement rounds until perfect execution.",
  },
  {
    step: "04",
    title: "Delivery",
    description:
      "Final files in all formats with a complete brand guidelines document.",
  },
];

export default function GraphicDesignPage() {
  return (
    <ServicePageTemplate
      icon={Palette}
      label="Service — Graphic Design"
      title="Graphic"
      subtitle="Identities that leave a lasting impression."
      description="Great graphic design is the silent ambassador of your brand. We craft visual systems that communicate authority, build trust, and distinguish your brand from every competitor in the room."
      includes={includes}
      process={process}
    />
  );
}
