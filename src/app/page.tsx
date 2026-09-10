import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroScroll from "@/components/sections/HeroScroll";
import FeaturesPinned from "@/components/sections/FeaturesPinned";
import HowItWorksStacked from "@/components/sections/HowItWorksStacked";
import UseCases from "@/components/sections/UseCases";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        {/* 1 — Hero qui évolue au scroll */}
        <HeroScroll />

        {/* 2 — Présentation immersive des 4 fonctionnalités (épinglée sur desktop) */}
        <FeaturesPinned />

        {/* 3 — Cartes empilées « Comment ça marche » */}
        <HowItWorksStacked />

        <UseCases />

        <FaqSection />

        {/* 4 — Transition marquée vers la demande de démo */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
