import { Film } from "lucide-react";
import ServicePageTemplate from "../components/ServicePageTemplate";

const includes = [
  "Brand storytelling videos and company culture films",
  "Product explainers and promotional content",
  "Social media video ads (Reels, TikTok, YouTube shorts)",
  "Motion graphics, title sequences, and animated graphics",
  "Professional editing with color grading and sound design",
  "Multi-format delivery optimized for all platforms",
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Creative brief, concept ideation, storyboard planning, and script development.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Shot list, timeline, and platform strategy for maximum distribution impact.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Production, editing, color grading, motion graphics, and audio mastering.",
  },
  {
    step: "04",
    title: "Delivery",
    description:
      "Final renders in all platform-specific formats with usage documentation.",
  },
];

export default function VideoCreationPage() {
  return (
    <ServicePageTemplate
      icon={Film}
      label="Service — Video Creation"
      title="Video"
      subtitle="Cinematic content that moves audiences and drives action."
      description="Video is the most powerful medium for brand storytelling. We produce premium visual content that captivates, communicates, and converts — from short-form social ads to full brand campaigns."
      includes={includes}
      process={process}
    />
  );
}
