import AboutHero from "@/components/about/AboutHero";
import AboutFlow from "@/components/about/AboutFlow";
import AboutFAQ from "@/components/about/AboutFAQ";

export default function AboutPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      <AboutHero />

      <AboutFlow />

      <AboutFAQ/>

    </main>
  );
}