import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise cove surrounded by lush green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-32 text-center">
        <h1 className="font-serif text-5xl leading-[1.05] font-normal text-white sm:text-6xl md:text-7xl lg:text-[88px]">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-6 max-w-[640px] text-base leading-relaxed text-white/90 md:text-xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-3 rounded bg-[#2AA9CE] px-8 py-4 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#2396b8]"
          >
            Explore Now
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
          </button>
          <button
            type="button"
            className="rounded bg-white/25 px-9 py-4 text-sm font-bold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35"
          >
            View Destination
          </button>
        </div>
      </div>

      <div className="relative z-10 grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm md:grid-cols-[repeat(4,minmax(0,1fr))_190px]">
        {searchFields.map((field, index) => (
          <div
            key={field.label}
            className={`px-6 py-3.5 text-left ${
              index > 1 ? "border-t border-white/40 md:border-t-0" : ""
            } ${index < searchFields.length - 1 ? "md:border-r md:border-white/40" : ""}`}
          >
            <p className="text-base font-semibold text-white">{field.label}</p>
            <p className="mt-0.5 text-xs text-white/85 md:text-[13px]">{field.value}</p>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 bg-[#2AA9CE] px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-[#2396b8] md:col-span-1"
        >
          Search
        </button>
      </div>
    </section>
  );
}
