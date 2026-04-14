import { CheckCircle } from "lucide-react";

const badges = [
  "CE Marked",
  "Irish Heart Foundation",
  "HSE Recommended",
  "PHECC Certified",
  "Next-Day Delivery IE",
];

export default function TrustBar() {
  return (
    <section className="bg-card border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {badges.map((badge) => (
            <div key={badge} className="trust-badge">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
