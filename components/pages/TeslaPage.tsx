import { TeslaServices } from "@/components/tesla/TeslaServices";
import { Pricing } from "@/components/Pricing";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

/** Shared by /tesla/ and /fi/tesla/. */
export function TeslaPage() {
  return (
    <>
      <TeslaServices />
      {/* Only the Tesla half of the price list — the general table stays on the
          home page, where the visitor who needs it is already looking. */}
      <Pricing only="tesla" />
      <ContactForm />
      <Footer />
    </>
  );
}
