import AmbientBackground from "./components/AmbientBackground";
import SiteHeader from "./components/SiteHeader";
import HeroSection from "./components/HeroSection";
import TensionBento from "./components/TensionBento";
import ActionsSection from "./components/ActionsSection";
import MethodSection from "./components/MethodSection";
import BeliefSection from "./components/BeliefSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[#050608] text-white"
    >
      <AmbientBackground />
      <SiteHeader />
      <main className="relative z-10">
        <HeroSection />
        <TensionBento />
        <ActionsSection />
        <MethodSection />
        <BeliefSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
