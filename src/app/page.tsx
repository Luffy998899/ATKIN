import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import ScrollStatement from "@/components/sections/ScrollStatement";
import ImageBand from "@/components/sections/ImageBand";
import DivisionsSection from "@/components/sections/DivisionsSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyUs from "@/components/sections/WhyUs";
import ProcessScroll from "@/components/sections/ProcessScroll";
import QualitySection from "@/components/sections/QualitySection";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import { FAQS } from "@/lib/data/faqs";
import CtaSection from "@/components/sections/CtaSection";

import {
  getCertifications, getDivisions, getFeaturedProducts,
  getStats, getTestimonials,
} from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 300;

export default async function HomePage() {
  const [divisions, products, stats, certifications, testimonials] = await Promise.all([
    getDivisions(),
    getFeaturedProducts(8),
    getStats(),
    getCertifications(),
    getTestimonials(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        url: site.url,
        description: site.description,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.line2,
          addressRegion: site.address.city,
          addressCountry: "IN",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero stats={stats} />
      <TrustStrip certifications={certifications} />
      <ScrollStatement />
      <ImageBand />
      <DivisionsSection divisions={divisions} />
      <FeaturedProducts products={products} />
      <WhyUs />
      <ProcessScroll />
      <QualitySection />
      <Testimonials testimonials={testimonials} />
      <Faq />
      <CtaSection divisions={divisions} />
    </>
  );
}
