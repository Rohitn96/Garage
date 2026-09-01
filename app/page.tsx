import { Hero } from "@/components/Hero";
import { ServiceExplorer } from "@/components/car/ServiceExplorer";
import { OurStory } from "@/components/OurStory";
import { TrustSection } from "@/components/TrustSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <ServiceExplorer />
      <OurStory />
      <TrustSection />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </main>
  );
}
