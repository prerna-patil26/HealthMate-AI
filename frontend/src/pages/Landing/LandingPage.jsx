import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import WhyChooseSection from './WhyChooseSection';
import PrivacySafetySection from './PrivacySafetySection';
import FaqSection from './FaqSection';

function LandingPage() {
  return (
    <>
      <PublicNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WhyChooseSection />
        <PrivacySafetySection />
        <FaqSection />
      </main>
      <PublicFooter />
    </>
  );
}

export default LandingPage;