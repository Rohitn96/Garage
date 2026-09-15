import { Hero } from "@/components/Hero";
import { ServiceExplorer } from "@/components/car/ServiceExplorer";
import { TwoDoors } from "@/components/TwoDoors";
import { Pricing } from "@/components/Pricing";
import { Why } from "@/components/Why";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

/*
 * Order is the argument.
 *
 * Hero states the positioning, the car proves it, the fork routes whichever
 * visitor arrived, and the price list answers the question that used to take
 * seven screens of scrolling to reach. Trust and process come after the
 * commercial facts, not before them.
 *
 * The English page at /en/ renders this same body; only the language context
 * and the metadata differ.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ServiceExplorer />
      <TwoDoors />
      <Pricing />
      <Why />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </>
  );
}
