import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#E8F4F8] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight font-normal text-neutral-900 md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-neutral-500 md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <feature.icon
                size={32}
                strokeWidth={2}
                className="text-[#2AA9CE]"
                aria-hidden
              />
              <h3 className="mt-6 font-serif text-xl font-normal text-neutral-900 md:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
