import Nav from "./components/Nav";
import Hero from "./components/Hero";
import BuildingToJsonLd from "./components/BuildingToJsonLd";
import About from "./components/About";
import Work from "./components/Work";
import TechProof from "./components/TechProof";
import Experience from "./components/Experience";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import { SITE_URL, brand, CONTACT_EMAIL } from "./lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.name,
  description: brand.role,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  areaServed: "JP",
  knowsAbout: [
    "Schema.org structured data",
    "hreflang internationalization",
    "Next.js",
    "Hotel website development",
    "Local SEO / MEO",
    "Multilingual web (EN/JA/KO/zh-CN/zh-TW)",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "ホテル特化 多言語サイト / Schema.org 実装",
    },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <BuildingToJsonLd />
        <About />
        <Work />
        <TechProof />
        <Experience />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
