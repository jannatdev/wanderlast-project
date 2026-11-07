
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
 
  CalendarDays,
  Check,
  MapPin,
 
  Star,
  
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import UpdateDestination from "@/components/UpdateDestination";
import DeleteButton from "@/components/DeleteButton";
import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
interface PageProps {
  params: Promise<{ id: string }>;
}


const highlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];


export default async function DestinationDetailsPage({ params }: PageProps) {
  const { id } = await params;

    const requestHeaders = await headers();

  const jwtToken = await auth.api.getToken({
    headers: requestHeaders,
  });

const token= jwtToken?.token
  console.log("JWT token received:", Boolean(token));

  if (!jwtToken?.token) {
    throw new Error("Unable to get JWT token");
  }

   const res = await fetch (`https://wanderlast-server-drab.vercel.app/Destinations/${id}`,{
    headers: {
      authorization:`Bearer ${token}`,
    },
     cache: "no-store",
  
   
   })
   if (!res.ok) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-20">
        <h1 className="text-2xl font-semibold">
          Destination not found
        </h1>
        <Link
          href="/Destinations"
          className="mt-4 inline-block text-cyan-600"
        >
          Back to Destinations
        </Link>
      </main>
    );
  }

   const destination= await res.json()
     const duration = destination.duration.match(/\d+/)?.[0] ?? "7";

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 my-20 ">
      {/* Top actions */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/Destinations"
          className="flex items-center gap-3 text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={19} />
          Back to Destinations
        </Link>

        <div className="flex gap-3">
          
          <UpdateDestination destination={destination} ></UpdateDestination>
          <DeleteButton destination={destination}></DeleteButton>

          
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-90 overflow-hidden sm:h-[380px] lg:h-137.5">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <Separator className="my-8" />

      {/* Main content and booking card */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={18} />
            {destination.country.split(",")[0]}
          </div>

          <h1 className="text-4xl font-normal tracking-tight text-gray-950 md:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="flex items-center gap-2 font-semibold">
              <Star
                size={18}
                fill="currentColor"
                className="text-green-600"
              />
              4.9
              <span className="font-normal text-gray-500">
                (234 reviews)
              </span>
            </span>

            <span className="flex items-center gap-2 font-medium">
              <CalendarDays size={17} className="text-gray-500" />
              {duration} Days / {Math.max(0, Number(duration) - 1)} Nights
            </span>
          </div>

          {/* Overview */}
          <div className="mt-9">
            <h2 className="text-2xl font-medium tracking-tight">
              Overview
            </h2>
            <p className="mt-3 leading-6 text-gray-500">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-9">
            <h2 className="text-2xl font-medium tracking-tight">
              Highlights
            </h2>

            <p className="mt-3 leading-6 text-gray-500">
              {destination.description}
            </p>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-gray-500"
                >
                  <Check
                    size={18}
                    className="shrink-0 text-green-600"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Booking card */}
        <Card className="rounded-none border-gray-200 shadow-md lg:sticky lg:top-6">
          <CardContent className="p-5">
            <BookingCard destination={destination}></BookingCard>
          
          </CardContent>
        </Card>
      </div>
    </main>
    
  );
}
