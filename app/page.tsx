import AmbientBackground from "./components/AmbientBackground";
import SiteHeader from "./components/SiteHeader";
import HeroSection from "./components/HeroSection";
import TensionBento from "./components/TensionBento";
import EvidenceSection from "./components/EvidenceSection";
import ActionsSection from "./components/ActionsSection";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div
      id="top"
      className="relative min-h-[100dvh] overflow-x-clip bg-[#050608] text-white"
    >
      <AmbientBackground />
      <SiteHeader />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <div className="theme-light-region">
          <TensionBento />
          <EvidenceSection />
          <ActionsSection />
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
