"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";



import { IDestination } from "@/type";





const API_URL = "https://wanderlast-server-drab.vercel.app/featuredDestination";

type FeaturedDestination = Partial<IDestination> & {
  _id: string;
  departure?: string;
};

/** "7days" -> "7 Days/6 Nights", "6days/5nights" -> "6 Days/5 Nights" */
const formatDuration = (duration?: string) => {
  const value = duration ?? "";
  const days = value.match(/(\d+)\s*days?/i)?.[1];
  const nights = value.match(/(\d+)\s*nights?/i)?.[1];

  if (!days) return value;

  return `${days} Days/${nights ? `${nights} Nights` : "6 Nights"}`;
};

const normalize = (item: FeaturedDestination): IDestination => ({
  _id: item._id,
  name: item.name ?? "",
  country: item.country ?? "",
  price: item.price ?? "0",
  duration: formatDuration(item.duration),
  departureDate: item.departure ?? item.departureDate ?? "",
  departure: item.departure ?? item.departureDate ?? "",
  image: item.image ?? "",
  description: item.description ?? "",
  category: item.category ?? "",
  rating: item.rating ?? 0,
  reviews: item.reviews ?? 0,
  highlights: item.highlights ?? "",
});
const FeatuedDestination = () => {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data: unknown = res.ok ? await res.json() : [];

        if (active && Array.isArray(data)) {
          setDestinations(
            (data as FeaturedDestination[]).map(normalize)
          );
        }
      } catch {
        // Backend not reachable — render the empty state
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const total = destinations.length;
  const activeIndex = Math.min(current, Math.max(total - 1, 0));

  return (
    <section className="bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Carousel opts={{ align: "start", loop: false }} setApi={setApi}>
          {/* Heading + "All destinations" button */}
          <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="text-4xl leading-tight font-bold text-neutral-900 md:text-5xl">
                Featured Destinations
              </h2>
              <p className="mt-3 text-sm text-neutral-500 md:text-base">
                Handpicked travel experiences for the adventure seekers
              </p>
            </div>

            <Link
              href="/Destinations"
              className="inline-flex items-center gap-3 border border-cyan-500 px-5 py-3 text-xs font-semibold tracking-widest text-neutral-900 uppercase transition-colors hover:bg-cyan-50 hover:text-cyan-700 md:text-sm"
            >
              All Destinations
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Slides */}
          <CarouselContent className="-ml-4 md:-ml-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-[40%] md:pl-6"
                >
                  <Skeleton className="h-57.5 w-full rounded-none" />
                  <div className="space-y-3 pt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </CarouselItem>
              ))
            ) : total === 0 ? (
              <CarouselItem className="pl-4 md:pl-6">
                <p className="py-16 text-center text-neutral-500">
                  No featured destinations available right now.
                </p>
              </CarouselItem>
            ) : (
              destinations.map((destination) => (
                <CarouselItem
                  key={destination._id}
                  className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-[40%] md:pl-6"
                >
                  <article className="group bg-white">
                    {/* Image + rating badge */}
                    <div className="relative h-57.5 w-full overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 px-3 py-1.5 shadow-sm">
                        <span className="text-sm font-semibold text-gray-900">
                          4.5
                        </span>
                        <Star size={14} fill="currentColor" className="text-black" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5 pt-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={16} />
                        <span className="text-sm">
                          {destination.country.split(",")[0]}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-medium text-gray-900">
                          {destination.name}
                        </h3>

                        <p className="shrink-0 text-lg font-semibold text-gray-900">
                          ${destination.price}
                          <span className="text-sm font-normal text-gray-500">
                            /Person
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={16} />
                        <span className="text-sm">{destination.duration}</span>
                      </div>

                      <Link
                        href={`/Destinations/${destination._id}`}
                        className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium tracking-wide text-cyan-600 transition-colors hover:text-cyan-800"
                      >
                        BOOK NOW
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              ))
            )}
          </CarouselContent>

          {/* Counter + progress line + arrows */}
          <div className="mt-10 flex items-center gap-6">
            <span className="shrink-0 text-sm text-neutral-500">
              {total === 0 ? 0 : activeIndex + 1}/{total}
            </span>

            <div className="h-px flex-1 bg-neutral-200" />

            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="static size-11 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100" />
              <CarouselNext className="static size-11 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeatuedDestination;
