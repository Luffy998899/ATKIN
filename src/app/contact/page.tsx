import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Figure from "@/components/ui/Figure";
import { Reveal } from "@/components/motion/Reveal";
import { getDivisions } from "@/lib/queries";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} — franchise enquiries, product rate lists, third-party manufacturing and partner support.`,
};

const DESKS: [string, string, string][] = [
  ["Franchise appointments", "New territory enquiries and monopoly confirmations", site.email],
  ["Existing partners", "Orders, dispatch tracking and promotional inputs", "orders@atinhealthcare.com"],
  ["Third-party manufacturing", "Own-label batches, artwork and MOQ discussions", "ctm@atinhealthcare.com"],
];

export default async function ContactPage() {
  const divisions = await getDivisions();

  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to a person who knows"
        highlight="your district."
        lead="Franchise enquiries are answered within one working day. Existing partners get a direct line to their own territory manager."
        crumbs={[{ label: "Contact" }]}
      />

      <Section flush className="grain bg-bone pb-24 md:pb-32">
        <div className="container-x">
          <div className="grid-12 gap-y-16">
            {/* details */}
            <div className="col-span-4 md:col-span-5">
              <dl className="border-t border-ink">
                <Row label="Registered office">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city}
                  <br />
                  {site.address.country}
                </Row>

                <Row label="Phone">
                  <a href={site.phoneHref} className="num link-draw text-ink">
                    {site.phone}
                  </a>
                </Row>

                <Row label="Email">
                  <a href={`mailto:${site.email}`} className="link-draw text-ink">
                    {site.email}
                  </a>
                </Row>

                <Row label="WhatsApp">
                  <a
                    href={whatsappLink(site.whatsapp, "Hi ATIN Healthcare, I have an enquiry.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw text-leaf"
                  >
                    Start a chat
                  </a>
                </Row>

                <Row label="Office hours">
                  Monday to Saturday
                  <br />
                  9:30 am – 6:30 pm IST
                </Row>
              </dl>

              <Figure
                src="/media/pharmacist.webp"
                alt="Pharmacist at a chemist counter handing over a medicine strip"
                caption="Retail counter, Lucknow"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="mt-12 aspect-4/3 w-full"
              />

              {/* desks */}
              <div className="mt-12 border-t border-rule">
                {DESKS.map(([title, sub, email], i) => (
                  <Reveal key={title} delay={i * 0.06}>
                    <div className="border-b border-rule py-5">
                      <span className="label text-leaf">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="display mt-2 text-[1.15rem] text-ink">{title}</h3>
                      <p className="mt-1.5 text-[0.85rem] leading-[1.6] text-ink/50">{sub}</p>
                      <a href={`mailto:${email}`} className="link-draw mt-2 inline-block text-[0.85rem] text-ink">
                        {email}
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* form */}
            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <Reveal delay={0.1}>
                <div className="border-t border-ink pt-8">
                  <div className="mb-10 flex items-baseline justify-between gap-4">
                    <h2 className="display text-[1.6rem] text-ink">Send an enquiry</h2>
                    <span className="label text-leaf">Reply in 1 working day</span>
                  </div>
                  <EnquiryForm kind="contact" divisions={divisions} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid-12 items-baseline gap-y-1 border-b border-rule py-5">
      <dt className="label col-span-4 text-ink/40 md:col-span-4">{label}</dt>
      <dd className="col-span-4 text-[0.95rem] leading-[1.7] text-ink/80 md:col-span-8">
        {children}
      </dd>
    </div>
  );
}
