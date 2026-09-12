import { TeslaServices } from "@/components/tesla/TeslaServices";
import { Pricing } from "@/components/Pricing";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

/** Shared by /tesla/ and /fi/tesla/. */
export function TeslaPage() {
  return (
    <>
      <TeslaServices />
      <Pricing />
      <ContactForm />
      <Footer />
    </>
  );
}
