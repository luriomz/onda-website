import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import PopularEventsSection from "./components/sections/PopularEventsSection";
import ArtistsMarquee from "./components/sections/ArtistsMarquee";
import AppCTASection from "./components/sections/AppCTASection";
import FeatureCardsSection from "./components/sections/FeatureCardsSection";
import OrganizerSection from "./components/sections/OrganizerSection";

export default function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--bg-base))]">
      <Navbar />
      <main>
        <HeroSection />
        <PopularEventsSection />
        <ArtistsMarquee />
        <AppCTASection />
        <FeatureCardsSection />
        <OrganizerSection />
      </main>
      <Footer />
    </div>
  );
}
