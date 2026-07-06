import AnimatedBackground from "@/components/background/AnimatedBackground";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import MetricsSection from "@/components/sections/MetricsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import TerminalSection from "@/components/sections/TerminalSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import CompatibilitySection from "@/components/sections/CompatibilitySection";
import InstallSection from "@/components/sections/InstallSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <MetricsSection />
        <FeaturesSection />
        <ArchitectureSection />
        <ComparisonSection />
        <TerminalSection />
        <WorkflowSection />
        <CompatibilitySection />
        <InstallSection />
      </main>

      <FooterSection />
    </>
  );
}
