import Image from "next/image";

import { MapPin, CalendarDays, Star, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { IDestination } from "@/type";

import Link from "next/link";

const DestinationCard = ({destination}:{destination:IDestination}) => {
    return (
       <Card className="group overflow-hidden rounded-none border-0 bg-white p-0 shadow-sm">
      {/* Destination Image */}
      <div className="relative h-57.5 w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute right-5 top-5 flex items-center gap-2 bg-white/95 px-4 py-2 shadow-sm">
          <span className="text-base font-semibold text-gray-900">
            4.5
          </span>
          <Star
            size={18}
            fill="currentColor"
            className="text-black"
          />
        </div>
      </div>

      {/* Destination Details */}
      <CardContent className="space-y-2 p-4 ">
        <div className="flex items-center gap-2 px-0 text-gray-500">
          <MapPin size={19} />
          <span className="text-sm">
            {destination.country.split(",")[0]}
          </span>
        </div>

        <div className="flex items-start justify-between gap-5">
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
          <CalendarDays size={18} />
          <span className="text-sm">
            {destination.duration.replace(
              /(\d+)days/i,
              "$1 Days"
            )}
            /6 Nights
          </span>
        </div>
        <Link
        
          href={`/Destinations/${destination._id}`}
          className="inline-flex items-center gap-2 pt-3 text-base font-medium text-cyan-600 transition-colors hover:text-cyan-800"
        >
        
            BOOK NOW
          <ArrowUpRight size={20} />

        
          
        </Link>
       
      </CardContent>
    </Card>
    );
};

export default DestinationCard;