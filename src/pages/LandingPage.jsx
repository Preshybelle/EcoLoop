import Navbar from "../components/Navbar";
import LandingPageCard1 from "../components/LandingPageCard1";
import ChallengeSection from "../components/ChallengeSection";
import HowItWorksSection from "../components/HowItWorksSection";
import ServicesSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

function LandingPage() {
  return (
    <>
      <Navbar />
      <LandingPageCard1 />
      <ChallengeSection />
      <HowItWorksSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}

export default LandingPage;
