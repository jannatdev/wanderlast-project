"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! From the temples to the rice terraces, everything was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations! The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      "Paris was an absolute dream! From the Eiffel Tower at sunset to the charming sidewalk cafes, every detail was handled perfectly. We're already planning our next adventure with Wanderlast.",
    name: "Emma Thompson",
    location: "London, UK",
    image: "/images/person3.png",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl leading-tight font-normal text-neutral-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-neutral-500 md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static size-10 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100" />
              <CarouselNext className="static size-10 rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100" />
            </div>
          </div>

          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-4 md:basis-1/2 md:pl-6"
              >
                <figure className="flex h-full flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-6 md:flex-row md:items-start md:gap-8 md:p-8">
                  <div className="flex flex-1 flex-col">
                    <blockquote className="font-serif text-base leading-snug text-neutral-800 md:text-lg">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="text-sm font-bold text-neutral-900">
                        — {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={168}
                    height={168}
                    className="h-40 w-40 shrink-0 rounded-lg object-cover md:h-[168px] md:w-[168px]"
                  />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
