import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  const lastUpdated = "28 May 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Privacy Policy — Smart Defibs Ireland"
        description="How Smart Defibs LTD collects, uses and protects your personal data under GDPR."
        path="/privacy"
      />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-24 pt-8 md:pt-12 bg-background">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-5xl mb-3">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </motion.div>

          <article className="space-y-10 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">1. Who we are</h2>
              <p>
                Smart Defibs LTD ("we", "us", "our") is the data controller for personal data
                collected through this website. We are registered in Ireland at:
              </p>
              <p className="mt-3">
                Unit 18, The Cube FlexiSpace, Lanesborough Road, Co. Roscommon F42 DX61, Ireland.
                <br />
                Email: <a className="text-primary underline" href="mailto:sales@smartdefibs.com">sales@smartdefibs.com</a>
                {" "}· Phone: +353 89 499 2903
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">2. What we collect</h2>
              <p>When you submit our quote request form we collect:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Your name</li>
                <li>Your organisation</li>
                <li>Sector (e.g. school, nursing home, workplace, community)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Any optional message or notes you choose to provide</li>
              </ul>
              <p className="mt-3">
                We do not currently use analytics, advertising or social-media tracking cookies. Only
                strictly necessary cookies (for security and session handling) are used.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">3. Why we collect it</h2>
              <p>
                We process your data to respond to your enquiry and prepare a tailored quote. Our
                legal bases under the GDPR are:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong>Article 6(1)(b)</strong> — steps taken at your request prior to entering a
                  contract.
                </li>
                <li>
                  <strong>Article 6(1)(f)</strong> — our legitimate interest in responding to
                  business enquiries.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">4. How long we keep it</h2>
              <p>
                Quote requests are retained for up to <strong>24 months</strong> after our last
                contact with you, after which the record is deleted. If you become a customer, your
                data is kept for the duration of our commercial relationship plus any period required
                by Irish tax and company law.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">5. Who we share it with</h2>
              <p>
                We do not sell your data and we do not share it for marketing. We use a small number
                of trusted processors who help us run the website:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong>Lovable Cloud</strong> — website hosting and secure database storage (EU region).
                </li>
                <li>
                  <strong>Resend</strong> — transactional email delivery (notifying our team when you
                  submit a quote request).
                </li>
              </ul>
              <p className="mt-3">
                Where a processor transfers data outside the European Economic Area, transfers are
                covered by the European Commission's Standard Contractual Clauses.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">6. Your rights</h2>
              <p>Under the GDPR you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Have inaccurate data corrected</li>
                <li>Request erasure of your data</li>
                <li>Restrict or object to our processing</li>
                <li>Receive your data in a portable format</li>
                <li>
                  Lodge a complaint with the Irish Data Protection Commission —{" "}
                  <a
                    className="text-primary underline"
                    href="https://www.dataprotection.ie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dataprotection.ie
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email{" "}
                <a className="text-primary underline" href="mailto:sales@smartdefibs.com">
                  sales@smartdefibs.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">7. Cookies</h2>
              <p>
                This site currently uses only strictly necessary cookies required for security and
                basic functionality. No consent banner is shown because no analytics, advertising or
                profiling cookies are set. If we add such tools in future, we will display a
                consent banner and update this policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">8. Security</h2>
              <p>
                Your data is transmitted over HTTPS and stored in a database protected by
                row-level access controls. Only authorised personnel can access submitted quote
                requests.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-3">9. Contact</h2>
              <p>
                Questions about this policy or how we handle your data? Contact us at{" "}
                <a className="text-primary underline" href="mailto:sales@smartdefibs.com">
                  sales@smartdefibs.com
                </a>{" "}
                or by post at the address above.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Return to the <Link to="/" className="text-primary underline">homepage</Link> or{" "}
                <Link to="/quote" className="text-primary underline">request a quote</Link>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
