import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-24">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a turquoise sea with a small plane flying over it"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <div className="relative z-10 text-center">
        <h2 className="font-serif text-4xl leading-tight font-normal text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/85 md:text-lg">
          Join thousands of travelers who&apos;ve discovered the world with us.
        </p>

        <button
          type="button"
          className="mt-8 inline-flex items-center gap-3 rounded bg-white px-8 py-4 text-sm font-bold tracking-wide text-neutral-900 uppercase transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </section>
  );
}
